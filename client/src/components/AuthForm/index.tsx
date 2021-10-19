import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { routes } from '../../routes'
import shared from '../../styles/shared.module.scss'
import { ViewBox, Text, Input, Button, SVG } from '../'

type InputsProps = {
  name?: string;
  email: string;
  password: string;
}

export type AuthFormPayload = InputsProps

interface AuthFormProps {
  loading?: boolean;
  type: 'LOGIN' | 'REGISTER'
  onSubmit: (_: InputsProps) => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ loading, type, onSubmit: onSubmitCB }) => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm<InputsProps>();

  const onSubmit: SubmitHandler<InputsProps> = (data) => {
    onSubmitCB(data)
  };

  return (
    <ViewBox>
      <div className={shared.container}>
        <SVG.Logo />
        <form onSubmit={handleSubmit(onSubmit)} className={shared.form}>
          <Text className={shared.mbMedium} tag="h2" theme="primary">
            {type === 'LOGIN' ? 'Entrar' : 'Cadastrar'}
          </Text>

          <div className={shared.inputWrapper}>
            {type === 'REGISTER' && (
              <Input
                label="Nome"
                name="name"
                type="text"
                register={register}
                validation={{ minLength: 3 }}
                required
                error={errors.name}
              />
            )}
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              required
              error={errors.email}
            />
            <Input
              label="Senha"
              name="password"
              type="password"
              register={register}
              required
              error={errors.password}
            />
          </div>
          <Button loading={loading} type="submit" className={shared.mbMedium}>
            {type === 'LOGIN' ? 'Entrar' : 'Cadastrar'}
          </Button>
          <Button
            theme="link"
            onClick={() => history.push(type === 'LOGIN' ? routes.signUp : routes.signIn)}
          >
            {type === 'LOGIN' ? 'Ainda não tem conta? Crie uma por aqui' : 'Já tem conta? Acesse por aqui'}
          </Button>
        </form>
      </div>
    </ViewBox>
  );
}
