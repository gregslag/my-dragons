import React, { InputHTMLAttributes } from 'react'
import classnames from 'classnames/bind'
import { UseFormRegister, FieldError, RegisterOptions } from "react-hook-form";
import s from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: FieldError
  register?: UseFormRegister<any>;
  required?: boolean;
  validation?: RegisterOptions
}

const cn = classnames.bind(s)

export const Input: React.FC<InputProps> = ({
  label,
  register,
  required,
  name,
  error,
  type,
  validation: v = {},
  ...props
}) => {
  const customValidations = {
    ...(type === 'email' && { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }),
    ...(type === 'password' && { minLength: 7 }),
  }

  const validation = {
    ...v,
    ...customValidations
  }

  return (
    <div className={s.container}>
      <label className={s.label}>{label}</label>
      <input
        className={cn('input', {
          'input--error': !!error?.type
        })}
        type={type}
        {...props}
        {...(register && { ...register(name!, { required, ...validation }) })}
      />
      {(error?.type === 'required') && <span className={s.error}>Campo obrigatório</span>}
      {(error?.type === 'minLength') && <span className={s.error}>Este campo deve possuir no mínimo {validation?.minLength} caracteres</span>}
      {(type === 'email' && error?.type === 'pattern') && <span className={s.error}>Email inválido</span>}
    </div>
  )
}
