import React from 'react' // eslint-disable-line no-unused-vars
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'
import './Add.css'
import {injectIntl} from 'react-intl'

const style = {
  margin: 12
}

const Add = () => (
  <div className='addForm'>
    <h3>{this.props.intl.formatMessage({id: 'adding_cases'})}</h3>
    <RaisedButton label={this.props.intl.formatMessage({id: 'new_case'})}
      style={style} primary
      containerElement={<Link to='/en-US/add/case' />} />
    <RaisedButton label={this.props.intl.formatMessage({id: 'new_method'})} style={style} primary />
    <RaisedButton label={this.props.intl.formatMessage({id: 'new_organization'})} style={style} primary />
  </div>
)

export default injectIntl(Add)
