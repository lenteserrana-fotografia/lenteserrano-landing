"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./StoriesCarousel.module.css";

interface StoryButtonProps {
  username: string;
  imageUrl: string;
  onClick?: () => void;
}

const StoryButton = ({ username, imageUrl, onClick }: StoryButtonProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(() => {
    setIsActive(true);
    onClick?.();

    // Reset the active state after animation completes
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [onClick]);

  return (
    <button
      className={styles.story}
      onClick={handleClick}
      aria-label={`Ver story de ${username}`}
    >
      <div className={`${styles.ring} ${isActive ? styles.ringActive : ""}`}>
        <div className={styles.avatarWrapper}>
          <Image
            src={imageUrl}
            alt={username}
            className={styles.avatar}
            width={66}
            height={66}
          />
        </div>
      </div>
      <span className={styles.username}>{username}</span>
    </button>
  );
};

const StoriesCarousel = () => {
  const stories = [
    { username: "Story 1", imageUrl: "/images/sample.jpg" },
    { username: "Story 2", imageUrl: "/images/sample.jpg" },
    { username: "Story 3", imageUrl: "/images/sample.jpg" },
    { username: "Story 4", imageUrl: "/images/sample.jpg" },
    { username: "Story 4", imageUrl: "/images/sample.jpg" },
    { username: "Story 4", imageUrl: "/images/sample.jpg" },
    { username: "Story 4", imageUrl: "/images/sample.jpg" },
  ];

  return (
    <div className={styles.storiesCarousel}>
      {stories.map((story, index) => (
        <StoryButton
          key={index}
          username={story.username}
          imageUrl={story.imageUrl}
          onClick={() => console.log(`Story ${index + 1} clicked`)}
        />
      ))}
    </div>
  );
};

export default StoriesCarousel;
