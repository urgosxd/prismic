import React from "react"
import { Toast } from "react-bootstrap"

export const Avatar = ({ info, avatar, username, social, state, setState }) => {
  return (
    <Toast onClose={() => setState(false)} show={state} delay={4000} autohide>
      <Toast.Header>
        <img src={avatar} />
        <strong className="mr-auto">{username}</strong>
      </Toast.Header>
      <Toast.Body>{info}</Toast.Body>
    </Toast>
  )
}
