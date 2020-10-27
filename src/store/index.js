import {createStore} from 'redux';
import reducer from '../reducers';

const initialState =[];

export const store = createStore(reducer,initialState);