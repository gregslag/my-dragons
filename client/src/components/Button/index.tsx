import React, { ButtonHTMLAttributes } from 'react'
import classnames from 'classnames/bind'
import BeatLoader from 'react-spinners/BeatLoader'
import s from './styles.module.scss'

const cn = classnames.bind(s)

type ButtonTheme = 'primary' | 'secondary' | 'link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme
  loading?: boolean
}


export const Button: React.FC<ButtonProps> = ({
  children,
  theme = 'primary',
  className,
  type = 'button',
  loading,
  ...props
}) => {
  const rootClassName = cn('button', `button--${theme}`, className)

  return (
    <button className={rootClassName} type={type} {...props}>
      {loading ? (
        <BeatLoader color="#FFF" size={12} />
      ) : children}
    </button>
  )
}
