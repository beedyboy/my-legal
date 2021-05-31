import React, { Fragment } from "react";
import Helmet from "react-helmet";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick"; 
import Testimony from "../../components/Testimony/Testimony";

const Home = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          variableWidth: false,
        },
      },
    ],
  };
  return (
    <Fragment>
         <Helmet>
        <title>MyLegal Solutions - Online Legal Consultants in Nigeria </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="My Legal Solutions Nigeria" />
        <meta property="og:site_name" content="My Legal Solutions Nigeria" />
        <meta property="og:image"  content="www.mylegalsolutions.org/facebook.html" />
        <meta name="description"
      content="My Legal Solutions is a Nigerian Online law firm that provides more than just high quality and practical legal solutions to our clients. We focus our practice on a wide range of commercial and corporate dispute resolution matters encompassing litigation, arbitration and mediation all online and professional. We also provide corporate law advice encompassing drafting and reviewing of joint venture agreements, wills, partnership agreements as well as banking and security documentation." />
        <meta name="keywords"
      content="law,lagos,nigeria,commercial dispute,corporate dispute,litigation,arbitration,mediation,corporate law advice,joint venture agreement,real estate, partnership agreement,banking documentation,security documentation,complex cross-border disputes,simple claims,straight forward claims,Singapore,law,drafting,reviewing" />
        <meta name="copyright" content="MyLegal Solutions Nigeria" />
        <meta name="author" content="solution influx limited" />
      </Helmet>
      
      <section
        className="site-hero overlay"
        style={{ backgroundImage: `url(images/law-city.jpg)` }}
        data-stellar-background-ratio="0.5"
        id="section-home"
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

      <section className="section bg-light pb-0">
        <Container>
          <Row className="banner-card">
            <Col sm="12" md={{ offset: 4, size: 4 }}>
              <div
                className="block-32"
                data-aos="fade-up"
                data-aos-offset="-200"
              >
                <div className="font-weight-bold text-uppercase">
                  <h4>
                    {" "}
                    <span className="text-black">our</span>{" "}
                    <span className="text-danger">expertise</span>
                  </h4>
                </div>
                <p className="text-align text-break">
                  Lawyers and attorneys of our law firm provide a broad range of
                  legal advisory and representation services to our Clients.
                </p>
                <span>
                  <Link
                    className="btn rounded bg-warning d-flex justify-content-center text-justify text-uppercase"
                    to="/expertise"
                  >
                    View expertise <i className="fa fa-arrow-down pt-1"></i>
                  </Link>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light" id="section-about">
        <Container>
          <Row className="row align-items-center">
            <Col
              className="col-md-12 col-lg-5 ml-auto order-lg-2 position-relative mb-3"
              data-aos="fade-up"
            >
              <img
                src="images/justice-map.jpg"
                alt="what we do"
                className="img-fluid rounded"
                height="120"
              />
            </Col>
            <Col className="col-md-12 col-lg-7 order-lg-1" data-aos="fade-up">
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
              <p>
                <Link
                  to="https://vimeo.com/channels/staffpicks/93951774"
                  data-fancybox
                  className="btn btn-sm btn-danger text-white py-2 mr-3 mb-1  text-uppercase letter-spacing-1"
                >
                  Discover More
                </Link>{" "}
                <Link
                  to="https://vimeo.com/channels/staffpicks/93951774"
                  data-fancybox
                  className="btn btn-sm btn-secondary text-white py-2 mr-3 mb-1  text-uppercase letter-spacing-1"
                >
                  Meet Our Team
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="news-event hp-spot-wrap">  */}
      {/* <section className="section bg-secondary">
        <Container>
          <Row>
            <Col md="5">
              <h2 className="heading text-uppercase" data-aos="fade-up">
                news <span className="txt-danger">&</span> insights
              </h2>{" "}
              <p>
                <a
                  className="viewall"
                  href="the-firm/news-events.html"
                  title="View All"
                >
                  View all news &amp; events
                </a>
              </p>
            </Col>
            <Col md="7">
              <Slider {...settings}>
                <div className="news-list">
                  <a href="the-firm/news-events">
                    <div className="news-type">Firm News</div>
                    <h3>
                     MLS Earns Top Marks in 2020 Corporate Equality
                      Index
                    </h3>
                  </a>
                </div>
                <div className="news-list">
                  <a href="the-firm/our-notable-victories">
                    <div className="news-type">Firm News</div>
                    <h3>
                     We are 10years better
                    </h3>
                  </a>
                </div>

                <div className="news-list">
                  <a href="the-firm/news-events">
                    <div className="news-type">Firm News</div>
                    <h3>
                     MLS files antitrust complaint against Microsoft
                      on behalf of Slack
                    </h3>
                  </a>
                </div>
              </Slider>
            </Col>
          </Row>
        </Container>
        
      </section>

      <section className="section testimonial-section py-3">
        <Container>
          <Row className="justify-content-center text-center mb-3">
            <Col md="7">
              <h2 className="heading mb-3  text-uppercase">
                <span className="text-danger">People</span> Says
              </h2>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Testimony /> 
            </Col>
          </Row>
        </Container>
      </section> */}
    </Fragment>
  );
};
export default Home;
