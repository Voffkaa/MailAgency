'use strict';

import './bootstrap.css'

import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

const navbarInstance = (
    <Navbar brand={<a href="#">React-Bootstrap</a>}>
        <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="nav-brand-dropdown">
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3">Something else here</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="4">Separated link</MenuItem>
            </NavDropdown>
        </Nav>
    </Navbar>
);

React.render(navbarInstance, document.getElementById('mainWindow'));