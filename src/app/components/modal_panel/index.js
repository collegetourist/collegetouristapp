import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ModalPanel extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    color: PropTypes.string,
    leftEnabled: PropTypes.bool,
    leftItems: PropTypes.array,
    rightEnabled: PropTypes.bool,
    rightItems: PropTypes.array,
    position: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    position: 'top'
  }

  render() {
    const { leftItems, position, rightItems, title } = this.props
    return (
      <div className={ this._getClass() }>
        { position === 'top' &&
          <div className="modal-panel-header">
            { leftItems &&
              <div className="modal-panel-header-navigation">
                { leftItems.map((item,index) => (
                  <div key={`left_${index}`} className="modal-panel-header-navigation-item" onClick={ item.handler }>
                    { this._getElement(item) }
                  </div>
                )) }
              </div>
            }
            <div className="modal-panel-header-title">
              { title }
            </div>
            { rightItems &&
              <div className="modal-panel-header-navigation">
                { rightItems.map((item,index) => (
                  <div key={`right_${index}`} className="modal-panel-header-navigation-item" onClick={ item.handler }>
                    { this._getElement(item) }
                  </div>
                )) }
              </div>
            }
          </div>
        }
        <div className="modal-panel-body">
          { this.props.children }
        </div>
        { position === 'bottom' &&
          <div className="modal-panel-footer">
            { leftItems &&
              <div className="modal-panel-footer-navigation">
                { leftItems.map((item,index) => (
                  <div key={`left_${index}`} className="ui button" onClick={ item.handler }>
                    { this._getElement(item) }
                  </div>
                )) }
              </div>
            }
            { rightItems &&
              <div className="modal-panel-footer-navigation">
                { rightItems.map((item,index) => (
                  <div key={`right_${index}`} className="ui red button" onClick={ item.handler }>
                    { this._getElement(item) }
                  </div>
                )) }
              </div>
            }
          </div>
        }
      </div>
    )
  }

  _getClass() {
    const { className, color } = this.props
    const classes = ['modal-panel']
    if(className) classes.push(className)
    if(color) classes.push(color)
    return classes.join(' ')
  }

  _getElement(item) {
    if(item.component) return _.isFunction(item.component) ? React.createElement(item.component) : item.component
    if(item.icon) return <div className="modal-panel-header-navigation-button"><i className={ `fa fa-fw fa-${item.icon}` } /></div>
    if(item.label) return <div className="modal-panel-header-navigation-button"><span>{ item.label }</span></div>
  }

  _getLeftClass() {
    const { leftEnabled } = this.props
    const classes = ['modal-panel-header-navigation']
    if(!leftEnabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getRightClass() {
    const { rightEnabled } = this.props
    const classes = ['modal-panel-header-navigation']
    if(!rightEnabled) classes.push('disabled')
    return classes.join(' ')
  }

}

export default ModalPanel
