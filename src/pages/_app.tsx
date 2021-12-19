import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import store from '../reudx/store';
import 'react-calendar/dist/Calendar.css';
import 'rc-time-picker/assets/index.css';
// import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
