import React, { useState } from "react";
import { Link } from "react-router-dom";

//import Button from '../../components/Button'

import "./index.scss";

import headerImage from "../../assets/images/8432.png";

import createPageImage from "../../assets/images/hiw1.svg"
import shareLinkImage from "../../assets/images/hiw2.svg"
import ConnectAllImage from "../../assets/images/hiw3.svg"



import { Button } from "react-bootstrap";

const LandingPage = ({ handleAvailabilty, FetchHandleAvailabilty }) => {
 


  return (
    <div className="Landing-Page">
      {/* navbar */}
      <nav className="navbar">
        <ul className="nav" role="navigation">
          <li className="logo">
            <a href="#about">
              <img className="logo" src={'https://i.ibb.co/r5YwMmr/logo-Imgur.png'} alt=" logo"></img>
            </a>
          </li>
          <li className="logo-title">BIZFIZ</li>
        
          <li className="nav-button action">
            <Link to="/all-report">
            Bank Admin <i className="fa fa-long-arrow-right"></i>
            </Link>
          </li>
        </ul>
      </nav>

      {/* header */}

      <section className="header">
        <div className="header-container">
          <div className="left-section">
            <h1>New Age Lending System</h1>

            <div className="sub-title">
              <h2>Backed By Intelligent Algorithm 🧠  </h2>
              <div className="inner">
                <span>
                Checking Competition
                  <br />
                  Checking Feasibility
                  <br />
                  Checking Location
                  
                </span>
              </div>
            </div>

            <p>
             Bank Admins click on TOP RIGHT 👆".<br/>
             To apply for Loan "SEE BELOW 👇"
            </p>

            <div className="search">
             

        
              <Button className="searchButton" onClick={()=>{  window.open("http://localhost:5000/");}}>
               <a target="_blank" href={"http://localhost:5000/"}>Open Lending Form -></a>  
              </Button>
            </div>
          </div>
          <div className="right-section">
            <img
              src={headerImage}
              alt=""
            />
          </div>
        </div>
 
      </section>


    
      <div className="do-new" id="how-it-works" style={{ overflowX: 'hidden' }}>
        <div className="title">
          <h2>HOW IT WORKS</h2>

        </div>
        <h4 style={{paddingLeft:'90px'}}>⚡For Lenders</h4> <br/>
        <div className="about-container" style={{ overflowX: 'hidden' }}>
         
          <div className="row">
            <div className="col">

              <div className="card" data-aos="flip-left" data-aos-duration="6000">
                <p className="step-indicator">Step 1</p>
                <div className="face face1">
                  <div className="content">
                    <img 
                    src={createPageImage} alt=""></img>
                    <h3>Apply</h3>
                  </div>
                </div>
                <div className="face face2">
                  <div className="content-text">
                    <p>.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="col">
              <div className="card" data-aos="flip-up">
                <p className="step-indicator">Step 2</p>
                <div className="face face1">
                  <div className="content">
                    <h3>Wait For Approval </h3>
                    <img src={shareLinkImage} alt=" link with others"/>

                  </div>
                </div>
                <div className="face face2">
                  <div className="content-text">
                    <p>.</p>
                  </div>
                </div>
              </div>

            </div>


            

          </div>
        </div>
        <br/>
        <h4 style={{paddingLeft:'90px'}}> ⚡For Bank Admin</h4> <br/>
        <div className="about-container" style={{ overflowX: 'hidden' }}>
          <div className="row">
            <div className="col">

              <div className="card" data-aos="flip-left" data-aos-duration="6000">
                <p className="step-indicator">Step 1</p>
                <div className="face face1">
                  <div className="content">
                    <img 
                    src={shareLinkImage} alt="page"></img>
                    <h3>Check Requests</h3>
                  </div>
                </div>
                <div className="face face2">
                  <div className="content-text">
                    <p>.</p>
                  </div>
                </div>
              </div>

            </div>

            <div className="col">
              <div className="card" data-aos="flip-up">
                <p className="step-indicator">Step 2</p>
                <div className="face face1">
                  <div className="content">
                    <h3>Evalute</h3>
                    <img src={createPageImage} alt="ink with others"/>

                  </div>
                </div>
                <div className="face face2">
                  <div className="content-text">
                    <p></p>
                  </div>
                </div>
              </div>

            </div>


            <div className="col" data-aos="flip-right">
              <div className="card">
                <p className="step-indicator">Step 3</p>
                <div className="face face1">
                  <div className="content">
                    <img 
                    src={ConnectAllImage} alt="Share link and connect with all"></img>
                    <h3>Accept/Reject</h3>
                  </div>
                </div>
                <div className="face face2">
                  <div className="content-text">
                    <p></p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

   

      <footer>
    <div className="container" id="contact">
      <div className="row justify-content-center">

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
          <div className="footer-logo">
            <img src={'https://i.ibb.co/r5YwMmr/logo-Imgur.png'} alt="logo"></img>
            <h1 className="logo-title">BIZFIZ</h1>
            <p>Making Lending Easy</p>
            <br/>
            <p>MADE WITH ❤️ @ Fintech Open Month Hackathon</p>
            <br/>
            <p>BY SUPERDUPER</p>

          </div>

        </div>
        
     
      </div>



    </div>
  </footer>



    </div>
  );
};

export default LandingPage;
