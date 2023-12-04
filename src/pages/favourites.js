
import { useAtom } from 'jotai';
import { Card, Row, Col } from 'react-bootstrap';
import { favouritesAtom } from '../../store';
import ArtworkCard from '../components/ArtworkCard.js';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try adding some new artwork to the list.
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Favourites;
