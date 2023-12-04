import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store.js';
import { addToHistory } from '../lib/userData'; // Import the addToHistory function

const AdvancedSearch = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const { register, handleSubmit, errors } = useForm();

  const submitForm = async (data) => { // Make the function asynchronous
    try {
      let queryString = 'searchBy=true';

      if (data.geoLocation) {
        queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
      }

      if (data.medium) {
        queryString += `&medium=${encodeURIComponent(data.medium)}`;
      }

      queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${encodeURIComponent(data.q)}`;

      await addToHistory(queryString); // Update search history using addToHistory function
      setSearchHistory((current) => [...current, queryString]);

      router.push(`/artwork?${queryString}`);
    } catch (error) {
      console.error('Error updating search history:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Group controlId="searchBy">
        <Form.Label>Search By</Form.Label>
        <Form.Control type="text" name="searchBy" ref={register} />
      </Form.Group>

      {/* Other form fields... */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AdvancedSearch;
