import React, { Component } from 'react';
import { connect } from "react-redux"

import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class MainNavbar extends Component {

  render() {
    const { player, players } = this.props;
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              WoTStats.online
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown title={player} id="basic-nav-dropdown">
                { players.map((player, index) =>
                  <MenuItem key={ "menuitem-" + player.account_id }>
                    <Link to={ `/player/${player.account_id}/stats` }>{player.player}</Link>
                  </MenuItem>
                )}
              </NavDropdown>
              <NavItem href="#">EU</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect(
  (store) => ({ players: store.players.players, player: store.players.player })
)(MainNavbar);
