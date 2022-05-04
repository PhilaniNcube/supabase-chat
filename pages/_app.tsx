import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Auth } from '@supabase/ui';
import supabase from '../utils/supabase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  
        <Component {...pageProps} />

  );
}

export default MyApp
