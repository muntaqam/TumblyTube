import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="notfound">
    <figure className="notfound__figure">
      <img src={window.notFoundURL} width="500" height="500" />
      <figcaption className="notfound__caption">
        This page isn't available. Sorry about that. Try searching for something
        else.
      </figcaption>
    </figure>
    <Link to="/" className="notfound__go-home">
      Go Home
    </Link>
  </div>
);

export default NotFound;
