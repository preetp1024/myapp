
import { getToken } from './authentic';

// Function to make a GET request to retrieve favorites
async function getFavourites() {
  try {
    const token = getToken();
    if (!token) {
      return [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

// Function to make a PUT request to add an item to favorites
async function addToFavourites(id) {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

// Function to make a DELETE request to remove an item from favorites
async function removeFromFavourites(id) {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}

// Function to make a GET request to retrieve history
async function getHistory() {
  try {
    const token = getToken();
    if (!token) {
      return [];
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
}

// Function to make a PUT request to add an item to history
async function addToHistory(id) {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Error adding to history:', error);
    return false;
  }
}

// Function to make a DELETE request to remove an item from history
async function removeFromHistory(id) {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error('Error removing from history:', error);
    return false;
  }
}

// Export the functions for use in your application
export {
  getFavourites,
  addToFavourites,
  removeFromFavourites,
  getHistory,
  addToHistory,
  removeFromHistory,
};
