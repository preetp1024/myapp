// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { getFavourites, getHistory } from '../lib/userData'; 

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Retrieve atoms and setters
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  // Function to update atoms with data from the backend API
  async function updateAtoms() {
    try {
      const favouritesData = await getFavourites();
      const historyData = await getHistory();

      // Update the atoms with the retrieved data
      setFavouritesList(favouritesData);
      setSearchHistory(historyData);
    } catch (error) {
      console.error('Error updating atoms:', error);
    }
  }

  // Function to handle form submission and authentication
  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    // Perform authentication logic here, for example, using the authenticateUser function
    const authenticated = await authenticateUser(username, password);

    if (authenticated) {
      // Update atoms and redirect to the "/favourites" route
      await updateAtoms();
      router.push('/favourites');
    } else {
      setError('Authentication failed. Please check your credentials.');
    }
  }
async function authenticateUser(username, password) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.status === 200) {
        return true; // Authentication is successful
      } else {
        return false; // Authentication failed
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return false; // Handle any network or unexpected errors here
    }
  }
  

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
