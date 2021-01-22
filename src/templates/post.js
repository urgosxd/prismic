import React, { useEffect, useState, useRef } from "react"
import {
  LAYOUT,
  ReadingProgress,
  TOCinteractive,
  MyFabToggle,
} from "../components"
import { useUsuario } from "../js/store"
import { DiscussionEmbed } from "disqus-react"
import { siteUrl } from "../utils/siteConfig"
import { graphql } from "gatsby"
import { Parser } from "html-to-react"
import { Grid, Typography } from "@material-ui/core"

import { MyContainer2, Frontmatter, Contenido, MyButton } from "../styles"
import { useSpring, animated } from "react-spring"

const Post = ({ data, pageContext }) => {
  let postItem = useRef(null)

  // useEffect(() => {
  //   TweenMax.to(postItem, 1.4, { opacity: 1, y: 20, ease: Power3.easeOut })
  // })
  console.log(data)
  //DISQUS CONSTS
  const disqusShortname = `blog-hkos9nos5v`
  const disqusConfig = {
    identifier: data.prismicPost.uid,
    title: data.prismicPost.data.title.text,
    url: `${siteUrl}/${pageContext.slug}`,
  }

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

  const [TocToggle, setTocToggle] = useState(false)
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setShow(false)
  //   }, 2500)
  //   return () => {
  //     clearTimeout(timer)
  //   }
  // })

  const contenido = new Parser()

  const target = useRef(null)

  const props = useSpring({
    transform: TocToggle ? "translateX(0px)" : "translateX(-300px)",
  })
  return (
    <LAYOUT>
      <ReadingProgress target={target} />
      <MyContainer2 fixed={false}>
        <Grid
          container
          spacing={1}
          // ref={el => {
          //   postItem = el
          // }}
        >
          <Grid item xs={2}>
            <div className="stick">
              {" "}
              <MyFabToggle
                estado={TocToggle}
                onClick={() => setTocToggle(!TocToggle)}
              />
              <animated.div style={props}>
                <TOCinteractive finalArray={finalArray} target={target} />
              </animated.div>
            </div>
          </Grid>

          <Grid item xs={8}>
            <Frontmatter>
              <Typography component="h1">
                {data.prismicPost.data.title.text}
              </Typography>

              <div>
                {" "}
                <span>
                  Subido desde {data.prismicPost.data.preview[0].date}
                </span>
                <span>Autor</span>
                <hr />
              </div>
            </Frontmatter>

            <Contenido ref={target} className="contenido">
              {contenido.parse(data.prismicPost.data.content.html)}
            </Contenido>

            <div className="discutir">
              <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            {" "}
          </Grid>

          <div className="formulario netli"></div>
          <footer>
            <div>COPYRAITH</div>
            <div>REDES</div>
          </footer>
        </Grid>
      </MyContainer2>
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
          text
        }
        preview {
          date(formatString: "YYYY MMMM DD")
        }
      }
    }
  }
`
