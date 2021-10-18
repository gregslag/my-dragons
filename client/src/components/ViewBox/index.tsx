import React from 'react';
import s from './styles.module.scss'

export const ViewBox: React.FC = ({ children }) => {
  return (
    <div className={s.container}>
      <div className={s.box}>
        {children}
      </div>
    </div>
  );
}
