import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

interface AppState {
  donate: number;
  message: string;
}

type Action =
  | { type: 'UPDATE_TOTAL_DONATE'; amount: number }
  | { type: 'UPDATE_MESSAGE'; message: string };

const reducer = (state: AppState | undefined, action: Action): AppState => {
  const _state: AppState = state ?? {
    donate: 0,
    message: '',
  };

  switch (action.type) {
    case 'UPDATE_TOTAL_DONATE':
      return {
        ..._state,
        donate: _state.donate + action.amount,
      };
    case 'UPDATE_MESSAGE':
      return {
        ..._state,
        message: action.message,
      };
    default:
      return _state;
  }
};

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
