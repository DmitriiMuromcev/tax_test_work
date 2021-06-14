import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import Routes from './routes';
import configureAppStore from './redux/store';

const store = configureAppStore();

let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div className="app">
            <header className="header">
                header
            </header>

            <Routes />
            
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
