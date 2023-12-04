// pages/history.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store.js';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '../lib/userData'; // Import the removeFromHistory function

const History = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    if (!searchHistory) return null; // Prevent displaying "Nothing Here" temporarily while data is being fetched
  }, [searchHistory]);

  const parsedHistory = searchHistory.map((h) => {
    const params = new URLSearchParams(h);
    const entries = params.entries();
    return Object.fromEntries(entries);
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => { // Make the function asynchronous
    e.stopPropagation();
    try {
      await removeFromHistory(searchHistory[index]); // Remove history item using removeFromHistory function
      setSearchHistory((current) => {
        const updatedHistory = [...current];
        updatedHistory.splice(index, 1);
        return updatedHistory;
      });
    } catch (error) {
      console.error('Error removing history item:', error);
    }
  };

  return (
    <Card>
      <Card.Body>
        {parsedHistory.length === 0 ? (
          <p>Nothing Here. Try searching for some artwork.</p>
        ) : (
          <ListGroup>
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map((key, i) => (
                  <span key={i}>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </span>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default History;
