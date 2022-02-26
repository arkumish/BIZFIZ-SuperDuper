import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import axios from 'axios';

class ConfirmationScreen extends Component {

  state = {
    btnText: "Confirm"
  }

  handleClick = async () => {
    this.setState({
      btnText: "Submitting"
    })
   
    axios.get(`https://bizfizbe.herokuapp.com/getdatasession?userid=${this.props.userId}`, {headers: {
        Accept: 'application/json'
      }
    }).then((res)=>{
      window.location = "/"
      this.setState({
        btnText: "Done"
      })
    }).catch((res)=>{
      window.location = "/"
      this.setState({
        btnText: "Done"
      })
    });
   
    
  }

  render() {
    return (
      <div style={{minHeight:'400px'}}>
        <h2>Your consent have been submitted successfully.</h2>
        <p>Click confirm to submit the loan application.</p>
        <strong>Thank You!!!</strong>
        <br/>
        <br/>
        <RaisedButton label={this.state.btnText} onClick={this.handleClick} primary />
        <p>After Submitting. Please Wait for a bit. This step may take some time.</p>
      </div>
    );
  }
}

export default ConfirmationScreen;
