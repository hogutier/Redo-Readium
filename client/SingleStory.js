import React, { Component } from "react";
import axios from 'axios';
import Comments from './Comments'

export default class SingleStory extends Component {
  constructor() {
    super();
    this.state = {
      story: {
        author: {},
        comments: []
      }
    }
  }

  async componentDidMount () {
    const storyId = this.props.match.params.storyId
    const {data} = await axios.get(`/api/stories/${storyId}`)
    this.setState({
      story: data
    })
  }

  render() {
    const story = this.state.story
    return (
      <div id="single-story" className="column">
        <h1>{story.title}</h1>
        <p>{story.content}</p>
        <h3>Responses:</h3>
        <div id="comments">
          {story.comments.map(comment => (
            <Comments key={comment.id} {...comment} />
          ))}
        </div>
      </div>
    );
  }
}
