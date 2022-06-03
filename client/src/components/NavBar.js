import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  
  // const renderNewPFButton = (user) => {
  //   if (user.role !== 0) { return (
  //     <Button as={Link} to="/portfolios/new">
  //       New Portfolio
  //     </Button>)
  //   } else {return null}
  // }

  return (
    <Wrapper>
      <CurrentUser>User: {user.username}</CurrentUser>
      <Logo>
        <Link to="/">Bonsai Money Management</Link>
      </Logo>
      <Nav>
        <Button as={Link} to="/portfolios/new">
          New Portfolio
        </Button>)
        <Button as={Link} to="/stocks">
          Asset Database
        </Button>
        <Button variant="outline" onClick={handleLogoutClick}>
          Logout
        </Button>
      </Nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 0;
  line-height: 1;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4px;
  position: absolute;
  right: 8px;
`;

const CurrentUser = styled.h2`
position: absolute;
left: 8px;
`;

export default NavBar;
