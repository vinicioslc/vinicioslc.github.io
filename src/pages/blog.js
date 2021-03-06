import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TagsList from "../components/Text/TagsList"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const ArticleDate = styled.h5`
  display: inline;
  color: #606060;
`

const MarkerHeader = styled.h3`
  display: inline;
  border-radius: 1em 0 1em 0;
  ${(props) =>
    props.marked &&
    css`
      background-image: linear-gradient(
        -100deg,
        rgba(255, 250, 150, 0.15),
        rgba(150, 255, 168, 0.8) 100%,
        rgba(255, 250, 150, 0.25)
      );
    `}
`

const ReadingTime = styled.h5`
  display: inline;
  color: #606060;
`

const LangTagStyle = styled.h5`
  display: inline;
  color: #606060;
`
const LanguageComponent = ({ children }) => {
  return <LangTagStyle>- {children || ""} </LangTagStyle>
}
const PostCardAppearence = ({ children, hero }) => {
  let imgUrl = ""
  if (hero && hero.publicUrl) {
    imgUrl = hero.publicUrl
  }

  return (
    <div
      style={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      {children}{" "}
    </div>
  )
}
const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" />
      <Content>
        <h1>Blog</h1>
        {data.allMarkdownRemark.edges
          .filter(({ node }) => {
            const rawDate = node.frontmatter.rawDate
            const date = new Date(rawDate)
            return date < new Date()
          })
          .map(({ node }) => (
            <div key={node.id}>
              <PostCardAppearence>
                <Link
                  to={node.frontmatter.path}
                  css={css`
                    text-decoration: none;
                    color: inherit;
                  `}
                >
                  <MarkerHeader>{node.frontmatter.title} </MarkerHeader>
                  <LanguageComponent>
                    {node.frontmatter.lang}
                  </LanguageComponent>{" "}
                  <div>
                    <ArticleDate>{node.frontmatter.date}</ArticleDate>
                    <ReadingTime> - {node.fields.readingTime.text}</ReadingTime>
                    <TagsList>{node.frontmatter.tags}</TagsList>
                  </div>
                  <p>{node.excerpt}</p>
                </Link>
              </PostCardAppearence>
            </div>
          ))}
      </Content>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            rawDate: date
            path
            author
            lang
            tags
          }
          fields {
            slug
            readingTime {
              text
            }
          }
          excerpt
        }
      }
    }
  }
`
