import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const id = location.pathname.split('/')[2]

  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-600 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to={'/'}
            >
              <i className="fa-solid fa-house text-lg leading-lg text-white opacity-75"></i>
              <span className="ml-2">Home</span>
            </Link>

            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {id && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to={`/client/${id}`}
                  >
                    <i className="fa-solid fa-chart-line text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Projects</span>
                  </Link>
                </li>
              )}
              {id && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to={`/client/${id}/integrations`}
                  >
                    <i className="fa-solid fa-square-plus text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Integrations</span>
                  </Link>
                </li>
              )}
              {id && (
                <li className="nav-item">
                  <Link
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to={`/client/${id}/edit`}
                  >
                    <i className="fa-solid fa-gear text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Client Settings</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
