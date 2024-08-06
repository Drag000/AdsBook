import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';


export default function AdDetails() {
   return(
    <Card className="w-25 m-auto p-3 my-5 border">
    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item> </ListGroup.Item>
      <ListGroup.Item> </ListGroup.Item>
      <ListGroup.Item>Comments</ListGroup.Item> 
      <ListGroup.Item>Comments</ListGroup.Item>
      <Button as={Link} to="#" variant="primary">Add comment</Button>
    </ListGroup>
    <Card.Body>
      <Button as={Link} to="#" variant="primary">Edit</Button>
      <Button as={Link} to="#" variant="primary">Delete</Button>
    </Card.Body>
  </Card>
   );
}