// components/MainNav.js

import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary">
        <Navbar.Brand>Preet Patel</Navbar.Brand>
        <Nav className="mr-auto">
          <Link href="/" passHref>
            <Nav.Link href="/" legacyBehavior>
              Home
            </Nav.Link>
          </Link>
          <Link href="/search" passHref>
            <Nav.Link href="/search" legacyBehavior>
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
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
