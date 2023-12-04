// components/MainNav.js
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store';
import { addToHistory, removeToken } from '../lib/userData.js'; 

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const token = readToken(); // Assuming you have a function to read the token

  const submitForm = async (e) => {
    e.preventDefault();
    const queryString = `/artwork?title=true&q=${searchField}`;
    router.push(queryString);
    setIsExpanded(false);

    try {
      // Update search history using addToHistory function
      await addToHistory(`title=true&q=${searchField}`);
      setSearchHistory((current) => [...current, queryString]);
    } catch (error) {
      console.error('Error updating search history:', error);
    }
  };

  const handleDropdownClick = () => {
    setIsExpanded(false);
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken(); // Remove the token from local storage
    router.push('/login'); // Redirect to the login page
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expanded={isExpanded}>
        <Navbar.Brand>Preet Patel</Navbar.Brand>
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link href="/" legacyBehavior active={router.pathname === "/"}>
              Home
            </Nav.Link>
          </Link>
          {token && ( // Only show Advanced Search when the user is logged in
            <Link href="/search" passHref>
              <Nav.Link href="/search" legacyBehavior active={router.pathname === "/search"}>
                Advanced Search
              </Nav.Link>
            </Link>
          )}
        </Nav>
        {token && ( // Only show Search form when the user is logged in
          <Form className="d-flex" onSubmit={submitForm}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="outline-light">
              Search
            </Button>
          </Form>
        )}
        <Nav>
          {token ? ( // Show user-related items when the user is logged in
            <NavDropdown title={token.userName || 'User Name'} id="basic-nav-dropdown">
              <Link href="/favourites" passHref>
                <NavDropdown.Item href="/favourites" onClick={handleDropdownClick} active={router.pathname === "/favourites"}>
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref>
                <NavDropdown.Item href="/history" onClick={handleDropdownClick} active={router.pathname === "/history"}>
                  Search History
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item> {/* Log out option */}
            </NavDropdown>
          ) : (
            <Nav className="me-auto"> {/* Show Register and Login links when the user is not logged in */}
              <Link href="/register" passHref>
                <Nav.Link href="/register" onClick={() => setIsExpanded(false)} active={router.pathname === "/register"}>
                  Register
                </Nav.Link>
              </Link>
              <Link href="/login" passHref>
                <Nav.Link href="/login" onClick={() => setIsExpanded(false)} active={router.pathname === "/login"}>
                  Login
                </Nav.Link>
              </Link>
            </Nav>
          )}
        </Nav>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
