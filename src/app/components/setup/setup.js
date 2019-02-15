import PropTypes from 'prop-types'
import React from 'react'

class Setup extends React.Component {

  static contextTypes = {
    presence: PropTypes.object
  }

  static propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    onFetch: PropTypes.func,
    onSave: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
  }

  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return (
      <div className="setup">
        <div className="setup-header">
          <h1><i className="fa fa-university" /></h1>
          <h3>Welcome to College Tourist!</h3>
          <p>Thanks for trying out our app! We&apos;re looking forward to helping you
            get the most out of your upcoming college tour! Before you get
            started, please verify your account information.</p>
        </div>
        <div className="setup-body">
          <div className="ui form">
            <div className="field">
              <label>First Name</label>
              <input type="text" { ...this._getFirstName() } />
            </div>
            <div className="field">
              <label>Last Name</label>
              <input type="text" { ...this._getLastName() } />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="text" { ...this._getEmail() }  />
            </div>
            <div className="field">
              <label>Photo</label>
              <div className="photo">
                <img src="/images/greg.jpg" />
              </div>
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" className="hidden" />
                <label>I agree to the <a href="">Terms and Conditions</a></label>
              </div>
            </div>
            <button className="ui fluid red button" type="submit" onClick={ this._handleSubmit }>Get Started!</button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status && status === 'saved') {
      this.context.presence.reload()
    }

  }

  _getFirstName() {
    const { first_name } = this.props
    return {
      placeholder: 'First Name',
      value: first_name,
      onChange: this._handleType.bind(this, 'first_name')
    }
  }

  _getLastName() {
    const { last_name } = this.props
    return {
      placeholder: 'Last Name',
      value: last_name,
      onChange: this._handleType.bind(this, 'last_name')
    }
  }

  _getEmail() {
    const { email } = this.props
    return {
      placeholder: 'Email',
      value: email,
      onChange: this._handleType.bind(this, 'email')
    }
  }

  _handleSubmit() {
    const { email, first_name, last_name } = this.props
    const photo_id = 1
    const agreed_to_terms = true
    this.props.onSave(first_name, last_name, email, photo_id, agreed_to_terms)
  }

  _handleType(key, e) {
    this.props.onType(key, e.target.value)
  }

}

export default Setup