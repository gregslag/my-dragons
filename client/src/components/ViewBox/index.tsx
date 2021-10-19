import React from 'react';
import classnames from 'classnames/bind';
import s from './styles.module.scss'

interface ViewBoxProps {
  fullMobile?: boolean;
}

const cn = classnames.bind(s)

export const ViewBox: React.FC<ViewBoxProps> = ({ fullMobile, children }) => {
  return (
    <div
      className={cn('container', {
        'container--fullMobile': fullMobile
      })}
    >
      <div
        className={cn('box', {
          'box--fullMobile': fullMobile
        })}
      >
        {children}
      </div>
    </div>
  );
}
