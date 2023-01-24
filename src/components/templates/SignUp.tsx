import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/Auth'
import { LoadingIcon } from '../atoms/LoadingIcon'
import { LogoIcon } from '../atoms/LogoIcon'
import { api } from '../config/api'
import { ToggleThemeButton } from '../molecules/ToggleThemeButton'
import * as yup from 'yup'
import nookies from 'nookies'

interface FormData {
  username: string
  email: string
  password: string
}

interface HttpError {
  response: {
    data: {
      error: string
    }
  }
}

interface SignUpResponse {
  user: {
    id: string
    email: string
    username: string
  }
  token: string
}

const validationSchema = yup.object({
  username: yup.string().required('Precisamos de um nome de usuário'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Precisamos do seu email'),
  password: yup.string().required('Precisamos da sua senha')
})

export const SignUp = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState({
    isThereAnyError: false,
    errorMessage: ''
  })
  const { setToken, setUser } = useContext(AuthContext)
  const router = useRouter()

  const onSubmit = async ({
    username,
    email,
    password
  }: FormData): Promise<void> => {
    try {
      setSubmitError({
        isThereAnyError: false,
        errorMessage: ''
      })

      setLoading(true)

      const { data } = await api.post<SignUpResponse>('/signup', {
        username,
        email,
        password
      })

      setUser(data.user)
      setToken(data.token)

      nookies.set(null, 'oversell.token', data.token, {
        maxAge: 24 * 60 * 60
      })

      nookies.set(null, 'oversell.username', data.user.username, {
        maxAge: 24 * 60 * 60
      })

      await router.push('/dashboard')
    } catch (error) {
      const httpError = error as HttpError

      if (httpError.response.data.error) {
        setSubmitError({
          isThereAnyError: true,
          errorMessage: httpError.response.data.error
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sm:grid grid-cols-8 h-full min-h-screen">
      <section className="dark:bg-zinc-800 py-8 h-full min-h-screen col-start-1 col-end-5 relative lg:col-end-4 px-12 sm:px-16 flex items-center flex-col justify-center space-y-8">
        <div className="absolute top-8 right-8">
          <ToggleThemeButton />
        </div>

        <div className="space-y-4 flex flex-col items-center text-center">
        <LogoIcon className="h-12 w-12 md:h-16 md:w-16" />

          <h1 className="text-xl md:text-2xl font-medium text-zinc-800 dark:text-gray-100">
            Bem-vindo(a) à Oversell
          </h1>
          <div className="flex items-center space-x-2">
            <hr className="w-12 border-zinc-400" />
            <h2 className="text-zinc-700 dark:text-gray-300 whitespace-nowrap">
              Crie sua conta
            </h2>
            <hr className="w-12 border-zinc-400" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {submitError.isThereAnyError && (
            <div className="flex space-x-2 mb-6 mt-2 text-red-600 dark:text-yellow-200">
              <ExclamationTriangleIcon className="w-5 h-5" />
              <p>{submitError.errorMessage}</p>
            </div>
          )}

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Nome de usuário
            </label>

            <input
              {...register('username')}
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:outline-0 dark:focus:border-purple-blue"
              placeholder="Ex: Marcos..."
            />

            <p className="text-sm text-red-500 ml-1 mt-1">
              {errors.username?.message}
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Email
            </label>

            <input
              {...register('email')}
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:outline-0 dark:focus:border-purple-blue"
              placeholder="nome@mail.com"
            />

            <p className="text-sm text-red-500 ml-1 mt-1">
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              Senha
            </label>

            <input
              {...register('password')}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-zinc-500 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none dark:focus:border-purple-blue"
            />

            <p className="text-sm text-red-500 ml-1 mt-1">
              {errors.password?.message}
            </p>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Lembre-se de mim
            </label>
          </div>
          {loading
            ? (
            <button
              type="button"
              className="bg-purple-blue w-full transition-colors flex items-center justify-center space-x-2 hover:bg-dark-purple-blue h-10 rounded-md text-white font-medium"
            >
              <LoadingIcon size={20} />
              <p>Criando conta...</p>
            </button>
              )
            : (
            <button
              type="submit"
              className="bg-purple-blue w-full transition-colors flex items-center justify-center hover:bg-dark-purple-blue h-10 rounded-md text-white font-medium"
            >
              Criar conta
            </button>
              )}
        </form>

        <div className="w-full text-zinc-800 dark:text-gray-100">
          <p className="">
            Já tem uma conta?{' '}
            <Link
              className="text-purple-blue font-bold hover:text-dark-purple-blue hover:underline"
              href="/entrar"
            >
              Entre aqui
            </Link>
          </p>
        </div>
      </section>

      <section className="hidden col-end-9 col-start-5 lg:col-start-4 bg-purple-blue dark:bg-zinc-900 sm:flex items-center justify-center">
        <div className="w-4/6 h-4/6 relative">
          <Image
            priority
            sizes="100"
            fill
            src="/visual-data-bro.svg"
            alt="Visual data bro"
          />
        </div>
      </section>
    </div>
  )
}
