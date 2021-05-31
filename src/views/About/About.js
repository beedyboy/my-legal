import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
const About = () => {
  return (
    <Fragment>
      <Helmet>
        <title>
          MyLegal Solutions - Online Legal Consultants in Nigeria | About Us
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="My Legal Solutions Nigeria" />
        <meta property="og:site_name" content="My Legal Solutions Nigeria" />
        <meta
          property="og:image"
          content="www.mylegalsolutions.org/facebook.html"
        />
        <meta
          name="description"
          content="My Legal Solutions is a Nigerian Online law firm that provides more than just high quality and practical legal solutions to our clients. We focus our practice on a wide range of commercial and corporate dispute resolution matters encompassing litigation, arbitration and mediation all online and professional. We also provide corporate law advice encompassing drafting and reviewing of joint venture agreements, wills, partnership agreements as well as banking and security documentation."
        />
        <meta
          name="keywords"
          content="law,lagos,nigeria,commercial dispute,corporate dispute,litigation,arbitration,mediation,corporate law advice,joint venture agreement,real estate, partnership agreement,banking documentation,security documentation,complex cross-border disputes,simple claims,straight forward claims,Singapore,law,drafting,reviewing"
        />
        <meta name="copyright" content="MyLegal Solutions Nigeria" />
        <meta name="author" content="solution influx limited" />
      </Helmet>
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
      <section>
        <h1 className="text-center">About Our Services</h1>

        <div className="divider"></div>
      </section>
      <section className="py-5 bg-light" id="section-about">
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
                Online, for which you would not have to make a trip into a law
                office. We also provide value to you by simplifying the
                communication process between Client and Solicitor. We collect
                information beforehand and enlist lawyers practicing in that
                area of your problem. We also save the amount of time and money
                you spend consulting with a lawyer to determine you have a case
                or not. Responses to your questions, which are given by our team
                of lawyers are personalized and tailored to your specific
                situation and we treat every issue you bring to us as private
                and confidential. Our system provides you with information that
                enables you to make right decisions.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col md="12">
              <h2 className="text-center">
                {" "}
                <span className="text-danger">Our</span> TEAM
              </h2>
              <p>
                We are intellectually equipped in our firm to render to your
                good selves any of the services that may be required. The
                following seasoned legal practitioners and supporting staff are
                on seat and readily available.
              </p>
            </Col>

            <Col md="6">
              <h3>OLALEKAN ELUSOJI ESQ</h3>

               
              <p className="ml-5 pl-2">
          (Principal)
          </p>

              <blockquote>
                <img
                  src="images/mls-2.jpeg"
                  alt="what we do"
                  className="img-fluid rounded float-left"
                  height="120"
                  width="130"
                />

                <p>
                  A vast experienced legal practitioner and very result oriented
                  in legal fields with effectiveness, efficiency and
                  punctuality. He co-ordinates the briefs of the firm generally.
                  He is very accessible and discharges obligations with great
                  sense of responsibility.
                </p>
              </blockquote>
            </Col>
            <Col md="6">
              <h3>ABIODUN OGUNDARE ESQ</h3>
              <div className="ml-5"> (Partner/Head of Chambers)</div>

              <blockquote>
                <img
                  src="images/mls-1.jpg"
                  alt="what we do"
                  className="img-fluid rounded float-left"
                  height="120"
                  width="130"
                />

                <p>
                  An expert legal service provider with an excellent success
                  rate in litigation and resolving complex legal briefs. He
                  provide consultancy in international law, industrial law,
                  contracts law, family law, technical consultancy, copyright,
                  patent and trademarks: music law and piracy.
                </p>
              </blockquote>
            </Col>

            <Col md="6">
              <h3> SOLOLA AITUAJE ESQ.</h3>

              {/* <p>
                <strong>OLALEKAN ELUSOJI ESQ (Principal).</strong>
              </p> */}

              <blockquote>
                {/* <img
                  src="images/mls-2.jpg"
                  alt="what we do"
                  className="img-fluid rounded float-left"
                  height="120"
                  width="130"
                /> */}

                <p>
                  An experienced counselor and attorney specialized in legal
                  analysis, research, possess ability to solve legal questions
                  with precise answers on our website and other online services
                  rendered by our Firm and can provide a reliable expert legal
                  service for all legal problems and Corporate Consultancy
                  matters.{" "}
                </p>
              </blockquote>
            </Col>
            <Col md="6">
              <h3>EMMANUEL ADEBAYO ESQ.</h3>

              <blockquote>
                {/* <img
                  src="images/mls-1.jpg"
                  alt="what we do"
                  className="img-fluid rounded float-left"
                  height="120"
                  width="130"
                /> */}

                <p>
                  An expert legal service provider, can provide consultancy in
                  property and real estate transactions, home buying/ selling,
                  landlord/tenant, mortgage and foreclosure law, construction
                  and perfection of title documents.
                </p>
              </blockquote>
            </Col>
          </Row>

          <Row>
            <Col>
              <h2 className="heading mb-3  text-uppercase">
                <span className="text-danger">Our</span> MISSION & VISION
              </h2>
              Our vision is to provide our clients with skilled legal advice in
              a timely and efficient manner. We strive to handle each matter
              with accountability and responsiveness, as if we were representing
              ourselves. ... Our vision reflects our values: integrity, service,
              excellence and teamwork.
            </Col>
            <Col>
              <h2 className="heading mb-3  text-uppercase">
                <span className="text-danger">CORPORATE </span>
                <span>SOCIAL RESPONSIBILITY</span>
              </h2>
              Each year the firm supports a nominated charity and encourages
              fund raising activities organized by the Social and Charity
              Committee. This year our chosen charity is The Children gifted
              school for the Blind.
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};
export default About;
