import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from "redux";
import {Provider} from "react-redux";


const initialState = {
  counter: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC_CUSTOM': return {...state, counter: ((state.counter = 1) * action.payload)}; // ?? what the cb style is?
    case 'INC': return {...state, counter: (state.counter + 1)}; // ?? what the cb style is?
    case 'DEC': return {...state, counter: state.counter - 1};
    case 'RESET': return {...state, counter: 0};
    default:
      console.log(`action ${action.type} doesn't exist`);
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
