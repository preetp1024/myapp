import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../../store';

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  useEffect(() => {
    setShowAdded(favouritesList.includes(objectID));
  }, [favouritesList, objectID]);

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

  const favouritesClicked = () => {
    if (showAdded) {
      setFavouritesList((current) => current.filter((fav) => fav !== objectID));
    } else {
      setFavouritesList((current) => [...current, objectID]);
    }
    setShowAdded(!showAdded);
  };

  const imageUrl = primaryImage ? primaryImage : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';

  return (
    <Card>
      {primaryImage && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        {medium || 'N/A'}<br />
        {artistDisplayName && (
          <>
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a><br />
          </>
        )}
        {creditLine || 'N/A'}<br />
        {dimensions || 'N/A'}
      </Card.Body>
      <Card.Footer>
        <Button
          variant={showAdded ? 'primary' : 'outline-primary'}
          onClick={favouritesClicked}
        >
          {showAdded ? 'Favourite (added)' : '+ Favourite'}
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ArtworkCardDetail;
