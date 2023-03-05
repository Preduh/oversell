import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Header } from '../../components/organisms/Header'
import nookies from 'nookies'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from '../../components/atoms/TextInput'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/Auth'

interface PerfilProps {
  token: string
  username: string
}

interface UserFormData {
  firstName: string
  lastName: string
  email: string
  enterprise: string
  role: string
}

export default function Perfil ({ token, username }: PerfilProps): JSX.Element {
  const { control, setValue } = useForm<UserFormData>()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user.id) {
      setValue('firstName', user.username.split(' ')[0])
      setValue('lastName', user.username.split(' ')[1])
      setValue('email', user.email)
    }
  }, [user])

  return (
    <div className="dark:bg-zinc-900 h-screen w-full">
      <Head>
        <title>Perfil</title>
      </Head>

      <Header token={token} />

      <div className="h-full pt-16 px-page-margin">
        <h1 className="text-primary-dark-text text-xl font-bold mt-4">
          Perfil
        </h1>

        <div className="flex mt-12 space-x-4">
          <div className="space-y-4 pl-8 w-96">
            <Image
              className="rounded-lg ring-2 ring-offset-2 ring-purple-blue ring-offset-zinc-800"
              src="https://avatars.githubusercontent.com/preduh"
              alt="Foto de perfil"
              width={100}
              height={100}
            />

            <div className="flex flex-col">
              <h2 className="text-primary-dark-text text-xl capitalize font-medium">
                {username}
              </h2>

              <h3 className="text-secondary-dark-text">Cozinheiro</h3>
            </div>
          </div>

          <div>
            <form className="space-y-4">
              <div className="space-y-4">
                <h2 className="text-primary-dark-text text-xl font-medium">
                  Informações gerais
                </h2>

                <div className="flex space-x-4">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextInput
                          name={field.name}
                          label="Primeiro nome"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )
                    }}
                  />

                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextInput
                          name={field.name}
                          label="Último nome"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )
                    }}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextInput
                          name={field.name}
                          type="email"
                          label="Email"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )
                    }}
                  />
                </div>
              </div>

              <hr className="border-t border-zinc-500 w-full" />

              <div className="space-y-4">
                <h2 className="text-primary-dark-text text-xl font-medium">
                  Informações da empresa
                </h2>

                <div className="flex space-x-4">
                  <Controller
                    name="enterprise"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextInput
                          name={field.name}
                          label="Empresa"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )
                    }}
                  />

                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextInput
                          name={field.name}
                          label="Função"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )
                    }}
                  />
                </div>
              </div>

              <Link className="text-purple-blue hover:underline" href="/perfil/change-password">
                Alterar senha
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'oversell.token': token, 'oversell.username': username } =
    nookies.get(ctx)

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
      token,
      username
    }
  }
}
