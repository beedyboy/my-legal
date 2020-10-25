import React, { Fragment } from "react";
import Helmet from "react-helmet";
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Link } from "react-router-dom";
const Practise = () => {
  return (
    <Fragment>
      <Helmet> 
        <title>MyLegal Solutions - Online Legal Consultants in Nigeria |  Practise Area</title>
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
        style={{
          backgroundImage: `url(images/practise-area-my-legal-solution.jpg)`,
        }}
        data-stellar-background-ratio="0.5"
        id="section-Practise"
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
        <h1 className="text-center">Our Area of Pratice</h1>

        <div className="divider"></div>
      </section>
      <section className="py-4 bg-light" id="section-Practise">
        <Container>
          <Row className="row align-items-center">
            <Col
              md="12"
              lg="5"
              className="ml-auto order-lg-2 position-relative mb-3"
              data-aos="fade-up"
            >
              <img
                src="images/mls-gavel.jpg"
                alt="what we do"
                className="img-fluid rounded"
                height="120"
              />
            </Col>
            <Col md="12" lg="7" className="order-lg-1" data-aos="fade-up">
              <h3 className="heading mb-3 border-left">
                Below are Our Areas of Practice at My-Legal Solutions, with our
                Attorneys with a cummulatiive years of experience of more than
                50 years.
              </h3>
              {/* <p className="mb-5">
              Below are Our Areas of Practice at My-Legal Solutions, with our Attorneys with a cummulatiive years of experience of more than 50 years.
              </p> */}
              <p>
                In an ever growing world of Business, Family and various
                associations we have with individuals, organizations of even the
                government; it is more than ever essential to have and use
                professional legal service in forms of MOU Drafting and
                enforcement, Contracts drafting and enforcement, Divorce and
                disputes settlement and so on depending on the case matter. We
                at My-Legal Solutions pride ourselves in our professionalism and
                have carefully selected below; areas of legal practice our
                Attorneys handle, within Nigeria and cross-border matters
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <section className="heading mb-3"> */}
      <section className="py-3 bg-light">
        <Container>
          <Row>
            <Col md="4" sm="12">
              <h3 className="text-center">Area of Pratice</h3>
              <ListGroup>
                <ListGroupItem color="success">
                  Admiralty and Shipping
                </ListGroupItem>
                <ListGroupItem color="success">Criminal law</ListGroupItem>
                <ListGroupItem color="success">Real Estate</ListGroupItem>
                <ListGroupItem color="success">Probate Law</ListGroupItem>
                <ListGroupItem color="success">Business Law</ListGroupItem>
                <ListGroupItem color="success">Corporate Law</ListGroupItem>
                <ListGroupItem color="success">Music Law</ListGroupItem>
                <ListGroupItem color="success">Employment Law</ListGroupItem>
                <ListGroupItem color="success">
                  Fraud & Asset Recovery
                </ListGroupItem>
                <ListGroupItem color="success">Tort</ListGroupItem>
                <ListGroupItem color="success">Family Law</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md="8" sm="12">
              <Row className="mt-4">
                <Col md="12">
                  <h5 className="text-danger border-bottom">
                    Admiralty and Shipping
                  </h5>
                  <p>
                    Bills of lading disputes, Cargo claims, Charter party
                    disputes, Collision claims, Demurrage claims, Freight claims
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Criminal law</h5>
                  <p> 
                    Search and Arrest / bail application, Drunk driving, parole
                    probation, violent crimes, homicide, juvenile law
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Real Estate</h5>
                  <p>
                    Home Buying / Selling, Landlord / Tenant, Mortgage and
                    Foreclosure, Construction disputes
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Probate Law</h5>
                  <p>
                    Wills / Letter of Administration, Administration of Estates,
                    Assent, Codicil, Estate Planning
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Business Law</h5>
                  <p>
                    Cross-border and multi-jurisdictional claims,
                    Distributorship agreements, International Sale of Goods,
                    Mareva and other forms of interlocutory injunctions,
                    Franchise law
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Corporate Law</h5>
                  <p>
                    Incorporation of company / Business Name, Corporate
                    Governance, Company winding up/ judicial management, Joint
                    Venture Agreements / Partnership
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Music Law</h5>
                  <p>
                  Privacy and Record label Agreements
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Employment Law</h5>
                  <p>
                  Confidentiality clauses, Disputes involving employment law matters
                  Worker Compensation,
                  General advice on employment matters,
                  Restraint of trade clauses,
                  Reviewing and drafting of employment contracts
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Fraud & Asset Recovery</h5>
                  <p>
                  Advice on fraud cases and strategies,
                  Constructive trust issues knowing receipt & knowing assistance,
                  Pre-action discovery to trace movement of funds,
                  Debt Recovery,
                  Fundamental Human Rights,
                  Unlawful Detention,
                  Malicious Prosecution,
                  Immigrations / Customs Service and
                  Citizenship, business permit, residential permit, expatriate quota.
                  smuggling of illegal goods, unlawful seizure of goods.
                  </p>
                </Col>
                <Col md="12">
                  <h5 className="text-danger border-bottom">Tort</h5>
                  <p>
                  Defamation actions,
                  Trespass, nuisance, assault and battery,
                  Negligence claims including medical and other professional negligence matters
                  </p>
                </Col> 
                <Col md="12">
                  <h5 className="text-danger border-bottom">Family Law</h5>
                  <p> 
                    Divorce, child support, child custody, spousal support/Alimony. 
                  </p>
                </Col> 
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};
export default Practise;
