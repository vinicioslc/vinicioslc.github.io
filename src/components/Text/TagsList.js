import React from "react"
import styled from "@emotion/styled"

const TagsListStyle = styled.h6`
  display: inline;
  color: #3684c2;
`
const TagElementStyle = styled.h6`
  display: inline;
`

const TagsComponent = ({ children, showTrace }) => {
  return Array.isArray(children) && children.length > 0 ? (
    <TagsListStyle>
      {showTrace ? "-" : ""}{" "}
      {children.map((category, idx) => (
        <TagElementStyle>
          {category + (idx < children.length - 1 ? ", " : "")}
        </TagElementStyle>
      ))}
    </TagsListStyle>
  ) : (
    ""
  )
}

export default TagsComponent
