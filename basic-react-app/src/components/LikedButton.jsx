
import React, { useState } from "react";
import "./LikedButton.css"; // you can put styles here or in shared file

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div className="like-icon" onClick={toggleLike}>
      <i className={`fa-heart ${liked ? "fas liked" : "far"}`}></i>
    </div>
  );
}
