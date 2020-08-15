import React from "react";
import Navbar from "../Navigation/Navbar";
import "../../stylesheets/home.css";
import "../../stylesheets/shared.css";

class Home extends React.Component {
  render() {
    return (

      <>
        <Navbar />
        <div className="home-container">
          <div className="slide">
            <section className="hero">
              <h1>The Good Neighbour</h1>
              <p>
                “Because that’s what kindness is. It’s not doing something for
                 someone else because they can’t, but because you can.
                 <span className="author"> - Andrew Iskander.</span>”
              </p>
              <div className="hero-img-container">
                <img className="hero-img"/>
              </div>

            </section>

            <section className="description">
              <div className="about">
                <h2>Who We Are?</h2>
                <p>
                  The Good Neighbour project is a community-based organization
                  that aims at providing to the needs of the elderly population
                  and those affected by COVID-19. Simply Sign-up to make requests
                  for services such as buying groceries or food items and one of
                  our community volunteers will be at your service. Want to give
                  back to the community?
              </p>
              </div>
              <div className="description-img-container">
                <img className="who-we-are-img"/>
              </div>
            </section>

            <section className="description">
              <div className="description-img-container">
                <img className="what-we-do-img"/>
              </div>
              <div className="about">
                <h2>Get Involved</h2>
                <p>
                  The elderly population is the worst affected by COVID-19 and are
                  most at risk of contracting the virus. Help them come through
                  this pandemic by signing up to be a volunteer! Select and
                  complete the requests made by their requestors and get in touch
                  with them directly to help them out. Reimbursement for your
                  services will be provided.
              </p>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default Home;