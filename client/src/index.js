import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

const Wrapper = () =>
<Provider store={store}>
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
</Provider>

ReactDOM.render(<Wrapper />, document.getElementById('root'));
registerServiceWorker();
