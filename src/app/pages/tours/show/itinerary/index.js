import Message from '../../../../components/message'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Itinerary extends React.Component {

  static propTypes = {
    itinerary: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { itinerary } = this.props
    if(!itinerary) return <Message { ...this._getEmpty() } />

    return (
      <div className="itinerary">
        { Object.keys(itinerary).map((date, index) => (
          <div className="itinerary-day" key={`day_${index}`}>
            <div className="itinerary-day-date">
              { moment(date).format('dddd, MMMM DD, YYYY') }
            </div>
            <div className="itinerary-day-details">
              { itinerary[date].map((item, index2) => (
                <div className={ this._getClass(date) } key={`day_item_${index2}`}>
                  <div className="itinerary-day-item-icon">
                    { item.type === 'drive' ?
                      <i className="fa fa-fw fa-car" /> :
                      <i className="fa fa-fw fa-clock-o" />
                    }
                  </div>
                  <div className="itinerary-day-item-details">
                    { item.text }
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getClass(date) {
    const classes = ['itinerary-day-item']
    if(moment().diff(moment(date)) > 0) classes.push('past')
    return classes.join(' ')
  }

  _getEmpty() {
    return {
      icon: 'map',
      title: 'Plan Your Tour',
      text: 'Go ahead and add some college visits to your tour',
      component: <button className="ui basic fluid red button" onClick={ this._handlePlan }>Plan Tour</button>
    }
  }

}

export default Itinerary
