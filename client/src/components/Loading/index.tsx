import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader'
import s from './styles.module.scss'

export const Loading: React.FC = () => {
  return (
    <div className={s.loadingWrapper}>
      <PuffLoader color="#a40606" size={100} />
    </div>
  );
}
