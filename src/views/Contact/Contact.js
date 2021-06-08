/* eslint-disable no-use-before-define */
import React, { Fragment, useState, useEffect } from "react";
import Helmet from "react-helmet";
import { Container, Button, FormText, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "./contact.css";
import dataHero from "data-hero"; 
const schema = {
  email: {
    email: true,
    message: "Email is required",
  },
  message: {
    isEmpty: false,
    min: 1,
    message: "Message is required",
  },
};
const Contact = () => {
  const [formState, setFormState] = useState({
    values: {
      name: "",
      message: "",
      phone: "",
    },
    touched: {},
    errors: {},
  });
  const { touched, errors, values, isValid } = formState;

  useEffect(() => {
    const errors = dataHero.validate(schema, values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.email.error || errors.message.error ? false : true,
      errors: errors || {},
    }));
  }, [values]);

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) => touched[field] && errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   email: values.email,
    //   subject: process.env.REACT_APP_CLIENT_EMAIL_SUBJECT,
    //   message: "Thank you for contacting us, we will get back to you shortly",
    // };
    // const name = 'Name: ' + values.name;
    // const phone = <p>{values.phone}</p>
    // const msg = <p>{values.message}</p>
    // const message = name + phone + msg;
    // const data2 = {
    //   email: values.email,
    //   subject: process.env.REACT_APP_ADMIN_EMAIL,
    //   message 
    // };
    // mailer.sendEmail(data);
    // mailer.sendEmail(data2);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        name: "",
        message: "",
        phone: "",
      },
      touched: {
        ...prev.touched,
        name: false,
        message: false,
      },
      errors: {},
    }));
  };
  return (
    <Fragment>
      <Helmet>
        <title>
          MyLegal Solutions - Online Legal Consultants in Nigeria | Contact
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
          name="message"
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

      <section
        className="py-5 bg-light"
        id="section-Contact"
        data-aos="fade-up"
      >
        <Container>
          <div className="contactForm">
            <div className="contact-info">
              <h3 className="title">Let's get in touch</h3>
              <p className="text">
                {" "}
                We thank you for your interest in MyLegal Soutions Legal and
                Real Estate Services. For Further Enquiries, kindly give us a
                Call ,Email or WhatsApp and we will Provide all Information
                needed Promptly{" "}
              </p>
              <div className="info">
                <div className="social-information">
                  {" "}
                  <i className="fa fa-map-marker"></i>
                  <p>
                    11/12 Lore Plaza 1, Olabisi Seriki Street, Majek 1st Gate,
                    Lekki-Epe Expressway, Lagos.
                  </p>
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
                    value={values.name || ""}
                    onChange={handleChange}
                  />{" "}
                </div>
                <div className="social-input-containers">
                  {" "}
                  <FormGroup
                        className={hasError("email") ? "has-danger" : null}
                      >    <input
                    type="email"
                    name="email"
                    className="input"
                    value={values.email || ""}
                    onChange={handleChange}
                    placeholder="Email"
                  />{" "}
                     <FormText>
                          <p className="text-danger">
                            {hasError("email")
                              ? formState.errors.email &&
                                formState.errors.email.message
                              : null}
                          </p>
                        </FormText>
                        </FormGroup>
                </div>
                <div className="social-input-containers">
                  {" "}
                  <input
                    type="tel"
                    name="phone"
                    className="input"
                    placeholder="Phone"
                    value={values.phone || ""}
                    onChange={handleChange}
                  />{" "}
                </div>
                <div className="social-input-containers textarea">
                  {" "}
                  <textarea
                    name="message"
                    className="input"
                    placeholder="Message"
                    value={values.message || ""}
                    onChange={handleChange}
                  ></textarea>{" "}
                </div>{" "}
                <Button
                  type="submit"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Send
                </Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};
export default Contact;
