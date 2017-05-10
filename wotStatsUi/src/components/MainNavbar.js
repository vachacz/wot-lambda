import React, { Component } from 'react';
import { connect } from "react-redux"

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { fetchPlayers, selectPlayer } from '../actions/playerActions.js';

class MainNavbar extends Component {

  componentWillMount() {
    this.props.fetchPlayers()
  }

  render() {
    const { player, players } = this.props;
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              WoT MyStats
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown title={player} id="basic-nav-dropdown">
                { players.map((player, index) =>
                  <MenuItem key={player.account_id} onSelect={() => this.props.selectPlayer(player)}>{player.player}</MenuItem>
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
  (store) => ({ players: store.players.players, player: store.players.player }),
  { fetchPlayers, selectPlayer }
)(MainNavbar);
