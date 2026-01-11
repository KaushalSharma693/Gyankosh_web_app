import React, { useEffect, useRef, useState } from "react";
import "./CursorFollower.css";

export default function CursorFollower() {
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const followerRef = useRef({ x: 0, y: 0 });
  const animRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      const dx = targetPos.x - followerRef.current.x;
      const dy = targetPos.y - followerRef.current.y;

      // If moving fast, ease toward position
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        followerRef.current.x += dx * 0.2;
        followerRef.current.y += dy * 0.2;
      } else {
        // Snap when close
        followerRef.current.x = targetPos.x;
        followerRef.current.y = targetPos.y;
      }

      const el = document.querySelector(".cursor-follower");
      if (el) {
        el.style.left = `${followerRef.current.x + 15}px`;
        el.style.top = `${followerRef.current.y + 15}px`;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [targetPos]);

  return <div className="cursor-follower"></div>;
}
