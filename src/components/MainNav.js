import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MainNav = () => {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/artwork?title=true&q=${searchField}`);
    setIsExpanded(false); // Close the navbar after submitting the form
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const handleNavLinkClick = () => {
    setIsExpanded(false); // Close the navbar when a Nav.Link is clicked
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary" expanded={isExpanded} onToggle={handleToggle}>
        <Navbar.Brand>Preet Patel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mr-auto">
            <Link href="/" passHref>
              <Nav.Link href="/" onClick={handleNavLinkClick}>
                Home
              </Nav.Link>
            </Link>
            <Link href="/search" passHref>
              <Nav.Link href="/search" onClick={handleNavLinkClick}>
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
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
