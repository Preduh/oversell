import Head from 'next/head'
import { SignUp } from '../components/templates/SignUp'

const Cadastrar = (): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Oversell - Entrar</title>
      </Head>

      <SignUp />
    </div>
  )
}

export default Cadastrar
