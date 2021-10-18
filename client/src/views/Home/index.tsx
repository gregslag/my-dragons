import React from 'react';
import { useHistory } from "react-router-dom";
import { ViewBox, Text, Button, SVG } from '../../components'
import { routes } from '../../routes'
import shared from '../../styles/shared.module.scss'

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <ViewBox>
      <div className={shared.container}>
        <SVG.Logo />
        <Text tag="h2" theme="primary">MY DRAGONS</Text>
        <Text>Gerencie seus dragões</Text>
        <Text weight="semibold" theme="secondary">Cuidado para não se queimar!</Text>
        <Button onClick={() => history.push(routes.dragons)}>Vamos lá!</Button>
      </div>
    </ViewBox>
  );
}

export default Home;