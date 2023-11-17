// pages/artwork/[objectID].js

import { Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';
import Layout from '@/components/Layout';
import MainNav from '@/components/MainNav';

const ArtworkById = () => {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Layout>
      <div>
        <MainNav />
        <Row>
          <Col>
            <ArtworkCardDetail objectID={objectID} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default ArtworkById;
