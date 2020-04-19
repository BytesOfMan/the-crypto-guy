import React, { Component, Fragment } from 'react'
import { X } from 'react-feather'

import './PopupMailchimp.css'

class PopupMailchimp extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: false }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    return (
      <Fragment>
        <div>
          <div class="Button" onClick={this.togglePopup.bind(this)}>
            Subscribe
          </div>
        </div>

        {this.state.showPopup ? (
          <div className="Popup-Overlay">
            <div
              className="Popup-Background"
              onClick={this.togglePopup.bind(this)}
            ></div>
            <div className="Popup-Inner-MailChimp">
              <X class="Popup-Close" onClick={this.togglePopup.bind(this)} />
              <div id="mc_embed_signup">
                <h3 className="MailChimp-Title">Weekly crypto updates</h3>
                <form
                  action="https://bytesofman.us8.list-manage.com/subscribe/post?u=e76b410ea972ff2809a8a8d6a&amp;id=903ddd3222"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="Form"
                  target="_blank"
                  novalidate
                >
                  <div id="mc_embed_signup_scroll">
                    <label className="Form--Label">
                      <input
                        className="Form--Input Form--InputText"
                        type="email"
                        placeholder="Email"
                        name="EMAIL"
                        id="mce-EMAIL"
                        required
                      />
                      <span>Email address</span>
                    </label>

                    <div
                      style={{ position: 'absolute', left: '-5000px' }}
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_e76b410ea972ff2809a8a8d6a_903ddd3222"
                        tabindex="-1"
                        value=""
                      />
                    </div>
                    <div class="clear">
                      <input
                        type="submit"
                        style={{ margin: '2em auto', width: '100%' }}
                        value="Subscribe"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="Button Form--SubmitButton"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default PopupMailchimp
