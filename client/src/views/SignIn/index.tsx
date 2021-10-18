import React from 'react';
import { AuthForm, AuthFormPayload } from '../../components'
import { useAuth } from '../../hooks'

const SignIn: React.FC = () => {
  const { signIn, loading } = useAuth();

  const handleSubmit = (data: AuthFormPayload) => {
    signIn(data)
  };

  return (
    <AuthForm loading={loading} type="LOGIN" onSubmit={handleSubmit} />
  );
}

export default SignIn;