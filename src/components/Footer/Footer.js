import React, { Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <Fragment>
      <footer>
        <Row>
          <Col md="12" className="footer-section">
            <Container>
              <Row>
                <Col md="3" className="mb-5 company-info-nav-list">
                  <h3>company</h3>
                  <ul className="list-unstyled link">
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/expertise">Our Expertise</Link>
                    </li>
                    <li>
                      <Link to="/career">career</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </Col>
                <Col md="3" className="mb-5 company-info-nav-list">
                  <h3>Reach us</h3>
                  <dl className="list-unstyled link">
                    <dt>Registered Office</dt>
                    <dd>
                      <address>
                      4  Chief Lukeman Ogunlana Olorunjare St. Harmony Garden Estate, Awoyaya. Lagos
                      </address>
                    </dd>
                    <dt>
                      Registered number <i className="fa fa-phone"></i>
                    </dt>
                    <dd>+(234) 706-589-2902</dd>
                    <dt>
                      Mail us
                      <i className="fa fa-mail"></i>
                    </dt>
                    <dd>info@my-legalsolutions.com</dd>
                  </dl>
                  <div className="whatsapp">
                    <a
                      href="https://api.whatsapp.com/send?phone=2348086275220&amp;text=hello guys;source=&amp;data=&amp;app_absent="
                      className="float"
                      target="_blank"
                    >
                      <i className="fa fa-whatsapp my-float"></i>
                    </a>
                  </div>
                </Col>
                <Col md="6" className="mb-5 company-info-nav-list">
                  <div className="mapouter">
                    <div className="gmap_canvas">
                     
                      <iframe
                        id="gmap_canvas"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.2059900442512!2d3.6540871378807047!3d6.469382849179594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf9d411df09dd%3A0xe6630c6fbba82b5a!2sLAW%20OFFICE%20(My%20legal%20Solutions%20Chambers)!5e0!3m2!1sen!2sng!4v1622441474709!5m2!1sen!2sng"
                        marginheight="0"
                        marginwidth="0"
                        frameborder="0"
                        height="300"
                        scrolling="no"
                        allowfullscreen="true"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="social">
            {" "}
            <Container>
              <div className="wrapper">
                <div className="social-icons">
                  <ul className="list-unstyled link">
                    <li>
                      <Link
                        rel="noopener"
                        to="https://www.youtube.com/channel/UCuAVJTZ1TkX9gPmf5ciJSjA"
                        target="_blank"
                      >
                        <span className="fa fa-youtube"></span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener"
                        to="https://www.facebook.com/QETrialLawyers/"
                        target="_blank"
                      >
                        <span className="fa fa-facebook"></span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener"
                        to="https://twitter.com/quinnemanuel"
                        target="_blank"
                      >
                        <span className="fa fa-twitter"></span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener"
                        to="https://www.instagram.com/quinnemanuel/"
                        target="_blank"
                      >
                        <span className="fa fa-instagram"></span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        rel="noopener"
                        to="https://www.linkedin.com/company/quinn-emanuel/"
                        target="_blank"
                      >
                        <span className="fa fa-linkedin"></span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="left">
                  <span className="left-column">
                    &copy;
                    {new Date().getFullYear()}{" "}
                  </span>

                  <samp className="last">|</samp>
                  <span className="copyRight">
                    All rights reserved. My Legal Solutions.
                    <br />
                    Designed by{" "}
                    <a
                      href="https://solutioninflux.com"
                      target="_blank"
                      className="text-info"
                    >
                      {" "}
                      Solution Influx
                    </a>
                  </span>
                </div>
              </div>
            </Container>
          </Col>
        </Row>
      </footer>
    </Fragment>
  );
};

export default Footer;
