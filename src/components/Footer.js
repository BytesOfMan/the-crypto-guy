import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Follow me{' '}
      <a target="_blank" rel="nofollow" href="https://twitter.com/bytesofman/">
        @BytesOfMan
      </a>
    </h2>
    <footer className="footer">
      <div className="container taCenter">
        <span>© {new Date().getFullYear()} The Crypto Guy</span>
      </div>
    </footer>
  </div>
)
