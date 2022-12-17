import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/Auth'
import { LoadingIcon } from '../atoms/LoadingIcon'
import { LogoIcon } from '../atoms/LogoIcon'
import { api } from '../config/api'
import { ToggleThemeButton } from '../molecules/ToggleThemeButton'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface FormData {
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

interface SignInResponse {
  user: {
    id: string
    email: string
    username: string
  }
  token: string
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Precisamos do seu email'),
  password: yup.string().required('Precisamos da sua senha')
})

export const SignIn = (): JSX.Element => {
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState({
    isThereAnyError: false,
    errorMessage: ''
  })
  const { setUser, setToken } = useContext(AuthContext)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async ({ email, password }: FormData): Promise<void> => {
    try {
      setSubmitError({
        isThereAnyError: false,
        errorMessage: ''
      })

      setLoading(true)

      const { data } = await api.post<SignInResponse>('/login', {
        email,
        password
      })

      setUser(data.user)
      setToken(data.token)

      await router.push('/')
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
      <section className="hidden py-8 h-full min-h-screen col-end-5 col-start-1 lg:col-end-6 bg-purple-blue dark:bg-zinc-900 sm:flex items-center justify-center">
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

      <section className="dark:bg-zinc-800 h-screen col-start-5 col-end-9 lg:col-start-6 px-12 sm:px-16 flex items-center flex-col justify-center space-y-8">
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
              Entre em sua conta
            </h2>
            <hr className="w-12 border-zinc-400" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          {submitError.isThereAnyError && (
            <div className="flex space-x-2 mb-6 mt-2 text-red-600 dark:text-yellow-200">
              <ExclamationTriangleIcon className='w-5 h-5' />
              <p>{submitError.errorMessage}</p>
            </div>
          )}

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
              <p>Entrando...</p>
            </button>
              )
            : (
            <button
              type="submit"
              className="bg-purple-blue w-full transition-colors flex items-center justify-center hover:bg-dark-purple-blue h-10 rounded-md text-white font-medium"
            >
              Entrar
            </button>
              )}
        </form>

        <div className="w-full text-zinc-800 dark:text-gray-100">
          <p className="">
            Não tem conta?{' '}
            <Link
              className="text-purple-blue font-bold hover:text-dark-purple-blue hover:underline"
              href="/cadastrar"
            >
              Registre-se aqui
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
