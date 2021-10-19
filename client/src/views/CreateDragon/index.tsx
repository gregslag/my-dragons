import React from 'react';
import { DragonForm, DragonFormPayload } from '../../components'
import { useDragon } from '../../hooks'

const formType = 'CREATE'

const CreateDragon: React.FC = () => {
  const { mutationLoading, mutateDragon } = useDragon();

  const handleSubmit = (dragon: DragonFormPayload) => {
    mutateDragon(dragon, formType)
  };

  return (
    <DragonForm loading={mutationLoading} type={formType} onSubmit={handleSubmit} />
  );
}

export default CreateDragon;