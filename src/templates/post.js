import React, { useEffect, useState } from "react"
import { LAYOUT, ReadingProgress, MYTOC } from "../components"
import { Container, Row, Col } from "react-bootstrap"
import { useUsuario } from "../js/store"
import { DiscussionEmbed } from "disqus-react"
import { siteUrl } from "../utils/siteConfig"

const Post = ({ data, pageContext }) => {
  //REACTMARKDOWN TOC
  const ddd = data.strapiPosts.childStrapiPostsContent.internal.content

  //DISQUS CONSTS
  const disqusShortname = `blog-hkos9nos5v`
  const disqusConfig = {
    identifier: data.strapiPosts.strapiId,
    title: data.strapiPosts.titulo,
    url: `${siteUrl}/${pageContext.slug}`,
  }

  //SISTEM CLAP
  const { buscar, actualizar } = useUsuario()

  const [contador, setContador] = useState()

  useEffect(() => {
    buscar(data.strapiPosts.strapiId).then(el => setContador(el))
  }, [buscar])

  const todo = id => {
    setContador(contador + 1)
    actualizar(id, contador)
  }
  //BAR CONSTS

  const target = React.createRef()

  return (
    <LAYOUT>
      <Container>
        <section className="introduction">
          <Row>
            <Col>
              <h1></h1>
              <div>
                <p></p>
                <p></p>
                <div className="clapp"></div>
                <div className="chistesito"></div>
              </div>
              <div className="FALTA HACER"></div>
            </Col>
          </Row>
        </section>

        <section className="paper">
          <Row>
            <Col lg={5}>
              <MYTOC />
            </Col>
            <Col lg={6}>
              <section ref={target} dangerouslySetInnerHTML={{ __html: ddd }} />
              {contador}
              <button onClick={() => todo(data.strapiPosts.strapiId)}>
                CLICK ME!
              </button>
              <div className="clapp"></div>
            </Col>
            <Col lg={1}> caca</Col>
          </Row>

          <ReadingProgress target={target} />
        </section>

        <section className="feedback">
          <Row>
            <Col></Col>
            <Col>
              <div>
                <div></div>
                <div>
                  <h2></h2>
                  <p></p>
                  <p></p>
                  <div></div>
                </div>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </section>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </Container>
    </LAYOUT>
  )
}

export default Post

export const postQuery = graphql`
  query($slug: String!) {
    strapiPosts(childSlug: { internal: { content: { eq: $slug } } }) {
      content
      childStrapiPostsContent {
        internal {
          content
        }
      }
      strapiId
    }
  }
`
