import React from 'react';
import { useParams } from 'react-router';
import { DragonForm, DragonFormPayload } from '../../components'
import { useDragon } from '../../hooks'

const formType = 'UPDATE'



const UpdateDragon: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { getDragonDetails, dragonDetails, mutationLoading, mutateDragon } = useDragon();

  const handleSubmit = (dragon: DragonFormPayload) => {
    mutateDragon(dragon, formType)
  };

  React.useEffect(() => {
    getDragonDetails(id)
  }, [id])

  return (
    <DragonForm
      loading={mutationLoading}
      type={formType}
      dragon={dragonDetails}
      onSubmit={handleSubmit}
    />
  );
}

export default UpdateDragon;