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
  const ddd = data.strapiPosts.childStrapiPostsContent.internal.content
  console.log(pageContext)
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
  const [show, setShow] = useState(false)

  useEffect(() => {
    buscar(data.strapiPosts.strapiId).then(el => setContador(el))
    let timer = setTimeout(() => {
      setShow(true)
    }, 2500)
    return () => {
      clearTimeout(timer)
    }
  }, [buscar])
  const todo = id => {
    setContador(contador + 1)
    actualizar(id, contador)
  }
  //BAR CONSTS

  const target = React.createRef()

  //AVATAR

  return (
    <LAYOUT>
      <Container fluid={true} style={{ padding: 0 }}>
        <section
          className="introduction"
          style={{
            backgroundImage: `url(${pageContext.bac})`,
          }}
        >
          <Row>
            <Col lg={3}>
              <Avatar
                state={show}
                setState={setShow}
                username={data.strapiPosts.users[0].username}
                info={data.strapiPosts.users[0].info}
                avatar={data.strapiPosts.users[0].avatar.publicURL}
                social={[
                  data.strapiPosts.users[0].instagram.link,
                  data.strapiPosts.users[0].twitter.link,
                ]}
              />
            </Col>
            <Col lg={6}>
              <h1>{data.strapiPosts.titulo}</h1>
              <div>
                <p className="description">
                  {data.strapiPosts.preview.description}
                </p>
                <div>
                  <ul className="hashtags">
                    {data.strapiPosts.tags.map(el => (
                      <li key={el.tag}>{el.tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="avatar">
                  Autor:
                  <span onClick={() => setShow(true)}>
                    {data.strapiPosts.users[0].username}
                  </span>
                </div>
                <div className="infoPremature">
                  <div className="claps">
                    <img src={pageContext.clap} />

                    <span>{contador}</span>

                    <span>{data.strapiPosts.publishAt.date}</span>
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
              <section
                ref={target}
                dangerouslySetInnerHTML={{ __html: ddd }}
                className="contenido"
              />

              <div className="claps">
                <span>Clap!</span>
                <img
                  src={pageContext.clap}
                  onClick={() => todo(data.strapiPosts.strapiId)}
                />

                {contador}
              </div>
            </Col>
            <Col lg={3}> caca</Col>
          </Row>
        </section>
        <ReadingProgress target={target} />
        <div className="discutir">
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
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
      publishAt {
        date
      }
      preview {
        description
      }
      tags {
        tag
      }
      users {
        avatar {
          publicURL
        }
        info
        username
        instagram {
          link
        }
        twitter {
          link
        }
      }
      strapiId
    }
  }
`
