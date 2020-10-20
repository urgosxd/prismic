import React, { useState, useEffect, useMemo, useRef } from "react"

const UsuarioContext = React.createContext()

export const UsuarioProvider = props => {
  const buscar = async id => {
    return await fetch("/.netlify/functions/hello" + `?id=${id}`).then(res =>
      res.json()
    )
  }

  const actualizar = (id, contador) => {
    fetch(
      "/.netlify/functions/update" + `?id=${id}` + "&" + `cont=${contador + 1}`
    ).then(res => res.json())
  }

  const value = useMemo(() => {
    return {
      buscar,
      actualizar,
    }
  }, [buscar, actualizar])

  return <UsuarioContext.Provider value={value} {...props} />
}

export const useUsuario = () => {
  const context = React.useContext(UsuarioContext)
  if (!context) {
    throw new Error("Not Working")
  }
  return context
}
