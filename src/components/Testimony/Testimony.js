import React, { Fragment } from 'react';
import Slider from "react-slick";  
const Testimony = (props) => {
    
  var settings = {
    dots: true,
    autoplay: true,
    arrows: true,
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
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          variableWidth: false,
        },
      },
    ],
  };
 

  return (
    <Fragment>
       <Slider {...settings}>
       <div className="testimonial text-center slider-item">
                  {/* <div className="author-image mb-3">
                    <img
                      src="/images/person_1.jpg"
                      alt="placeholder"
                      className="rounded-circle mx-auto"
                    />
                  </div> */}
                  <blockquote>
                    <p>
                      &ldquo;A small river named Duden flows by their place and
                      supplies it with the necessary regelialia. It is a
                      paradisematic country, in which roasted parts of sentences
                      fly into your mouth.&rdquo;
                    </p>
                  </blockquote>
                  <p>
                    <em>&mdash; Jean Smith</em>
                  </p>
                </div>
                <div className="testimonial text-center slider-item">
                  {/* <div className="author-image mb-3">
                    <img
                      src="/images/person_2.jpg"
                      alt="placeholder"
                      className="rounded-circle mx-auto"
                    />
                  </div> */}
                  <blockquote>
                    <p>
                      &ldquo;Even the all-powerful Pointing has no control about
                      the blind texts it is an almost unorthographic life One
                      day however a small line of blind text by the name of
                      Lorem Ipsum decided to leave for the far World of
                      Grammar.&rdquo;
                    </p>
                  </blockquote>
                  <p>
                    <em>&mdash; John Doe</em>
                  </p>
                </div>
                <div className="testimonial text-center slider-item">
                  {/* <div className="author-image mb-3">
                    <img
                      src="/images/person_3.jpg"
                      alt="placeholder"
                      className="rounded-circle mx-auto"
                    />
                  </div> */}
                  <blockquote>
                    <p>
                      &ldquo;When she reached the first hills of the Italic
                      Mountains, she had a last view back on the skyline of her
                      hometown Bookmarksgrove, the headline of Alphabet Village
                      and the subline of her own road, the Line Lane.&rdquo;
                    </p>
                  </blockquote>
                  <p>
                    <em>&mdash; John Doe</em>
                  </p>
                </div>
                <div className="testimonial text-center slider-item">
                  {/* <div className="author-image mb-3">
                    <img
                      src="/images/person_1.jpg"
                      alt="placeholder"
                      className="rounded-circle mx-auto"
                    />
                  </div> */}
                  <blockquote>
                    <p>
                      &ldquo;A small river named Duden flows by their place and
                      supplies it with the necessary regelialia. It is a
                      paradisematic country, in which roasted parts of sentences
                      fly into your mouth.&rdquo;
                    </p>
                  </blockquote>
                  <p>
                    <em>&mdash; Jean Smith</em>
                  </p>
                </div>
                <div className="testimonial text-center slider-item">
                  {/* <div className="author-image mb-3">
                    <img
                      src="/images/person_2.jpg"
                      alt="placeholder"
                      className="rounded-circle mx-auto"
                    />
                  </div> */}
                  <blockquote>
                    <p>
                      &ldquo;Even the all-powerful Pointing has no control about
                      the blind texts it is an almost unorthographic life One
                      day however a small line of blind text by the name of
                      Lorem Ipsum decided to leave for the far World of
                      Grammar.&rdquo;
                    </p>
                  </blockquote>
                  <p>
                    <em>&mdash; John Doe</em>
                  </p>
                </div>
       </Slider>
    </Fragment>
  );
}

export default Testimony;