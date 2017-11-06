import {combineReducers} from 'redux';
import { CHART_DATA,PUB_DATA, BID_DATA } from '../actions';

function chartData(state = [], action){
    switch(action.type){
        case CHART_DATA:
            return action.data;
        default:
            return state;
    }
}

function publisherData(state = [], action){
    switch(action.type){
        case PUB_DATA:
            return action.data;
        default:
            return state;
    }
}

function bidderData(state = [], action){
    switch(action.type){
        case BID_DATA:
            return action.data;
        default:
            return state;
    }
}

const rootReducer = combineReducers({chartData,publisherData,bidderData});

export default rootReducer;
