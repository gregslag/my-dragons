import React from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider, DragonProvider } from './context'
import { Header } from './components'
import Routes from './routes'

function App() {
  const history = useHistory()

  return (
    <AuthProvider history={history}>
      <DragonProvider history={history}>
        <ToastContainer autoClose={3000} />
        <Header />
        <Routes />
      </DragonProvider>
    </AuthProvider>
  );
}

export default withRouter(App);
