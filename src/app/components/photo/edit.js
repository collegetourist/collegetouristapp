import ModalPanel from '../modal_panel'
import PropTypes from 'prop-types'
import React from 'react'

class Edit extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getModalPanel() }>
        <div className="note-form">
          image
        </div>
      </ModalPanel>
    )
  }

  _getModalPanel() {
    return {
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Post', handler: this._handleSave }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleSave() {
    this.context.modal.close()
  }

}

export default Edit