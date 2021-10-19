import React from 'react'
import ReactSelect, { StylesConfig } from 'react-select';
import classnames from 'classnames/bind'
import { UseFormRegister, FieldError, RegisterOptions } from "react-hook-form";
import s from './styles.module.scss'

interface SelectProps {
  label?: string
  placeholder?: string
  error?: FieldError
  register?: UseFormRegister<any>;
  required?: boolean;
  validation?: RegisterOptions
  options: any[];
  name?: string;
  onChange: (_: any) => void;
}

const cn = classnames.bind(s)

export const Select: React.FC<SelectProps> = ({
  label,
  register,
  required,
  name,
  error,
  validation,
  options,
  onChange,
  ...props
}) => {
  return (
    <div className={s.container}>
      {!!label && <label className={s.label}>{label}</label>}
      <ReactSelect
        options={options}
        onChange={onChange}
        className={cn('select', {
          'select--error': !!error?.type
        })}
        {...props}
        {...(register && { ...register(name!, { required, ...validation }) })}
      />
      {(error?.type === 'required') && <span className={s.error}>Campo obrigatório</span>}
      {(error?.type === 'minLength') && <span className={s.error}>Este campo deve possuir no mínimo {validation?.minLength} caracteres</span>}
    </div>
  )
}
