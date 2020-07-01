import React from "react";
import Navbar from "../Navigation/Navbar";
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
              Providing an easy and convenient way to meet the needs
              of the elderly population and those affected by COVID-19
            </p>
          </section>

          <section className="counter">
            <div>
              <h3>Volunteers</h3>
              <p>30</p>
            </div>

            <div>
              <h3>People Helped</h3>
              <p>55</p>
            </div>
          </section>

          <section className="description">
            <div className="about">
              <h2>What We Do?</h2>
              <p>
                The Good Neighbour project is a community-based organization that 
                aims at providing to the needs of the elderly population and 
                those affected by COVID-19. Simply Sign-up to make requests 
                for services such as buying groceries or food items and one of 
                our community volunteers will be at your service. Want to give
                back to the community?
              </p>
            </div>
            <div className="who-we-are-img"></div>
          </section>

          <section className="description">
            <div className="what-we-do-img"></div>
            <div className="about">
              <h2>Get Involved</h2>
              <p>
                The elderly population is the worst affected by COVID-19
                and are most at risk of contracting the virus. Help them 
                come through this pandemic by signing up to be a volunteer!
                Select and complete the requests made by their requestors
                and get in touch with them directly to help them out.
                Reimbursement for your services will be provided.
              </p>
            </div>
          </section>

          <section className="contact">
            <h2>Contact us</h2>
            <p>If you have any questions or concerns, feel free to contact us directly at:</p>
            <p>
              Email: good.neighbour@gmail.com<br></br>
              Phone: 999-999-9999
            </p>
          </section>
        </div>
      </div>
    );

}
}

export default Home;
