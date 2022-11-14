import React from "react";

const axios = require('axios').default;
const baseURL = "http://localhost:"

export default function Get() {
    const [post, setPost] = React.useState(null);

    React.useEffect(() => {
        axios.get(`${baseURL}/1`).then((response) => {
            setPost(response.data);
        });
    }, []);

    function createPost() {
    axios
      .post(baseURL, {
        title: "Test",
        body: "This is a TEst."
      })
      .then((response) => {
        setPost(response.data);
      });
    }
    if (!post) return "No post!"

    return (
        <div>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button onClick={createPost}>Create Post</button>
        </div>
    );
}