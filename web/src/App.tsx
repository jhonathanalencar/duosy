import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './redux/store';

import { Router } from './Router';
import { extendedApiSlice } from './redux/features/games/gamesSlice';

store.dispatch(extendedApiSlice.endpoints.getGames.initiate());

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />

      </BrowserRouter>
      <ToastContainer />
    </Provider>
  )
}

