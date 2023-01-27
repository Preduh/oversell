import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Header } from '../components/organisms/Header'
import nookies from 'nookies'

interface PerfilProps {
  token: string
}

export default function Perfil ({ token }: PerfilProps): JSX.Element {
  return (
    <div className="bg-zinc-900 h-screen w-full">
      <Head>
        <title>Perfil</title>
      </Head>
      <Header token={token} />
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
