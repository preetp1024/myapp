// components/ArtworkCard.js

import { useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  useEffect(() => {
    // You can add additional side effects if needed
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
    objectID: artworkObjectID,
  } = data;

  const imageUrl = primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  return (
    <Card>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          {objectDate || 'N/A'}<br />
          {classification || 'N/A'}<br />
          {medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${artworkObjectID}`} passHref>
          <Button variant="primary">{artworkObjectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCard;
