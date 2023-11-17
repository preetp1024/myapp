// pages/index.js

import { Row, Col, Image } from 'react-bootstrap';
import Layout from '@/components/Layout';

const Home = () => {
  const wikipediaLink = "https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art";

  return (
    <Layout>
      <Row>
        <Col md={6}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
        </Col>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art (The Met) is one of the world's largest and finest art museums.
            It is located in New York City's Central Park.
          </p>
          <p>
            Visit the Met's Wikipedia page for more information:
            {' '}
            <a href={wikipediaLink} target="_blank" rel="noreferrer">Metropolitan Museum of Art - Wikipedia</a>
          </p>
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
