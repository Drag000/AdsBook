terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.13.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}


provider "azurerm" {
  features {
  }
  subscription_id = var.subscription_id
}


resource "azurerm_resource_group" "adsbook_rg" {
  name     = var.resource_group_name
  location = var.resource_group_location
}


resource "azurerm_container_registry" "adsbook_acr" {
  name                = var.container_registry_name
  resource_group_name = azurerm_resource_group.adsbook_rg.name
  location            = azurerm_resource_group.adsbook_rg.location
  sku                 = "Basic"
  admin_enabled       = true
}


resource "null_resource" "push_docker_images" {
  depends_on = [
    azurerm_container_registry.adsbook_acr
  ]

  provisioner "local-exec" {
    command = "az acr login --name adsbookacr"
  }
  provisioner "local-exec" {
    command = "docker tag adsbook-adsbookfrontend:latest adsbookacr.azurecr.io/adsbookfrontend:latest"
  }
  provisioner "local-exec" {
    command = "docker push adsbookacr.azurecr.io/adsbookfrontend:latest"
  }
  provisioner "local-exec" {
    command = "docker tag adsbook-adsbookbackend:latest adsbookacr.azurecr.io/adsbookbackend:latest"
  }
  provisioner "local-exec" {
    command = "docker push adsbookacr.azurecr.io/adsbookbackend:latest"
  }
  provisioner "local-exec" {
    command = "docker tag adsbook-nginx adsbookacr.azurecr.io/adsbook-nginx:latest"
  }
  provisioner "local-exec" {
    command = "docker push adsbookacr.azurecr.io/adsbook-nginx:latest"
  }

}


resource "azurerm_container_app_environment" "adsbook_env" {
  name                = var.container_app_environment_name
  resource_group_name = azurerm_resource_group.adsbook_rg.name
  location            = azurerm_resource_group.adsbook_rg.location
}


resource "azurerm_postgresql_flexible_server" "adsbook_db" {
  name                         = "adsbook-db"
  resource_group_name          = azurerm_resource_group.adsbook_rg.name
  location                     = azurerm_resource_group.adsbook_rg.location
  sku_name                     = "B_Standard_B1ms"
  storage_mb                   = 32768
  administrator_login          = "test_user"
  administrator_password       = "test_PASSWORD123"
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false
  version                      = "16"
  zone                         = "1"
}


resource "azurerm_postgresql_flexible_server_firewall_rule" "adsbook_db_fw" {
  depends_on = [
    azurerm_postgresql_flexible_server.adsbook_db
  ]
  name             = "adsbook-fw"
  server_id        = azurerm_postgresql_flexible_server.adsbook_db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "255.255.255.255"
}

resource "azurerm_storage_account" "adsbook_storage" {
  name                     = "adsbookmedia"
  resource_group_name      = azurerm_resource_group.adsbook_rg.name
  location                 = azurerm_resource_group.adsbook_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_share" "media_share" {
  name               = "mediashare"
  storage_account_id = azurerm_storage_account.adsbook_storage.id
  quota              = 1
  depends_on           = [azurerm_storage_account.adsbook_storage]
}

resource "azurerm_container_app_environment_storage" "containerappstorage" {
  name                         = "containerappstorage"
  container_app_environment_id = azurerm_container_app_environment.adsbook_env.id
  account_name                 = azurerm_storage_account.adsbook_storage.name
  share_name                   = azurerm_storage_share.media_share.name
  access_key                   = azurerm_storage_account.adsbook_storage.primary_access_key
  access_mode                  = "ReadWrite"
}

resource "azurerm_container_app" "backend" {
  depends_on = [
    null_resource.push_docker_images,
    azurerm_postgresql_flexible_server.adsbook_db
  ]

  name                         = "adsbook-backend"
  resource_group_name          = azurerm_resource_group.adsbook_rg.name
  container_app_environment_id = azurerm_container_app_environment.adsbook_env.id
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.adsbook_acr.login_server
    username             = azurerm_container_registry.adsbook_acr.admin_username
    password_secret_name = "registry-credentials"
  }

  secret {
    name  = "registry-credentials"
    value = azurerm_container_registry.adsbook_acr.admin_password
  }

  template {
    min_replicas = 0
    max_replicas = 1

    container {
      name   = "adsbook-backend"
      image  = "${azurerm_container_registry.adsbook_acr.login_server}/adsbookbackend:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "CORS_ALLOWED_ORIGINS"
        value = "will be update with resource 'null_resource''update_frontend'"
      }
      env {
        name  = "ALLOWED_HOSTS"
        value = "will be update with resource 'null_resource''update_frontend'"
      }
      env {
        name  = "SECRET_KEY"
        value = "blue_seal"
      }
      env {
        name  = "DEBUG"
        value = "FALSE"
      }
      env {
        name  = "DB_HOST"
        value = "adsbook-db.postgres.database.azure.com"
      }
      env {
        name  = "DB_ENGINE"
        value = "django.db.backends.postgresql"
      }
      env {
        name  = "DB_NAME"
        value = "postgres"
      }
      env {
        name  = "DB_USER"
        value = "test_user"
      }
      env {
        name  = "DB_PASSWORD"
        value = "test_PASSWORD123"
      }
      env {
        name  = "DB_PORT"
        value = "5432"
      }
      env {
        name  = "MEDIA_ROOT"
        value = "/app/mediafiles"
      }
      volume_mounts {
        name = "mediashare"
        path = "/app/mediafiles"
      }
    }

    volume {
      name = "mediashare"
      storage_type = "AzureFile"
      storage_name = azurerm_container_app_environment_storage.containerappstorage.name
    }

    http_scale_rule {
      name                = "http-scaling"
      concurrent_requests = "1"
    }
  }

  ingress {
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
    external_enabled = true
    target_port      = 8000
  }
}


resource "azurerm_container_app" "frontend" {
  depends_on = [
    null_resource.push_docker_images,
    azurerm_container_app.backend,
  ]

  name                         = "adsbook-frontend"
  resource_group_name          = azurerm_resource_group.adsbook_rg.name
  container_app_environment_id = azurerm_container_app_environment.adsbook_env.id
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.adsbook_acr.login_server
    username             = azurerm_container_registry.adsbook_acr.admin_username
    password_secret_name = "registry-credentials"
  }

  secret {
    name  = "registry-credentials"
    value = azurerm_container_registry.adsbook_acr.admin_password
  }


  template {
    min_replicas = 0
    max_replicas = 1
    container {
      name   = "adsbook-frontend"
      image  = "${azurerm_container_registry.adsbook_acr.login_server}/adsbookfrontend:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "VITE_BACKEND_URL"
        value = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
      }
    }

    http_scale_rule {
      name                = "http-scaling"
      concurrent_requests = "1"
    }
  }

  ingress {
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
    external_enabled = true
    target_port      = 5173
  }
}

resource "azurerm_container_app" "nginx" {
  depends_on = [
    null_resource.push_docker_images,
    azurerm_container_app.backend,
    azurerm_container_app.frontend,
  ]

  name                         = "adsbook-nginx"
  resource_group_name          = azurerm_resource_group.adsbook_rg.name
  container_app_environment_id = azurerm_container_app_environment.adsbook_env.id
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.adsbook_acr.login_server
    username             = azurerm_container_registry.adsbook_acr.admin_username
    password_secret_name = "registry-credentials"
  }

  secret {
    name  = "registry-credentials"
    value = azurerm_container_registry.adsbook_acr.admin_password
  }

  template {
    min_replicas = 0
    max_replicas = 1
    container {
      name   = "adsbook-nginx"
      image  = "${azurerm_container_registry.adsbook_acr.login_server}/adsbook-nginx:latest"
      cpu    = 0.5
      memory = "1Gi"

      env {
        name  = "BACKEND_URL"
        value = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
      }
      env {
        name  = "VITE_BACKEND_URL"
        value = "https://${azurerm_container_app.backend.ingress[0].fqdn}"
      }
    }

    http_scale_rule {
      name                = "http-scaling"
      concurrent_requests = "1"
    }
  }

  ingress {
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
    external_enabled = true
    target_port      = 80
  }

}


resource "null_resource" "update_backend" {
  depends_on = [azurerm_container_app.frontend]

  provisioner "local-exec" {
    command = "az containerapp update -n ${azurerm_container_app.backend.name} -g ${azurerm_resource_group.adsbook_rg.name} --set-env-vars CORS_ALLOWED_ORIGINS=https://${azurerm_container_app.nginx.ingress[0].fqdn}"
  }

  provisioner "local-exec" {
    command = "az containerapp update -n ${azurerm_container_app.backend.name} -g ${azurerm_resource_group.adsbook_rg.name} --set-env-vars ALLOWED_HOSTS=${azurerm_container_app.backend.ingress[0].fqdn}"
  }
}

