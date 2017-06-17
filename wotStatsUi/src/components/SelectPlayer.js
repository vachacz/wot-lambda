import React, { Component } from 'react';
import { connect } from "react-redux"
import { Modal, Button, OverlayTrigger } from 'react-bootstrap';

import { showEffectiveIntroModal, hideEffectiveIntroModal } from '../actions/appActions.js';

class SelectPlayer extends Component {

  render() {
    return (
      <div className="container">
        <h2>How it works?</h2>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>1</span></div>
          <span className="paragraph-intro">Enter your <a href="http://worldoftanks.eu">World of Tanks</a> player name</span><span className="beta">(disabled in beta version)</span>
        </div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>2</span></div>
          <span className="paragraph-intro">Let <a href="http://my.wotstats.online">my.wotstats.online</a> download your <a href="http://worldoftanks.eu">World of Tanks</a> statistics daily</span>
        </div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>3</span></div>
          <span className="paragraph-intro">Review your most recent daily statistics</span>
        </div>
        <div className="intro-img"><img src="/img/intro1.png"/></div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>4</span></div>
          <span className="paragraph-intro">Review your recent effective statistics (<a href="#" onClick={this.props.showEffectiveIntroModal}>read more about effective stats ...</a>)</span>
        </div>
        <div className="intro-img"><img src="/img/intro2.png"/></div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>5</span></div>
          <span className="paragraph-intro">Compare your avarage <a href="http://worldoftanks.eu">World of Tanks</a> stats with the most recent effective stats</span>
        </div>
        <div className="intro-img"><img src="/img/intro3.png"/></div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>6</span></div>
          <span className="paragraph-intro">Compare statistics of your tanks</span>
        </div>
        <div className="intro-img"><img src="/img/intro4.png"/></div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>7</span></div>
          <span className="paragraph-intro">Review detailed statistics for each of your tanks</span>
        </div>
        <div className="paragraph-middle">
          <div className="numberCircle"><span>8</span></div>
          <span className="paragraph-intro">Enjoy the stats and improve your skills with <a href="http://my.wotstats.online">my.wotstats.online</a> :)</span>
        </div>
        <div className="intro-footer" />

        <Modal show={this.props.effectiveIntroModalVisible} dialogClassName="modal-dialog modal-wot">
          <Modal.Header>
            <Modal.Title>Effective statistics</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Have you ever asked a question like:</p>
            <ul>
              <li><i>"Am i getting a better WoT player?"</i></li>
              <li><i>"What was my average damage since last week?"</i></li>
              <li><i>"Is my win ratio increasing?"</i></li>
              <li><i>"What is my real efficiency?"</i></li>
            </ul>
            <p>These question are important for a skilled player and unfortunately it's difficult to answer them, because either WoT or most stat websites
            provide only most recent player stats. For a player with thousands of battles it's difficult to observe trends and skill progression, because average player stats
            change very slowly. Fortunately <b>my.wotstats.online</b> solves this problem!</p>

            <p><b>my.wotstats.online</b> computes effective stat values based on daily stat snapshots obtained from WoT and presents them in form of tables and diagrams for
            every statistic provided by WoT. Screenshot below presents mechanics of a typical diagram. Table on the left side contains raw damage data incl. total and average damage dealt,
            whereas the diagrams on the right presents the same data in readable graphical form. Green data series presents overall average damage dealt, whereas blue data series
            represents effective average damage.</p>

            <img src="/img/eff1.png"/>
            <br/><br/>

            <p>Calculation of effective values works in two modes: <b>Absolute</b> and <b>Relative</b>. The default one - <b>Relative</b> - calculates effective stat using two adjacent
            stat snapshots. This mode is useful to see daily skill progression. The second mode - <b>Absolute</b> - takes the most recent data snapshot as a baseline and
            computes effective values for all other snapshots against the most recent value. This is useful to see long term skill progression. Diagram below shows this
            process in graphical form.</p>

            <img src="/img/eff2.png"/>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hideEffectiveIntroModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(
  (store) => ({ players: store.players.players, player: store.players.player, effectiveIntroModalVisible: store.app.effectiveIntroModalVisible }),
  { showEffectiveIntroModal, hideEffectiveIntroModal }
)(SelectPlayer);
