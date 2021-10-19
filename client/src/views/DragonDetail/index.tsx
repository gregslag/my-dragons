import React from 'react';
import cn from 'classnames'
import { useParams, useHistory } from 'react-router';
import format from 'date-fns/format'
import { Button, Text, ViewBox, SVG, Loading } from '../../components'
import { routes } from '../../routes';
import { useDragon } from '../../hooks'
import s from './styles.module.scss'
import shared from '../../styles/shared.module.scss'

const DragonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { getDragonDetails, dragonDetails: dragon, queryLoading } = useDragon();

  React.useEffect(() => {
    getDragonDetails(id)
  }, [id])

  return (
    <ViewBox fullMobile>
      {queryLoading ? (
        <Loading />
      ) : (
        <div className={cn(shared.container, s.container)}>
          {!!dragon?.avatar ? (
            <img src={dragon.avatar} alt="Avatar do dragão (url)" className={shared.avatar} />
          ) : (
            <SVG.Logo className={shared.avatar} />
          )}
          <div className={shared.form}>
            <Text className={shared.mbMedium} tag="h2" theme="primary">
              {dragon?.name}
            </Text>

            <div className={shared.inputWrapper}>
              <div className={s.fieldGroup}>
                <Text>Tipo:</Text>
                <Text weight="bold">{dragon?.type}</Text>
              </div>
              {dragon?.createdAt && (
                <div className={s.fieldGroup}>
                  <Text>Criado em:</Text>
                  <Text weight="bold">{format(new Date(dragon.createdAt), 'MM/dd/yyyy')}</Text>
                </div>
              )}
            </div>
            <Button
              onClick={() => history.push(routes.dragons)}
              className={shared.mbMedium}
            >
              Voltar
            </Button>
          </div>
        </div>
      )}
    </ViewBox>
  );
}

export default DragonDetail;