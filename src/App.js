import { AppRouter } from "./router/AppRouter"
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react';
import { Helmet } from "react-helmet"


function App() {


  return (

    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>

        <Helmet>
          {/* Helmet ile Head içerisine Google Tag Manager scripti ekleniyor */}
          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K8W3H9P5');`}
          </script>
        </Helmet>

        <AppRouter />
        <ToastContainer />

        {/* Body içerisine noscript tagı ekleniyor */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K8W3H9P5"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

      </PersistGate>

    </Provider>



  )
}

export default App
