import React, { useState, useEffect, useMemo, useRef } from "react"

const UsuarioContext = React.createContext()

export const UsuarioProvider = props => {
  return <UsuarioContext.Provider {...props} />
}

export const useUsuario = () => {
  const context = React.useContext(UsuarioContext)
  if (!context) {
    throw new Error("Not Working")
  }
  return context
}
