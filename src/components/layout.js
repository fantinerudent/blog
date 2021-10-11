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
    <div className=" m-3  mx-auto p-3 min-h-full bg-orange" data-is-root-path={isRootPath}>
      <header className="global-header bg-yellow h-12 bg-opacity-50 min-w-full text-center p-3">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default Layout
