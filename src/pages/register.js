
import { useState } from 'react';
import { useRouter } from 'next/router';
import { registerUser } from '../lib/authenticate';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(''); // New state for confirming password
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (password !== password2) {
      setError('Passwords do not match.');
      return;
    }

    // Perform user registration logic here
    const registered = await registerUser(username, password, password2);

    if (registered) {
      router.push('/login'); // Redirect to login page after successful registration
    } else {
      setError('Registration failed. Please try again.');
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Card.Text>Register for an account:</Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </Form.Group>
            {error && <p className="error">{error}</p>}
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
