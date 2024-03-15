import { ReactElement, ReactNode, useEffect, useState } from 'react';

// global styles
import '../styles/globals.css';
import '../scss/style.scss';

// next
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

// third-party
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// project-import
import Loader from 'ui-component/Loader';
import Locales from 'ui-component/Locales';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';
import { getMenu } from 'store/slices/menu';
import { persister, store, dispatch } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';
import NavigationScroll from 'layout/NavigationScroll';

import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';

// types
type LayoutProps = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface Props {
  Component: LayoutProps;
}

function MyApp({ Component, pageProps }: AppProps & Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getMenu()).then(() => {
      setLoading(true);
    });
  }, []);

  if (!loading) return <Loader />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <NavigationScroll>
                  <AuthProvider>
                    <>
                      <Notistack>
                        {getLayout(<Component {...pageProps} />)}
                        <Snackbar />
                      </Notistack>
                    </>
                  </AuthProvider>
                </NavigationScroll>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
