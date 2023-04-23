import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './components/app/app';
import { store } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';


store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <HistoryRouter history={browserHistory}>
      <ScrollToTop/>
      <ToastContainer />
      <App/>
    </HistoryRouter>
  </Provider>,
);
