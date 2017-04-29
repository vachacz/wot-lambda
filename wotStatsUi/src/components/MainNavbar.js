import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { getPlayers } from '../api/WotMyStatsClient.js';
import emitter from '../const/Const.js';

class MainNavbar extends Component {
  constructor(props) {
    super()
    this.state = { player: "", players: [] }
  }
  componentWillMount() {
    getPlayers(this)
  }
  onPlayerSelected(i) {
    var player = this.state.players[i]
    emitter.emit('playerSelected', player.account_id)
    this.setState({ player: player.player })
  }
  render() {
    var players = []
    for (var i = 0; i < this.state.players.length; i++) {
       players.push(
         <MenuItem onSelect={this.onPlayerSelected.bind(this, i)}>{this.state.players[i].player}</MenuItem>
       )
    }
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

export default MainNavbar;
