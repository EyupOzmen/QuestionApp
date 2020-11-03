import {createStore,applyMiddleware,compose} from 'redux';
import reducer from '../reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState ={
    answers:[],
    disableRequired:false,
    isQRequired:false
};

export const store = createStore(reducer,initialState,composeEnhancers(applyMiddleware()));