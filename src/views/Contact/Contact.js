import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Row, Col, Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import './contact.css';
const Contact = () => {
  return (
    <Fragment>
      <Helmet>
        <title>My Legal Solution | Contact</title>
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
        style={{ backgroundImage: `url(images/my-legalsolutioncontact.jpg)` }}
        data-stellar-background-ratio="0.5"
        id="section-Contact"
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
      <section>
        <h1 className="text-center">Contact Our Services</h1>

        <div className="divider"></div>
      </section>
      {/* <section className="py-5 bg-light" id="section-Contact">
        <Container>
          <Row className="row align-items-center">
            <Col
              md="12"
              lg="5"
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
          </Row>
        </Container>
      </section> 
     */}
      <section className="py-5 bg-light" id="section-Contact"  data-aos="fade-up">
        <Container>
          <div className="contactForm">
            <div className="contact-info">
              <h3 className="title">Let's get in touch</h3>
              <p className="text">
                {" "}
                We thank you for your interest in MyLegal Soutions Legal and Real Estate Services.

For Further Enquiries, kindly give us a Call ,Email or WhatsApp and we will Provide all Information needed Promptly{" "}
              </p>
              <div className="info">
                <div className="social-information">
                  {" "}
                  <i className="fa fa-map-marker"></i>
                  <p>Suite 25/26, Kabsal Complex, 1 Olabisi Street, Majek 1st Gate, Lekki-Epe, Expressway, Lagos</p>
                </div>
                <div className="social-information">
                  {" "}
                  <i className="fa fa-envelope-o"></i>
                  <p>info@my-legalsolutions.com</p>
                </div>
                <div className="social-information">
                  {" "}
                  <i className="fa fa-mobile-phone"></i>
                  <p>+234-706-589-2902 </p> 
                </div>
                <div className="social-information">
                  {" "}
                  <i className="fa fa-whatsapp"></i>
                  <p>+234-808-627-5220 </p> 
                </div>
              </div>
              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  {" "}
                  <a href="#">
                    {" "}
                    <i className="fa fa-facebook-f"></i>{" "}
                  </a>{" "}
                  <a href="#">
                    {" "}
                    <i className="fa fa-twitter"></i>{" "}
                  </a>{" "}
                  <a href="#">
                    {" "}
                    <i className="fa fa-instagram"></i>{" "}
                  </a>{" "}
                  <a href="#">
                    {" "}
                    <i className="fa fa-linkedin"></i>{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
            <div className="contact-info-form">
              {" "}
              <span className="circle one"></span>{" "}
              <span className="circle two"></span>
              <form action="#" onclick="return false;" autocomplete="off">
                <h3 className="title">Contact us</h3>
                <div className="social-input-containers">
                  {" "}
                  <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Name"
                  />{" "}
                </div>
                <div className="social-input-containers">
                  {" "}
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                  />{" "}
                </div>
                <div className="social-input-containers">
                  {" "}
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    placeholder="Phone"
                  />{" "}
                </div>
                <div className="social-input-containers textarea">
                  {" "}
                  <textarea
                    name="message"
                    className="input"
                    placeholder="Message"
                  ></textarea>{" "}
                </div>{" "}
                <Button type="submit" color="primary">Send</Button>
             
              </form>
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};
export default Contact;
