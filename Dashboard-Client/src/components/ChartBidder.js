import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {connect} from 'react-redux';
import {fetchPublisherChart} from '../actions';

const options = (publisher) => {
  return {
    "title":`Bidder Performance for ${publisher}`,
    "vAxis":{"title":`Advertising Hit Ratio for ${publisher} in %`},
    "hAxis":{"title":"Date"},
    "seriesType":"bars",
    "series":{"3":{"type":"line"}}
  }
}

class ChartBidder extends React.Component {
   
  constructor(){
    super();
    this.state={
      publisher:''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(publisher){
      this.setState({publisher})
      this.props.dispatch(fetchPublisherChart(publisher));
  }
 
  render() {
    return (
      <div>
       <h4>Bidders Performance per Publisher </h4>
        <DropdownButton title='Select Publisher' id='select-dropdown'>
          {
            this.props.publishers.map( (item,key) => {
                return(
                  <div key={key}>
                    <MenuItem eventKey={key} onClick={()=>this.handleClick(item)}>{item}</MenuItem>
                    <MenuItem divider />
                  </div>
                )
            })
          }
        </DropdownButton>
          <Chart
            chartType="ComboChart"
            data={this.props.data}
            width="100%"
            height="400px"
            options={options(this.state.publisher)}
          />
      </div>
    );
  }
}

export default connect(state => ({
  data: state.publisherData
}))(ChartBidder);
