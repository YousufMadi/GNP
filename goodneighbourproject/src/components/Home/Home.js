import React from "react";
import Navbar from "../Navbar";
import "../../stylesheets/home.css";

class Home extends React.Component {

  render(){
    return (
      <div>
        <Navbar currentUser={this.props.currentUser}/>
        <div>
          <section className="hero"></section>
          <section className="mission">
            <h3>Our Mission</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section className="counter">
            <div>
              <h3>Volunteers</h3>
              <p>100</p>
            </div>

            <div>
              <h3>People Helped</h3>
              <p>70</p>
            </div>
          </section>

          <section className="description">
            <div className="about">
              <h2>Who we are</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
            <div className="who-we-are-img"></div>
          </section>

          <section className="description">
            <div className="what-we-do-img"></div>
            <div className="about">
              <h2>What we do</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </div>
          </section>

          <section className="contact">
            <h2>Contact us</h2>
            <p>If you have any questions, feel free to contact us directly at:</p>
            <p>
              Email: sample@email.com<br></br>
              Phone: 999-999-9999
            </p>
          </section>
        </div>
      </div>
    );

}
}

export default Home;
