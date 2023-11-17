// components/ArtworkCardDetail.js

import { useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Card } from 'react-bootstrap';

const ArtworkCardDetail = ({ objectID }) => {
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
    primaryImage,
    medium,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
  } = data;

  const imageUrl = primaryImage ? primaryImage : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        <Card.Text>
          {medium || 'N/A'}<br />
          {artistDisplayName && (
            <>
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a><br />
            </>
          )}
          {creditLine || 'N/A'}<br />
          {dimensions || 'N/A'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
