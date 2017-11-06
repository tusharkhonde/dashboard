import React, { Component } from 'react';
import ChartPublisher from './ChartPublisher';
import ChartBidder from './ChartBidder';
import {connect} from 'react-redux';
import {fetchChart} from '../actions';

class App extends Component{
    render(){
         return(
            <div>
            {
                this.props.chartData.bidders ? 
                    <div>
                        <ChartPublisher bidders={this.props.chartData.bidders}/>
                        <ChartBidder publishers={this.props.chartData.publishers}/>
                    </div>
                    :
                    <div>
                    </div>
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps,null)(App);


