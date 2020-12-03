import React, { useEffect, useState, useRef } from "react"
import {
  LAYOUT,
  ReadingProgress,
  TOCinteractive,
  TOCstatic,
  Avatar,
} from "../components"
import { Container, Row, Col } from "react-bootstrap"
import { useUsuario } from "../js/store"
import { DiscussionEmbed } from "disqus-react"
import { siteUrl } from "../utils/siteConfig"
import { graphql } from "gatsby"

const Post = ({ data, pageContext }) => {
  //REACTMARKDOWN TOC

  console.log(pageContext)
  //DISQUS CONSTS
  const disqusShortname = `blog-hkos9nos5v`
  // const disqusConfig = {
  //   identifier: data.strapiPosts.strapiId,
  //   title: data.strapiPosts.titulo,
  //   url: `${siteUrl}/${pageContext.slug}`,
  // }

  //SISTEM CLAP

  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(true)
    }, 2500)
    return () => {
      clearTimeout(timer)
    }
  })

  //BAR CONSTS

  const target = React.createRef()

  //AVATAR

  return (
    <LAYOUT>
      <Container fluid={true} style={{ padding: 0 }}>
        <section className="introduction">
          <Row>
            <Col lg={3}>
              <Avatar
                state={show}
                setState={setShow}
                username={}
                info={}
                avatar={}
                social={}
              />
            </Col>
            <Col lg={6}>
              <h1></h1>
              <div>
                <p className="description"></p>
                <div>
                  <ul className="hashtags">
                    <li></li>
                  </ul>
                </div>
                <div className="avatar">
                  Autor:
                  <span onClick={() => setShow(true)}></span>
                </div>
                <div className="infoPremature">
                  <div className="claps">
                    <img src={data.clap.publicURL} />

                    <span></span>

                    <span></span>
                  </div>
                </div>
              </div>

              <TOCstatic />
            </Col>
          </Row>
        </section>

        <section className="paper">
          <Row noGutters={true}>
            <Col lg={3}>
              <TOCinteractive />
            </Col>
            <Col lg={6} className="ccc">
              <section ref={target} className="contenido" />

              <div className="claps">
                <span>Clap!</span>
                <img src={data.clap.publicURL} />
              </div>
            </Col>
            <Col lg={3}> caca</Col>
          </Row>
        </section>
        <ReadingProgress target={target} />
        {/* <div className="discutir">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div> */}
      </Container>
    </LAYOUT>
  )
}

export default Post

export const postQuery = graphql``
