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
import { Parser, ProcessNodeDefinitions } from "html-to-react"

const Post = ({ data, pageContext }) => {
  //REACTMARKDOWN TOC

  console.log(data)
  //DISQUS CONSTS
  const disqusShortname = `blog-hkos9nos5v`
  // const disqusConfig = {
  //   identifier: data.strapiPosts.strapiId,
  //   title: data.strapiPosts.titulo,
  //   url: `${siteUrl}/${pageContext.slug}`,
  // }

  // TOC
  //Positions
  // let processNodeDefinitions = new ProcessNodeDefinitions(React)
  // let processingIntructions = [
  //   {
  //     shouldProcessNode:(node)=>(
  //       node.parent && node.parent.name && node.parent.name === "h2" || node.parent.name === "h3" || node.parent.name === "h4" || node.parent.name === "h5" || node.parent.name === "h6"
  //     ),
  //     processNode: (node,children)=>(
  //       node.data
  //     )
  //   }
  // ]

  let finalArray = [[], [], [], [], []]

  function switch_0(type, valor) {
    let ar = {
      2: function () {
        finalArray[0].push(valor)
      },
      3: function () {
        finalArray[1].push(valor)
      },
      4: function () {
        finalArray[2].push(valor)
      },
      5: function () {
        finalArray[3].push(valor)
      },
      6: function () {
        finalArray[4].push(valor)
      },
    }
    return ar[type]()
  }

  const arr_0 = data.prismicPost.data.content.raw
  let consecu = -1
  for (let i = 0; i < arr_0.length; i++) {
    if (arr_0[i].type.substring(0, 7) === "heading") {
      if (parseInt(arr_0[i].type.substring(7, 8)) > 1) {
        consecu = consecu + 1
        switch_0(parseInt(arr_0[i].type.substring(7, 8)), {
          index: consecu,
          title: arr_0[i].text,
        })
      }
    }
  }

  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer = setTimeout(() => {
      setShow(false)
    }, 2500)
    return () => {
      clearTimeout(timer)
    }
  })

  //BAR CONSTS

  const contenido = new Parser()

  //AVATAR
  const target = useRef(null)
  console.log(target)

  const asd = target
  console.log(asd)
  return (
    <LAYOUT>
      <Container fluid={true} style={{ padding: 0 }}>
        <section className="introduction">
          <Row>
            <Col lg={3}>
              <Avatar
                state={show}
                setState={setShow}
                // username={}
                // info={}
                // avatar={}
                // social={}
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
                    {/* <img src={data.clap.publicURL} /> */}

                    <span></span>

                    <span></span>
                  </div>
                </div>
              </div>

              <TOCstatic finalArray={finalArray} />
            </Col>
          </Row>
        </section>

        <section className="paper">
          <Row noGutters={true}>
            <Col lg={3}>
              <TOCinteractive finalArray={finalArray} target={target} />
            </Col>
            <Col lg={6} className="ccc">
              <div ref={target} className="contenido">
                {contenido.parse(data.prismicPost.data.content.html)}
              </div>

              <div className="claps">
                <span>Clap!</span>
                {/* <img src={data.clap.publicURL} /> */}
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

export const postQuery = graphql`
  query($slug: String!) {
    prismicPost(uid: { eq: $slug }) {
      uid
      data {
        content {
          raw
          html
        }
        title {
          html
        }
      }
    }
  }
`
