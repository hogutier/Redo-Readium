import React, {Component} from 'react'

const Comments = ({author, content}) => (
  <div className="comment row">
    <img src={author.imageUrl} />
    <div className="column">
      <a>
        <h5>{author.name}</h5>
      </a>
      <div>{content}</div>
    </div>
  </div>
)
export default Comments
