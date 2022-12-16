import Head from 'next/head'
import { SignIn } from '../components/templates/SignIn'

const Entrar = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Oversell - Entrar</title>
      </Head>

      <SignIn />
    </div>
  )
}

export default Entrar
