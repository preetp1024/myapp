// pages/search.js

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

const AdvancedSearch = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const submitForm = (data) => {
    let queryString = 'searchBy=true';

    if (data.geoLocation) {
      queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
    }

    if (data.medium) {
      queryString += `&medium=${encodeURIComponent(data.medium)}`;
    }

    queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${encodeURIComponent(data.q)}`;

    router.push(`/artwork?${queryString}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group controlId="searchBy">
        <Form.Label>Search By</Form.Label>
        <Form.Control type="text" name="searchBy" ref={register} />
      </Form.Group>

      <Form.Group controlId="geoLocation">
        <Form.Label>Geo Location</Form.Label>
        <Form.Control type="text" name="geoLocation" ref={register} />
      </Form.Group>

      <Form.Group controlId="medium">
        <Form.Label>Medium</Form.Label>
        <Form.Control type="text" name="medium" ref={register} />
      </Form.Group>

      <Form.Group controlId="isOnView">
        <Form.Check type="checkbox" label="Is On View" name="isOnView" ref={register} />
      </Form.Group>

      <Form.Group controlId="isHighlight">
        <Form.Check type="checkbox" label="Is Highlight" name="isHighlight" ref={register} />
      </Form.Group>

      <Form.Group controlId="q">
        <Form.Label>Q</Form.Label>
        <Form.Control type="text" name="q" ref={register({ required: true })} className={errors.q && 'is-invalid'} />
        {errors.q && <div className="invalid-feedback">This field is required</div>}
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AdvancedSearch;
