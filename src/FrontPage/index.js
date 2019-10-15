import React from 'react'

function FrontPage() {
    return (
      <div className="frontPage">
          <img className="logo" src="images/largeLogo.png" alt="Eat-In"/>
        <br/>
        <span className="frontPageButtons">
          <a href="/login"><button className="button1">Log-In</button></a><br/>  
          <a href="/register"><button className="button2">Get-In</button></a>
        </span>
      </div>
    );
  }

export default FrontPage;