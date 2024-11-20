import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Blog.css';

export class Blog extends React.Component {
  render() {
    const { id, img, name } = this.props;
    return (
      <div className="course-box" key={id}>
        <Link to={`/blogpost/${id}`}>
          <div className="course-thumbnail">
            <Image
              className=""
              src={img}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "./assets/images/upload-1.svg";
              }}
            />
          </div>
          <div className="course-title">{name}</div>
        </Link>
      </div>
    );
  }
}

export default Blog;

