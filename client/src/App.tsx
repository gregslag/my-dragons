import React from 'react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context'
import Routes from './routes'

function App() {
  return (
    <AuthProvider>
      <ToastContainer autoClose={3000} />
      <Routes />
    </AuthProvider>
  );
}

export default App;
