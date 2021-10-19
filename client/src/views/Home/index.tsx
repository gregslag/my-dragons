import React from 'react';
import cn from 'classnames'
import { useHistory } from "react-router-dom";
import { ViewBox, Text, Button, SVG } from '../../components'
import { routes } from '../../routes'
import s from './styles.module.scss'
import shared from '../../styles/shared.module.scss'

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <ViewBox fullMobile>
      <div className={cn(shared.container, s.container)}>
        <SVG.Logo />
        <Text tag="h2" theme="primary">MY DRAGONS</Text>
        <Text className={s.description} centered>
          <strong>Game of Thrones? Yu-gi-oh? Como treinar seu dragão?</strong>
          {' Não esqueça mais os seus dragões favoritos. Gerencie seus dragões no '}
          <strong className={s.hint}>MY DRAGONS</strong>
          {', o maior gerenciador de dragões do Brasil.'}
        </Text>
        <Text weight="semibold" theme="secondary">Cuidado para não se queimar!</Text>
        <Button onClick={() => history.push(routes.dragons)}>Vamos lá!</Button>
      </div>
    </ViewBox>
  );
}

export default Home;