import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiFillCaretLeft } from 'react-icons/ai'
import * as yup from 'yup'
import { LoadingIcon } from '../../components/atoms/LoadingIcon'
import { PrimaryButton } from '../../components/atoms/PrimaryButton'
import { TextInput } from '../../components/atoms/TextInput'
import { ResultPopup } from '../../components/molecules/ResultPopup'
import { Header } from '../../components/organisms/Header'
import { api } from '../../config/api'
import { AuthContext } from '../../contexts/Auth'

interface ChangePasswordProps {
  token: string
}

interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
}

const validationSchema = yup.object({
  currentPassword: yup.string().required('Preencha a senha'),
  newPassword: yup
    .string()
    .required('Preencha a nova senha')
    .notOneOf(
      [yup.ref('currentPassword'), null],
      'As senhas devem ser diferentes'
    )
})

export default function ChangePassword ({
  token
}: ChangePasswordProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordFormData>({
    resolver: yupResolver(validationSchema)
  })
  const router = useRouter()
  const { setToken, setUser } = useContext(AuthContext)

  const [
    submitChangePasswordSuccessfully,
    setSubmitChangePasswordSuccessfully
  ] = useState(false)
  const [submitChangePasswordError, setSubmitChangePasswordError] =
    useState(false)
  const [submitChangePasswordLoading, setSubmitChangePasswordLoading] =
    useState(false)

  const onSubmit = async ({
    currentPassword,
    newPassword
  }: ChangePasswordFormData): Promise<void> => {
    try {
      setSubmitChangePasswordLoading(true)

      await api.put('/password', {
        password: currentPassword,
        newPassword
      })

      nookies.destroy(null, 'oversell.token')
      nookies.destroy(null, 'oversell.username')

      setToken('')
      setUser({
        id: '',
        email: '',
        username: ''
      })

      setSubmitChangePasswordSuccessfully(true)
    } catch (error) {
      setSubmitChangePasswordError(true)
    } finally {
      setSubmitChangePasswordLoading(false)
    }
  }

  const onCloseSuccessfullyPopup = async (): Promise<void> => {
    await router.push('/entrar')
  }

  return (
    <div className="dark:bg-zinc-900 h-full md:h-screen w-full">
      <Head>
        <title>Perfil</title>
      </Head>

      <Header token={token} />

      {submitChangePasswordSuccessfully && (
        <ResultPopup
          title="Senha alterada com sucesso"
          message="Agora é só reentrar na sua conta com a nova senha."
          type="success"
          setResult={setSubmitChangePasswordSuccessfully}
          onClose={onCloseSuccessfullyPopup}
        />
      )}

      {submitChangePasswordError && (
        <ResultPopup
          type="error"
          title="Falha ao alterar a senha"
          message="Tente alterar novamente."
          setResult={setSubmitChangePasswordError}
        />
      )}

      <div className="h-full pt-16 px-8 md:px-page-margin space-y-8">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-primary-dark-text text-lg md:text-xl font-bold">
            Alterar senha
          </h1>

          <PrimaryButton className="w-32 md:w-48" onClick={() => router.back()}>
            <AiFillCaretLeft className="w-5 h-5" />
            <p>Voltar</p>
          </PrimaryButton>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="md:max-w-md space-y-4">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => {
              return (
                <TextInput
                  type="password"
                  name={field.name}
                  label="Senha atual"
                  onChange={field.onChange}
                  value={field.value}
                  error={errors[field.name]}
                />
              )
            }}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => {
              return (
                <TextInput
                  type="password"
                  name={field.name}
                  label="Nova senha"
                  onChange={field.onChange}
                  value={field.value}
                  error={errors[field.name]}
                />
              )
            }}
          />

          {submitChangePasswordLoading
            ? (
            <PrimaryButton type="button">
              <LoadingIcon size={16} />
              <p>Alterando...</p>
            </PrimaryButton>
              )
            : (
            <PrimaryButton type="submit">Alterar</PrimaryButton>
              )}
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'oversell.token': token } = nookies.get(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/entrar',
        permanent: false
      }
    }
  }

  return {
    props: {
      token
    }
  }
}
