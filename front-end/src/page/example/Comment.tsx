import React, { useState, useEffect } from "react";
import axios from "axios";
export type commentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}[];
const Comments: React.FC = () => {
  const [comments, setComments] = useState<commentType>([]);

  useEffect(() => {
    async function getComments() {
      const comments = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      setComments(comments.data);
    }
    getComments();
  }, []);

  return (
    <ul>
      {comments?.map((comment, index) => (
        <li key={index} data-testid="comment">
          {comment.name}
        </li>
      ))}
    </ul>
  );
};

export default Comments;