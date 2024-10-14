import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import styles from "../../style/components/UserPanel/NavBar.module.scss";
import avatar from "../../assets/images/user.png";

export default function NavBar() {
  return (
    <>
      <Navbar className="bg-secondary">
        <Container fluid="lg">
          <Navbar.Brand href="#" className="fs-4 fw-bold text-primary">Pathify</Navbar.Brand>
          <Dropdown align="end">
              <Dropdown.Toggle
                as="div" // Custom trigger component
                href="#"
                className={`${styles.dropdown} d-flex align-items-center`}
              >
                <img src={avatar} width={40} height={40}/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Container>
      </Navbar>
    </>
  )
}