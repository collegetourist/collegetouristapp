import React from 'react'
import PropTypes from 'prop-types'
import Image from '../image'

class Avatar extends React.Component {

  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { user } = this.props
    return (
      <div className="avatar">
        { user.photo && <Image src={ user.photo } alt={ user.full_name } title={ user.full_name } />}
        { !user.photo &&
          <div className="avatar-initials">
            { user.initials }
          </div>
        }
      </div>
    )
  }

}

export default Avatar
