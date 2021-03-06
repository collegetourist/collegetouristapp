import PropTypes from 'prop-types'
import Signin from '../signin'
import React from 'react'
import _ from 'lodash'
import Setup from '../setup'

class Presence extends React.Component {

  static childContextTypes = {
    presence: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object,
    tracker: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    status: PropTypes.string,
    token: PropTypes.string,
    tourist_id: PropTypes.string,
    user: PropTypes.object,
    onLoadSession: PropTypes.func,
    onLoadTourist: PropTypes.func,
    onLoadToken: PropTypes.func,
    onRemoveTourist: PropTypes.func,
    onRemoveToken: PropTypes.func,
    onSaveToken: PropTypes.func,
    onSetToken: PropTypes.func,
    onSetTourist: PropTypes.func,
    onSignout: PropTypes.func
  }

  static defaultProps = {}

  _handleReload = this._handleReload.bind(this)
  _handleSignin = this._handleSignin.bind(this)
  _handleSignout = this._handleSignout.bind(this)

  render() {
    const { status, token, tourist_id, user } = this.props
    if(status === 'loaded' && token === null) return <Signin tourist_id={ tourist_id } />
    if(status !== 'saved') return null
    if(!user.agreed_to_terms) return <Setup />
    return this.props.children
  }

  componentDidMount() {
    const query = this._getQuery()
    this._handleTourist(query.invitation)
    this._handleToken(query.token)
  }

  componentDidUpdate(prevProps) {
    const { status, token, user, onLoadSession, onRemoveTourist, onRemoveToken, onSaveToken } = this.props
    if(!_.isEqual(token, prevProps.token)) {
      if(token === null) {
        onRemoveToken()
      } else if(prevProps.token === null) {
        onLoadSession(token)
      } else if(token !== prevProps.token) {
        onSaveToken(token)
      }
    }
    if(!_.isEqual(user, prevProps.user)) {
      if(user) this._handleSignin()
    }
    if(status !== prevProps.status) {
      if(status === 'saved') {
        onRemoveTourist()
      }
    }
  }

  getChildContext() {
    const { token, user } = this.props
    return {
      presence: {
        token,
        user,
        reload: this._handleReload,
        signout: this._handleSignout
      }
    }
  }

  _getQuery() {
    const search = this.context.router.history.location.search.substr(1)
    return search.split('&').reduce((query, arg) => ({
      ...query,
      [arg.split('=')[0]]: arg.split('=')[1]
    }), {})
  }

  _handleReload() {
    const { user, onLoadSession } = this.props
    onLoadSession(user.token)
  }

  _handleSignin() {
    const { user } = this.props
    this.context.tracker.identify(user)
  }

  _handleSignout() {
    this.context.tracker.identify(null)
    this.props.onSignout()
  }

  _handleToken(token) {
    if(token) return this.props.onSetToken(token)
    this.props.onLoadToken()
  }

  _handleTourist(invitation) {
    if(invitation) return this.props.onSetTourist(invitation)
    this.props.onLoadTourist()
  }

}

export default Presence
