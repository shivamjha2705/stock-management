import MainLayout from '@/components/layout/main-layout';
import Providers from '@/components/layout/providers';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      
      <MainLayout meta={{ title: 'Admin' }}>
        <Component {...pageProps} />
      </MainLayout>
    </Providers>
  );
}

export default MyApp;
