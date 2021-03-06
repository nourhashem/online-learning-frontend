import { ThemeProvider } from '@mui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store';
import { saveState } from 'store/utils';
import debounce from 'debounce';
import theme from 'styles/theme';
import App from './app';
import './index.scss';

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 1000)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
