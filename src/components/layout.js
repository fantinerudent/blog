import React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading text-center">
        <Link to="/">{title} </Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home text-center" to="/">
        {title} 
      </Link>
    )
  }

  return (
    <div className=" m-3 mx-auto p-3 min-h-full bg-indigo-200" data-is-root-path={isRootPath}>
      <header className="global-header bg-indigo-50 h-12 bg-opacity-50 min-w-full text-center p-3">{header}</header>
      <main className='justify-center flex'>{children}</main>
      <footer >
      <div class="container mx-auto px-6">
        <div class="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
            <div class="sm:w-2/3 text-center py-6">
                <p class="text-sm text-indigo-600 font-bold mb-2">
                © Fantine Rudent - {new Date().getFullYear()}
                </p>
            </div>
        </div>
    </div>
      </footer>
    </div>
  )
}

export default Layout
