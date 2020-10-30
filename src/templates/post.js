import React, { useEffect, useState } from "react"
import {
  LAYOUT,
  ReadingProgress,
  TOCinteractive,
  TOCstatic,
} from "../components"
import { Container, Row, Col } from "react-bootstrap"
import { useUsuario } from "../js/store"
import { DiscussionEmbed } from "disqus-react"
import { siteUrl } from "../utils/siteConfig"
import { graphql } from "gatsby"

const Post = ({ data, pageContext }) => {
  //REACTMARKDOWN TOC
  const ddd = data.strapiPosts.childStrapiPostsContent.internal.content
  console.log(data)
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
      <Container fluid={true} style={{ padding: 0 }}>
        <section
          className="introduction"
          style={{
            backgroundImage: `url(${data.imageSharp.fixed.src})`,
          }}
        >
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <h1>{data.strapiPosts.titulo}</h1>
              <div>
                <p className="description">
                  {data.strapiPosts.preview.description}
                </p>
                <div>
                  <ul className="hashtags">
                    <li></li>
                  </ul>
                </div>
                <div className="infoPremature">
                  <div className="claps">
                    <img src={data.file.publicURL} />

                    <span>{contador}</span>
                  </div>
                  <div className="chistesito"></div>
                  <p className="date"></p>
                </div>
              </div>

              <TOCstatic />
            </Col>
          </Row>
        </section>

        <section className="paper">
          <Row>
            <Col lg={3}>
              <TOCinteractive />
            </Col>
            <Col lg={6}>
              <section
                ref={target}
                dangerouslySetInnerHTML={{ __html: ddd }}
                className="contenido"
              />
              {contador}
              <button onClick={() => todo(data.strapiPosts.strapiId)}>
                CLICK ME!
              </button>
              <div className="clapp"></div>
            </Col>
            <Col lg={3}> caca</Col>
          </Row>
        </section>
        <ReadingProgress target={target} />
        <section className="feedback">
          <Row>
            <Col></Col>
            <Col>
              <div>
                <div></div>
                <div>
                  <h2>asd</h2>
                  <p></p>
                  <p></p>
                  <div> </div>
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
      titulo
      preview {
        description
      }
      strapiId
    }
    imageSharp(id: { eq: "ad85a23a-9ad9-5679-881d-9a69fe7bdb08" }) {
      fixed(width: 1400, quality: 100) {
        src
      }
    }
    file(id: { eq: "3a30abb2-1014-5033-b945-6ce87f84e765" }) {
      id
      publicURL
    }
  }
`
