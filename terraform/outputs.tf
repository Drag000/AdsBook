output "adsbook_url" {
  value = "https://${azurerm_container_app.frontend.ingress[0].fqdn}"
  description = "The URL of the frontend application."
}