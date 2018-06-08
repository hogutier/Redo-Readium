import React, { Component } from "react";
import axios from "axios";
import Comments from "./Comments";
import Stories from "./Stories";
import { NavLink, Route } from "react-router-dom";

export default class SingleAuthor extends Component {
  constructor() {
    super();
    this.state = {
      author: {},
      comments: [],
      stories: []
    };
  }

  async componentDidMount() {
    const authorId = this.props.match.params.authorId;

    const authorRes = axios.get(`/api/authors/${authorId}`);
    const commentRes = axios.get(`/api/authors/${authorId}/comments`);
    const storiesRes = axios.get(`/api/authors/${authorId}/stories`);

    const [author, comments, stories] = await Promise.all([
      authorRes,
      commentRes,
      storiesRes
    ]);
    this.setState({
      author: author.data,
      comments: comments.data,
      stories: stories.data
    });
  }

  render() {
    const author = this.state.author;
    const comments = this.state.comments || [];
    const stories = this.state.stories || [];

    return (
      <div id="single-author" className="column">
        <div className="single-author-detail" className="row">
          <div className="column mr1">
            <h1>{author.name}</h1>
            <p>{author.bio}</p>
          </div>
          <img src={author.imageUrl} />
        </div>
        <hr />
        <div id="single-author-nav">
          <NavLink
            to={`/authors/${author.id}/comments`}
            activeClassName="active"
          >
            Comments
          </NavLink>
          <NavLink
            to={`/authors/${author.id}/stories`}
            activeClassName="active"
          >
            Stories
          </NavLink>
        </div>
        <hr />
        <div>
        <Route
            path="/authors/:authorId/comments"
            render={() => {
              return comments.map(comment => (
                <Comments key={comment.id} {...comment} />
              ))
            }}
        />
        <Route path="/authors/:authorId/stories" render={() => <Stories stories={stories} /> } />
        </div>
      </div>
    );
  }
}
