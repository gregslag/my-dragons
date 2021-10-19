import React from 'react';
import classnames from 'classnames/bind';
import { useAuth } from '../../hooks'
import s from './styles.module.scss'

interface ViewBoxProps {
  fullMobile?: boolean;
  fullHeight?: boolean;
}

const cn = classnames.bind(s)

export const ViewBox: React.FC<ViewBoxProps> = ({ fullMobile, fullHeight, children }) => {
  const { signed } = useAuth()
  return (
    <div
      className={cn('container', {
        'container--fullMobile': fullMobile,
        'container--logged': signed
      })}
    >
      <div
        className={cn('box', {
          'box--fullMobile': fullMobile,
          'box--fullHeight': fullHeight
        })}
      >
        {children}
      </div>
    </div>
  );
}
