import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getPlayers } from '../api/WotMyStatsClient.js';
import emitter from '../const/Const.js';

export default class MainNavbar extends Component {
  constructor(props) {
    super()
    this.state = { players: [] }
  }
  componentWillMount() {
    getPlayers((players) => { this.setState(players) })
  }
  onPlayerSelected(i) {
    var player = this.state.players[i]
    emitter.emit('playerSelected', player.account_id)
    this.setState({ player: player.player })
  }
  render() {
    var players = this.state.players.map((player, index) =>
      <MenuItem onSelect={ this.onPlayerSelected.bind(this, index) }>{player.player}</MenuItem>
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
