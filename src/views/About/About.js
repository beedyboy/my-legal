import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom"; 
const About = () => { 
  return (
    <Fragment>
      <Helmet>
        <title>My Legal Solution</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="For your organization" />
      </Helmet>
      {/* <Row className="mt-2">
        <Col md="12">
            <section className="mt-2 hp-banner">
                <img src="/images/law-city.jpg" alt="law town" className="hero-slide" />
            </section>
        </Col>
      </Row> */}
      <section
        className="site-hero overlay"
        style={{ backgroundImage: `url(images/lady-justice.jpg)` }}
        data-stellar-background-ratio="0.5"
        id="section-About"
      >
        <div className="container">
          <div className="row site-hero-inner justify-content-center align-items-center">
            <div className="col-md-10 text-center" data-aos="fade-up">
              <h1 className="heading">
                For every problem, there is a solution
              </h1>
            </div>
          </div>
        </div>
        <Link className="mouse smoothscroll" to="#next">
          <div className="mouse-icon">
            <span className="mouse-wheel"></span>
          </div>
        </Link>
      </section>
 
      <section className="py-5 bg-light" id="section-about">
        <Container>
          <Row className="row align-items-center">
            <Col md="12" lg="5"
              className="ml-auto order-lg-2 position-relative mb-3"
              data-aos="fade-up"
            >
              <img
                src="images/justice-map.jpg"
                alt="what we do"
                className="img-fluid rounded"
                height="120"
              />
            </Col>
            <Col md="12" lg="7" className="order-lg-1" data-aos="fade-up">
              <h2 className="heading mb-3  text-uppercase">
                <span className="text-danger">Our</span> Firm!
              </h2>
              <p className="mb-5">
                MyLegal Solutions is an online Legal service provider, created
                to fill the need for understandable and efficient Legal
                solutions by offering you the convenience and quality of
                in-house and business Legal consultancy services and other
                facilities in the field of Law. Through our services, we give
                you the opportunity to get answers to all your legal questions
                On-line, wherever in the world you may be.
              </p>
               
            </Col>
            <Col>
            <h2 className="heading mb-3  text-uppercase">
                <span className="text-danger">Our</span> TEAM
              </h2> 
Our team of lawyers is made up of experienced practitioners who together bring with them a wealth of technical and practical knowledge in local and cross-border matters

OUR MISSION & VISION
Our vision is to provide our clients with skilled legal advice in a timely and efficient manner. We strive to handle each matter with accountability and responsiveness, as if we were representing ourselves. ... Our vision reflects our values: integrity, service, excellence and teamwork.

CORPORATE SOCIAL RESPONSIBILITY
Each year the firm supports a nominated charity and encourages fund raising activities organized by the Social and Charity Committee. This year our chosen charity is The Children gifted school for the Blind.
            </Col>
          </Row>
        </Container>
      </section>

     </Fragment>
  );
};
export default About;