import React from 'react';
import { AuthForm, AuthFormPayload } from '../../components'
import { useAuth } from '../../hooks'

const SignUp: React.FC = () => {
  const { signUp, loading } = useAuth();

  const handleSubmit = ({ name, email, password }: AuthFormPayload) => {
    signUp({ name: name!, email, password })
  };

  return (
    <AuthForm loading={loading} type="REGISTER" onSubmit={handleSubmit} />
  );
}

export default SignUp;