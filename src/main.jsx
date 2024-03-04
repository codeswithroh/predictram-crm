import { Suspense } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ConfirmProvider } from 'material-ui-confirm';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';
import { store } from './redux/store';
import { checkUserAuth } from './redux/reducer/user.reducer';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

store.dispatch(checkUserAuth());

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ConfirmProvider>
        <Toaster />
        <HelmetProvider>
          <BrowserRouter>
            <Suspense>
              <App />
            </Suspense>
          </BrowserRouter>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfirmProvider>
    </QueryClientProvider>
  </Provider>
);
