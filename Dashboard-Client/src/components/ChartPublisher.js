import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {fetchBidderChart} from '../actions';
import {connect} from 'react-redux';

const options = (bidder) => {
  return {
    "title":`Publisher Performance for ${bidder}`,
    "vAxis":{"title":`Amount earned from ${bidder} in Dollars`},
    "hAxis":{"title":"Date"},
    "seriesType":"bars",
    "series":{"5":{"type":"line"}}
  }
} 

class ChartPublisher extends React.Component {
  constructor(){
    super();
    this.state={
      bidder:''
    }

    this.handleClick = this.handleClick.bind(this);
    
  }
  handleClick(bidder){
      this.setState({bidder})
      this.props.dispatch(fetchBidderChart(bidder));
  }

  render() {
    return (
      <div>
        <h4>Publishers Performance per Bidder </h4>
        <DropdownButton title='Select Bidder' id='select-dropdown'>
        {
            this.props.bidders.map( (item,key) => {
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
          options= { options(this.state.bidder) }
        />
      </div>
    );
  }
}



export default connect(state => ({
  data: state.bidderData
}))(ChartPublisher);