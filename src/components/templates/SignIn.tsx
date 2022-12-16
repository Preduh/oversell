import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/Auth'
import { LoadingIcon } from '../atoms/LoadingIcon'
import { api } from '../config/api'

interface FormData {
  email: string
  password: string
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
      setLoading(true)

      const { data } = await api.post<SignInResponse>('/login', {
        email,
        password
      })

      setUser(data.user)
      setToken(data.token)

      await router.push('/')
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sm:grid grid-cols-8 h-screen">
      <section className="hidden col-start-1 col-end-6 bg-purple-blue sm:flex items-center justify-center">
        <div className="w-4/6 h-4/6 relative">
          <Image fill src="/visual-data-bro.svg" alt="Visual data bro" />
        </div>
      </section>

      <section className="h-screen col-start-6 col-end-9 px-12 sm:px-16 flex items-center flex-col justify-center space-y-8">
        <div className="space-y-4 flex flex-col items-center text-center">
          <h1 className="text-2xl font-medium text-zinc-800">
            Bem-vindo(a) à Oversell
          </h1>
          <div className="flex items-center space-x-2">
            <hr className="w-12 border-zinc-400" />
            <h2 className="text-zinc-700 whitespace-nowrap">
              Entre em sua conta
            </h2>
            <hr className="w-12 border-zinc-400" />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>

            <input
              {...register('email')}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="nome@mail.com"
            />

            <p className="text-sm text-red-500 ml-1 mt-1">
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Senha
            </label>

            <input
              {...register('password')}
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      </section>
    </div>
  )
}
