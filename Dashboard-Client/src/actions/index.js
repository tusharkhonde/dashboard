export const CHART_DATA = 'CHART_DATA';
export const PUB_DATA = 'PUB_DATA';
export const BID_DATA = 'BID_DATA';

function fetchData(data){
    return{
        type:CHART_DATA,
        data
    }
}

function fetchChartData(){
    return fetch('http://localhost:4000/getInitialData')
            .then(response => response.json());
}

export function fetchChart(){
    return (dispatch) => {
        return fetchChartData().then(json => dispatch(fetchData(json)));
    }
}


export function fetchPublisher(data){
    return{
        type:PUB_DATA,
        data
    }
}

function fetchPublisherChartData(publisher){
    return fetch(`http://localhost:4000/groupByPublisher/${publisher}`)
            .then(response => response.json());
}

export function fetchPublisherChart(publisher){
    return (dispatch) => {
        return fetchPublisherChartData(publisher).then(json => dispatch(fetchPublisher(json)));
    }
}


export function fetchBidder(data){
    return{
        type:BID_DATA,
        data
    }
}

function fetchBidderChartData(bidder){
    return fetch(`http://localhost:4000/groupByBidder/${bidder}`)
            .then(response => response.json());
}

export function fetchBidderChart(bidder){
    return (dispatch) => {
        return fetchBidderChartData(bidder).then(json => dispatch(fetchBidder(json)));
    }
}
