import { useState } from "react";

export default function likeButton(){
   
    let [isLiked,setIsLiked]=useState(false);

    let toggleLike=()=>{
       let newVal=!isLiked;
       setIsLiked(newVal);
    };
    let likeStyle={color:"red"};
    return (
        <div>
            <p onClick={toggleLike}>
            {isLiked ? (
                <i class="fa-regular fa-heart"></i>
            ):(
            <i class="fa-solid fa-heart"  style={likeStyle}></i>
        )
            }</p>
        </div>
    );
}