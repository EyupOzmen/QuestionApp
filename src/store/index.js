import {createStore} from 'redux';
import reducer from '../reducers';

const initialState ={
    answers:[],
    disableRequired:false
};

export const store = createStore(reducer,initialState);