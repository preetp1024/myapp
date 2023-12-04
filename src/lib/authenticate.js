// Function to set the authentication token in local storage
function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

// Function to get the authentication token from local storage
function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null; // Return null if running on the server
}

// Function to remove the authentication token from local storage
function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

// Function to read the authentication token
function readToken() {
  return getToken();
}

// Function to check if the user is authenticated
function isAuthenticated() {
  return !!getToken();
}
  
  // Function to authenticate a user by sending a POST request to "/login"
  async function authenticateUser(user, password) {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        const { token } = data;
        setToken(token);
        return true;
      } else {
        // Handle authentication failure here
        return false;
      }
    } catch (error) {
      // Handle any network or unexpected errors here
      console.error('Authentication error:', error);
      return false;
    }
  }
  
  // Function to register a user by sending a POST request to "/register"
  async function registerUser(user, password, password2) {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password, password2 }),
      });
  
      if (response.status === 200) {
        // Registration successful, do not set the token
        return true;
      } else {
        // Handle registration failure here
        return false;
      }
    } catch (error) {
      // Handle any network or unexpected errors here
      console.error('Registration error:', error);
      return false;
    }
  }
  
  // Export the functions for use in your application
  export { setToken, getToken, removeToken, readToken, isAuthenticated, authenticateUser, registerUser };
  