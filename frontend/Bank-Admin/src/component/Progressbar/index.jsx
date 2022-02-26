import React from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import './index.css'

const Progressbar = ({percentage}) => {
    return (
        <>
           <ProgressBar percent={percentage}  filledBackground={percentage < 50  ? "linear-gradient(to right, #fefb72, #f0bb31)" : "linear-gradient(315deg, #00b712 0%, #5aff15 74%)"}  >
               
  <Step>
    {({ accomplished, index }) => (
      <div
        className={`indexedStep ${accomplished ? "accomplished" : null}`}
      >
        ⚪
      </div>
    )}
  </Step>
  <Step>
    {({ accomplished, index }) => (
      <div
        className={`indexedStep ${accomplished ? "accomplished" : null}`}
      >
        🕯️
      </div>
    )}
  </Step>
  <Step>
    {({ accomplished, index }) => (
      <div
        className={`indexedStep ${accomplished ? "accomplished" : null}`}
      >
        ⚪
      </div>
    )}
  </Step>
</ProgressBar> 
        </>
    )
}

export default Progressbar
