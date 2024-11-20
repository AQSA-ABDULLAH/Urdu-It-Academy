import "./Footer.scss";
import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import twitterIcon from "../"
// import facebookIcon from "../../public/assets/images/FacebookLogo.png"
// import youtubeIcon from "../../public/assets/images/YoutubeLogo.png"
// import linkedInIcon from "../../public/assets/images/LinkedinLogo.png"

export class Footer extends Component {
  static propTypes = {};

  render() {
    return (
      <footer>
        <Container>
          <Row>
            <Col md={2} sm={3}>
              <h4>About</h4>
              <ul>
                <li>
                  <a href="/aboutus">Our Mission</a>
                </li>
                <li>
                  <a href="/aboutus">Our Team</a>
                </li>
                <li>
                  <a href="/aboutus">Our Partners</a>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={3}>
              <h4>Courses</h4>
              <ul>
                <li>
                  <a href="/courses">New Courses</a>
                </li>
                <li>
                  <a href="/courses">Course achive</a>
                </li>
              </ul>
            </Col>
            <Col md={3} sm={3}>
              <h4>Help & Support</h4>
              <ul>
                <li>
                  <a href="/licence-aggrement">License aggrement</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/contactus">Contact Us</a>
                </li>
              </ul>
            </Col>
            <Col md={2} sm={3}>
              <h4>Contribute</h4>
              <ul>
                <li>
                  <a href="/help">Volunteer</a>
                </li>
                <li>
                  <a href="/help">Donate</a>
                </li>
              </ul>
            </Col>
            <Col md={2} sm={3}>
              <h4 className="">Follow Us</h4>
              <div className="social-share my-3 text-end">
                <span className="px-2">
                  <img src="../assets/images/TwitterLogo.png" alt="Twitter Logo" />
                </span>
                <span className="px-2">
                  <img src="../assets/images/facebookLogo.png" alt="Facebook Logo" />
                </span>
                <span className="px-2">
                  <img src="../assets/images/youtubeLogo.png" alt="Youtube Logo" />
                </span>
                <span className="px-2">
                  <img src="../assets/images/linkedinLogo.png" alt="LinkedIn Logo" />
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>2024 © Urdu IT Academy | All rights reserved</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
