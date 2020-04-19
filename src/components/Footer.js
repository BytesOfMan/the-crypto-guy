import React from 'react'
import './Footer.css'
import { TwitterFollowButton } from 'react-twitter-embed'

export default () => (
  <div>
    <center>
      <TwitterFollowButton
        screenName="BytesOfMan"
        options={{ size: 'large' }}
      />
    </center>
    <footer className="footer">
      <div className="container taCenter">
        <span>© {new Date().getFullYear()} The Crypto Guy</span>
      </div>
    </footer>
  </div>
)
