import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowRightCircleIcon,
  HomeIcon,
  Squares2X2Icon,
  UserIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { Fragment, useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { AuthContext } from '../../contexts/Auth'
import { ThemeContext } from '../../contexts/Theme'

interface Option {
  id: string
  label: string
  path?: string
  icon: JSX.Element
}

interface UserPopoverProps {
  username: string
}

const options: Option[] = [
  {
    id: uuid(),
    label: 'Home',
    path: '/',
    icon: <HomeIcon className="w-6 h-6" />
  },
  {
    id: uuid(),
    label: 'Dashboard',
    path: '/dashboard',
    icon: <Squares2X2Icon className="w-6 h-6" />
  },
  {
    id: uuid(),
    label: 'Perfil',
    path: '/perfil',
    icon: <UserIcon className="w-6 h-6" />
  },
  {
    id: uuid(),
    label: 'Logout',
    icon: <ArrowRightCircleIcon className="w-6 h-6" />
  }
]

export function UserPopover ({ username }: UserPopoverProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const router = useRouter()
  const { setToken, setUser } = useContext(AuthContext)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  const handleLogoutClick = async (): Promise<void> => {
    nookies.destroy(null, 'oversell.token')
    nookies.destroy(null, 'oversell.username')

    setToken('')
    setUser({
      id: '',
      email: '',
      username: ''
    })

    setIsOpen(false)

    if (router.pathname === '/') {
      router.reload()
    }

    await router.push('/entrar')
  }

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true)
        }}
        className={`${
          isOpen
            ? 'ring-2 ring-offset-2 dark:ring-offset-zinc-700 ring-purple-blue dark:ring-opacity-50'
            : ''
        } w-10 h-10 bg-purple-blue rounded-full flex items-center justify-center cursor-pointer outline-none hover:ring-2 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-700 hover:ring-purple-blue dark:hover:ring-opacity-50`}
      >
        <p className="uppercase text-gray-100 font-bold text-xl">
          {username.split('')[0]}
        </p>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="absolute rounded-lg right-8 md:right-24 top-14 z-10 mt-3 w-56 transform sm:px-0 lg:max-w-3xl"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative dark:bg-zinc-700 p-4 lg:grid-cols-2">
                      {options.map((option) => {
                        if (option.path) {
                          return (
                            <div
                              onMouseLeave={() => setIsHover(false)}
                              onMouseEnter={() => {
                                if (option.path !== router.pathname) {
                                  setIsHover(true)
                                }
                              }}
                              className="py-1"
                              key={option.id}
                            >
                              <Link
                                href={option.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex space-x-2 p-2 hover:bg-indigo-100 dark:hover:bg-zinc-800 hover:rounded-md transition-all ${
                                  option.path === router.pathname && !isHover
                                    ? 'dark:bg-zinc-800 rounded-md'
                                    : ''
                                }`}
                              >
                                <div className="dark:text-gray-50">
                                  {option.icon}
                                </div>
                                <p className="dark:text-gray-50">
                                  {option.label}
                                </p>
                              </Link>
                            </div>
                          )
                        } else {
                          return (
                            <div
                              onMouseLeave={() => setIsHover(false)}
                              onMouseEnter={() => {
                                if (option.path !== router.pathname) {
                                  setIsHover(true)
                                }
                              }}
                              className="py-1"
                              key={option.id}
                            >
                              <button
                                onClick={handleLogoutClick}
                                className={`flex space-x-2 p-2 w-full hover:bg-indigo-100 dark:hover:bg-zinc-800 hover:rounded-md transition-all ${
                                  option.path === router.pathname && !isHover
                                    ? 'dark:bg-zinc-700 rounded-md'
                                    : ''
                                }`}
                              >
                                <div className="dark:text-gray-50">
                                  {option.icon}
                                </div>
                                <p className="dark:text-gray-50">
                                  {option.label}
                                </p>
                              </button>
                            </div>
                          )
                        }
                      })}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* <div className="relative">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
          show={isOpen}
        >
          <div
            className={`${
              isOpen ? "" : "hidden"
            } absolute right-0 z-10 mt-3 w-56 transform px-4 sm:px-0 lg:max-w-3xl`}
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="relative dark:bg-zinc-700 p-4 lg:grid-cols-2">
                {options.map((option) => {
                  if (option.path) {
                    return (
                      <div
                        onMouseLeave={() => setIsHover(false)}
                        onMouseEnter={() => {
                          if (option.path !== router.pathname) {
                            setIsHover(true);
                          }
                        }}
                        className="py-1"
                        key={option.id}
                      >
                        <Link
                          href={option.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex space-x-2 p-2 hover:bg-indigo-100 dark:hover:bg-zinc-800 hover:rounded-md transition-all ${
                            option.path === router.pathname && !isHover
                              ? "dark:bg-zinc-800 rounded-md"
                              : ""
                          }`}
                        >
                          <div className="dark:text-gray-50">{option.icon}</div>
                          <p className="dark:text-gray-50">{option.label}</p>
                        </Link>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onMouseLeave={() => setIsHover(false)}
                        onMouseEnter={() => {
                          if (option.path !== router.pathname) {
                            setIsHover(true);
                          }
                        }}
                        className="py-1"
                        key={option.id}
                      >
                        <button
                          onClick={handleLogoutClick}
                          className={`flex space-x-2 p-2 w-full hover:bg-indigo-100 dark:hover:bg-zinc-800 hover:rounded-md transition-all ${
                            option.path === router.pathname && !isHover
                              ? "dark:bg-zinc-700 rounded-md"
                              : ""
                          }`}
                        >
                          <div className="dark:text-gray-50">{option.icon}</div>
                          <p className="dark:text-gray-50">{option.label}</p>
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </Transition>
      </div> */}
    </>
  )
}
