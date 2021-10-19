import React from 'react'
import classnames from 'classnames/bind'
import s from './styles.module.scss'

const cn = classnames.bind(s)

type TextTheme = 'primary' | 'secondary'

export type TextProps = {
  tag?: keyof JSX.IntrinsicElements
  className?: string
  theme?: TextTheme
  weight?: 'bold' | 'semibold'
  centered?: boolean
}

export const Text: React.FC<TextProps> = ({
  children,
  tag,
  className,
  theme,
  weight,
  centered,
  ...props
}) => {
  const Tag = tag || 'p'
  const rootClassName = cn('text', `text--${theme}`, `text--${weight}`, {
    'text--h2': tag === 'h2',
    'text--centered': centered
  }, className)

  return (
    <Tag
      className={rootClassName}
      {...props}
    >
      {children}
    </Tag>
  )
}