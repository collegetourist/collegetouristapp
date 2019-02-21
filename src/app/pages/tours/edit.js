import Form from '../../components/form'
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
    return <Form { ...this._getForm() } />
  }

  _getForm() {
    const { id } = this.props
    return {
      title: 'Edit Tour',
      method: 'PATCH',
      endpoint: `${process.env.API_HOST}/api/tours/${id}`,
      action: `${process.env.API_HOST}/api/tours/${id}`,
      submitText: 'Save',
      fields: [
        { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Name to uniquely identify this tour' },
        { label: 'Origin', name: 'origin', type: 'addressfield', required: true, placeholder: 'Street address you will leave from' },
        { label: 'Destination', name: 'destination', type: 'addressfield', required: true, placeholder: 'Street address you will return to' },
        { label: 'Start Date', name: 'start_date', type: 'datefield', required: true, placeholder: 'First day of your tour' },
        { label: 'End Date', name: 'end_date', type: 'datefield', required: true, placeholder: 'Last day of your tour' }
      ],
      onCancel: this._handleCancel,
      onSuccess: this._handleSuccess
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
