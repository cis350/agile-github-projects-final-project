import React from "react";
import "./App.css";

export const App = () => {
  return (
    <div className="log-in">
      <div className="frame">
        <div className="text-wrapper">Log In</div>
        <div className="div-wrapper">
          <div className="div">---------</div>
        </div>
        <div className="frame-2">
          <div className="div">---------</div>
          <img className="iconoir-eye" alt="Iconoir eye" src="iconoir-eye.svg" />
        </div>
        <div className="frame-3">
          <div className="frame-4">
            <div className="text-wrapper-2">G</div>
          </div>
          <div className="frame-4">
            <div className="overlap-group">
              <div className="text-wrapper-3">apple</div>
              <div className="text-wrapper-3">apple</div>
            </div>
          </div>
          <div className="frame-4">
            <div className="text-wrapper-4">fb</div>
          </div>
        </div>
        <div className="text-wrapper-5">or continue with</div>
        <div className="text-wrapper-6">Password</div>
        <div className="text-wrapper-7">Email</div>
        <div className="text-wrapper-8">Forgot password?</div>
        <p className="don-t-have-an">
          <span className="span">Don’t have an account? </span>
          <span className="text-wrapper-9">Register</span>
        </p>
        <img className="line" alt="Line" src="line-1.svg" />
        <img className="img" alt="Line" src="line-1.svg" />
      </div>
      <div className="frame-5">
        <div className="text-wrapper-10">Footer Info</div>
        <div className="text-wrapper-11">copyright 2024</div>
      </div>
      <img className="header" alt="Header" src="header.svg" />
    </div>
  );
};

export default App;