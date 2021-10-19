import React from 'react';
import { SVG, Button } from '../'
import { useAuth } from '../../hooks'
import s from './styles.module.scss'

export const Header: React.FC = () => {
  const { signed, signOut } = useAuth()

  if (!signed) {
    return null
  }

  return (
    <div className={s.header}>
      <div className={s.logo}>
        <SVG.Logo />
      </div>
      <Button
        size="small"
        theme="outlined"
        onClick={signOut}
      >
        Sair
      </Button>
    </div>
  );
}
