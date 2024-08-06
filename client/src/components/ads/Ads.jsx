import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Ad from '../ad/Ad';



export default function Ads() {
    return (
        <Container className="p-2 my-5 border">
                < Ad/>
                <Ad />
                <Ad />
                <Ad />
                <Ad />

        </Container>
    );
}