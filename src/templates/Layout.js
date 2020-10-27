import React, { Fragment, useEffect, useState } from "react";
// import { Container, Row, Col } from "reactstrap";
import Aos from "aos";
import TopBar from "../components/TopBar/TopBar";
import "./styles.css";
import "./media.css";
import Footer from "../components/Footer/Footer";
import PerfectScrollBar from 'react-perfect-scrollbar';

const Layout = (props) => {
  const { children } = props;
  const [scroll, setScroll] = useState("");
  useEffect(() => {
    Aos.init({ duration: 2000 });
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  const handleScroll = (e) => {
    const current = window.scrollY; 
    if (current === 0) {
      setScroll("");
    } else if (current > 0 && current < 150 ) {
      setScroll("scrolled sleep");
    } else if (current > 150 && current < 350) {
      setScroll("scrolled");
    } else if (current > 350) {
      setScroll("scrolled awake");
    } else {
      setScroll("");
    }
    // console.log({current})
  };
  return (
    <Fragment>
      <TopBar scroll={scroll} />
      {/* <section className="main_container"> */}
      <PerfectScrollBar>
      {children}
      </PerfectScrollBar>
      
        {/* <Container fluid={true}>
          <Row>
            <Col md="12">
              <main>{children}</main>
            </Col>
          </Row>
        </Container> */}
      <Footer />
      {/* </section> */}
    </Fragment>
  );
};

export default Layout;
