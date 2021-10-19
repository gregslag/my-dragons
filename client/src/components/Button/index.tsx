import React, { ButtonHTMLAttributes } from 'react'
import classnames from 'classnames/bind'
import PuffLoader from 'react-spinners/PuffLoader'
import s from './styles.module.scss'

const cn = classnames.bind(s)

type ButtonTheme = 'primary' | 'secondary' | 'link' | 'outlined'
type ButtonSize = 'normal' | 'small'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme
  size?: ButtonSize
  loading?: boolean
}


export const Button: React.FC<ButtonProps> = ({
  children,
  theme = 'primary',
  className,
  type = 'button',
  size = 'normal',
  loading,
  ...props
}) => {
  const rootClassName = cn('button', `button--${theme}`, `button--${size}`, className)

  return (
    <button className={rootClassName} type={type} {...props}>
      {loading ? (
        <PuffLoader color={theme === 'outlined' ? "#a40606" : "#FFF"} size={30} />
      ) : children}
    </button>
  )
}
