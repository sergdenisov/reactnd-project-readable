import React from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to="/">
          <a>Redux Nanodegree&apos;s Project: Readable</a>
        </LinkContainer>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

export default Navigation;
