import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Header } from '../components/organisms/Header'
import nookies from 'nookies'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from '../components/atoms/TextInput'

interface PerfilProps {
  token: string
  username: string
}

export default function Perfil ({ token, username }: PerfilProps): JSX.Element {
  const { control } = useForm()

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

          <div className="space-y-4">
            <h2 className="text-primary-dark-text text-xl font-medium">
              Informações gerais
            </h2>

            <form>
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
