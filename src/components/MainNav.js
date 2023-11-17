// components/MainNav.js
import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../../store.js';

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryString = `/artwork?title=true&q=${searchField}`;
    router.push(queryString);
    setIsExpanded(false); 
    setSearchHistory((current) => [...current, queryString]);
  };

  const handleDropdownClick = () => {
    setIsExpanded(false); 
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
          <Link href="/search" passHref>
            <Nav.Link href="/search" legacyBehavior active={router.pathname === "/search"}>
              Advanced Search
            </Nav.Link>
          </Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSubmit}>
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
        <Nav>
          <NavDropdown title="User Name" id="basic-nav-dropdown">
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
          </NavDropdown>
        </Nav>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
