import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './Redux/Store';
// import {store,persistor } from './Redux/store/store';
// import { PersistGate } from 'redux-persist/integration/react';



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     {/* <PersistGate loading={null} persistor={persistor}> */}
    <App />
    {/* </PersistGate> */}
  </Provider>,
)
