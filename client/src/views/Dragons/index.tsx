import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader'
import { useHistory } from 'react-router';
import classnames from 'classnames/bind'
import format from 'date-fns/format'
import { Interfaces } from '../../services'
import { useDragon } from '../../hooks'
import { ViewBox, Input, Select, Button, Text, SVG, Modal } from '../../components'
import { routes } from '../../routes'
import s from './styles.module.scss'

const sortOptions = [
  { label: 'Nome A-Z', value: 'ASC' },
  { label: 'Nome Z-A', value: 'DESC' },
]

const cn = classnames.bind(s)

const Dragons: React.FC = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = React.useState(false)
  const [dragonToDelete, setDragonToDelete] = React.useState<Interfaces.IDragon>()
  const { dragons, deleteDragon, sortDirection, handleSort, getAllDragons, queryLoading } = useDragon()

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Interfaces.IDragon[]>([]);

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    // Search by name or by type
    const term = searchTerm?.toLocaleLowerCase();
    const results = dragons.filter(dragon =>
    (dragon.name?.toLowerCase().includes(term)
      || dragon.type?.toLowerCase().includes(term))
    );
    setSearchResults(results);
  }, [searchTerm, dragons, sortDirection]);

  React.useEffect(() => {
    getAllDragons()
  }, [])

  return (
    <ViewBox fullMobile>
      <Modal open={modalVisible} onClose={() => setModalVisible(false)}>
        <Text centered>Tem certeza que quer deletar o dragão {dragonToDelete?.name}?</Text>
        <div className={s.modalButtons}>
          <Button
            size="small"
            onClick={() => {
              deleteDragon(dragonToDelete?.id!)
              setModalVisible(false);
            }}
          >
            Deletar
          </Button>
          <Button
            theme="outlined"
            size="small"
            onClick={() => {
              setModalVisible(false)
              setDragonToDelete(undefined)
            }}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
      <div className={s.actions}>
        <Input
          IconLeft={<SVG.MagnifyingGlass />}
          placeholder="Pesquisar Dragão"
          value={searchTerm}
          onChange={handleChange}
        />
        <Select
          IconLeft={<SVG.Filter />}
          placeholder="Ordenar"
          options={sortOptions}
          onChange={({ value }) => handleSort(value)}
        />
        <Button
          size="small"
          onClick={() => history.push(routes.createDragon)}
        >
          Cadastrar Dragão
        </Button>
      </div>
      <div className={s.listContainer}>
        {queryLoading ? (
          <div className={s.loadingWrapper}>
            <PuffLoader color="#a40606" size={100} />
          </div>
        ) : (
          <div className={s.dragonsList}>
            {searchResults.map((dragon) => (
              <div key={`dragons-${dragon.id}`} className={s.dragonItem}>
                {dragon.avatar ?
                  <img src={dragon.avatar} alt={dragon.name} className={cn('dragonItem--avatar')} />
                  : <SVG.Logo className={cn('dragonItem--avatar')} />}
                <div className={cn('dragonItem--description')}>
                  <Text
                    className={cn('dragonItem--description--name')}
                    theme="primary"
                    weight="bold"
                  >
                    {dragon.name}
                  </Text>
                  <Text
                    className={cn('dragonItem--description--type')}
                    weight="bold"
                  >
                    {dragon.type}
                  </Text>
                </div>
                <div className={cn('dragonItem--right')}>
                  <div className={cn('dragonItem--actions')}>
                    <SVG.Pencil
                      onClick={() => history.push(routes.updateDragon.replace(':id', dragon.id!))}
                    />
                    <SVG.Trash
                      onClick={() => {
                        setDragonToDelete(dragon)
                        setModalVisible(true)
                      }}
                    />
                  </div>
                  {!!dragon.createdAt && (
                    <Text
                      className={cn('dragonItem--description--createdAt')}
                    >
                      Criado em: <b>{format(new Date(dragon.createdAt), 'MM/dd/yyyy')}</b>
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ViewBox>
  );
}

export default Dragons;