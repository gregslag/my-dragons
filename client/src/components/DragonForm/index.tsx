import React from 'react';
import { useHistory } from 'react-router';
import cn from 'classnames'
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import s from './styles.module.scss'
import shared from '../../styles/shared.module.scss'
import { routes } from '../../routes'
import { Interfaces } from '../../services';
import { FormType } from '../../context'
import { ViewBox, Text, Input, Button, SVG } from '../'

type InputsProps = {
  id?: string;
  avatar: string;
  name: string;
  type: string;
}

export type DragonFormPayload = InputsProps

interface DragonFormProps {
  loading?: boolean;
  type: FormType
  dragon?: Interfaces.IDragon
  onSubmit: (_: InputsProps) => void
}

export const DragonForm: React.FC<DragonFormProps> = ({ loading, type, dragon, onSubmit: onSubmitCB }) => {
  const [isValidAvatar, setIsValidAvatar] = React.useState(false);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<InputsProps>();
  const history = useHistory()

  const onSubmit: SubmitHandler<InputsProps> = (data) => {
    onSubmitCB(data)
  };

  const checkUrl = async (url: string) => {
    try {
      const { status } = await axios.get(url);
      const isValid = status === 200
      setIsValidAvatar(isValid)
      return isValid
    } catch (error) {
      setIsValidAvatar(false)
      return false
    }
  }

  const avatar = watch('avatar')

  React.useEffect(() => {
    checkUrl(avatar)
  }, [avatar]);

  React.useEffect(() => {
    if (dragon) {
      setValue('id', dragon.id);
      setValue('avatar', dragon.avatar);
      setValue('name', dragon.name);
      setValue('type', dragon.type);
    }
  }, [dragon]);

  return (
    <ViewBox fullMobile>
      <div className={cn(shared.container, s.container)}>
        <Text
          className={s.back}
          theme="primary"
          weight="bold"
          onClick={() => history.push(routes.dragons)}
        >
          Voltar
        </Text>
        {!!avatar && isValidAvatar ? (
          <img src={avatar} alt="Avatar do dragão (url)" className={shared.avatar} />
        ) : (
          <SVG.Logo className={shared.avatar} />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={shared.form}>
          <Text className={cn(shared.mbMedium, s.title)} tag="h2" theme="primary">
            {type === 'CREATE' ? 'Cadastrar um dragão' : `Editar ${dragon?.name}`}
          </Text>

          <div className={shared.inputWrapper}>
            <Input
              label="Avatar do dragão (url)"
              name="avatar"
              type="text"
              register={register}
              validation={{
                validate: async (v) => await checkUrl(v)
              }}
              required
              error={errors.avatar}
            />
            <Input
              label="Nome"
              name="name"
              type="text"
              register={register}
              validation={{ minLength: 3 }}
              required
              error={errors.name}
            />
            <Input
              label="Tipo"
              name="type"
              type="text"
              register={register}
              validation={{ minLength: 3 }}
              required
              error={errors.type}
            />
          </div>
          <Button loading={loading} type="submit" className={shared.mbMedium}>
            {type === 'CREATE' ? 'Cadastrar' : 'Editar'}
          </Button>
        </form>
      </div>
    </ViewBox>
  );
}
