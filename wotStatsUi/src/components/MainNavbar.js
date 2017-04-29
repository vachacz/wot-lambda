import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getPlayers } from '../api/WotMyStatsClient.js';
import emitter from '../const/Const.js';

export default class MainNavbar extends Component {
  constructor(props) {
    super()
    this.state = { players: [], player: "" }
  }
  componentWillMount() {
    getPlayers((players) => { this.setState(players) })
  }
  onPlayerSelected(player) {
    emitter.emit('playerSelected', player.account_id)
    this.setState({ player: player.player })
  }
  render() {
    var players = this.state.players.map((player, index) =>
      <MenuItem key={player.account_id} onSelect={ this.onPlayerSelected.bind(this, player) }>{player.player}</MenuItem>
    )
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
              <NavDropdown title={this.state.player} id="basic-nav-dropdown">
                {players}
              </NavDropdown>
              <NavItem href="#">EU</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
