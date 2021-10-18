import React from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context'
import Routes from './routes'

function App() {
  const history = useHistory() 

  return (
    <AuthProvider history={history}>
      <ToastContainer autoClose={3000} />
      <Routes />
    </AuthProvider>
  );
}

export default withRouter(App);
