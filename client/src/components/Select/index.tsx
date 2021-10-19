import React from 'react'
import ReactSelect, { components, ControlProps, StylesConfig } from 'react-select';
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
  IconLeft?: React.ReactNode
  onChange: (_: any) => void;
}

const cn = classnames.bind(s)

const Control: React.FC<any> = ({ children, ...props }) => {
  const { IconLeft } = props.selectProps;
  return (
    <components.Control {...props}>
      {!!IconLeft && (
        <div className={s.iconLeft}>
          {IconLeft}
        </div>
      )}
      {children}
    </components.Control>
  );
};

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    height: 40,
    border: state.isFocused ? '1px solid #d98324' : '1px solid #E9E4DA',
    boxShadow: 0,
    '&:hover': {
       border: '1px solid #d98324'
    }
  }),
}

export const Select: React.FC<SelectProps> = ({
  label,
  register,
  required,
  name,
  error,
  validation,
  options,
  IconLeft,
  onChange,
  ...props
}) => {
  return (
    <div className={s.container}>
      {!!label && <label className={s.label}>{label}</label>}
      <ReactSelect
        // @ts-ignore
        IconLeft={IconLeft}
        styles={customStyles}
        components={{ Control }}
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
