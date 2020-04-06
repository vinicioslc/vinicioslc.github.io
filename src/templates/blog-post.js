import React from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagsList from "../components/Text/TagsList"

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  padding: 1.45rem 1.0875rem;
`

const MarkedHeader = styled.h1`
  display: inline;
  border-radius: 1em 0 1em 0;
  background-image: linear-gradient(
    -100deg,
    rgba(255, 250, 150, 0.15),
    rgba(255, 250, 150, 0.8) 100%,
    rgba(255, 250, 150, 0.25)
  );
`

const HeaderDate = styled.h3`
  margin-top: 10px;
  color: #606060;
`

// STYLE THE TAGS INSIDE THE MARKDOWN HERE
const MarkdownContent = styled.div`
  a {
    text-decoration: none;
    position: relative;

    background-image: linear-gradient(
      rgba(255, 250, 150, 0.8),
      rgba(255, 250, 150, 0.8)
    );
    background-repeat: no-repeat;
    background-size: 100% 0.2em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    &:hover {
      background-size: 100% 88%;
    }
  }
`
const HeroIMG = styled.div`
  border-radius: 12px;
  width: 100%;
  height: 40vh;
  background-clip: initial;
  background-attachment: initial;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.imag});
`
const ContentHero = ({ children, hero }) => {
  let imageURL = null

  if (hero && hero.publicURL) {
    imageURL = hero.publicURL
  }

  if (imageURL) {
    return <HeroIMG imag={imageURL} height={"10%"} width={"100%"}></HeroIMG>
  } else {
    return <div src="empty_hero_img"></div>
  }
}

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        keywords={post.frontmatter.tags || []}
      />
      <ContentHero hero={post.frontmatter.hero}></ContentHero>
      <Content>
        <MarkedHeader>{post.frontmatter.title}</MarkedHeader>
        <HeaderDate>
          {post.frontmatter.date} - {post.fields.readingTime.text}
        </HeaderDate>
        <TagsList>{post.frontmatter.tags}</TagsList>
        <hr></hr>
        <MarkdownContent dangerouslySetInnerHTML={{ __html: post.html }} />
      </Content>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
        tags
        hero {
          publicURL
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`
