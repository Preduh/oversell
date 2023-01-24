import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Header } from '../components/organisms/Header'
import nookies from 'nookies'

export default function Dashboard (): JSX.Element {
  return (
    <div className="bg-zinc-900 h-screen w-full">
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
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
    props: {}
  }
}
