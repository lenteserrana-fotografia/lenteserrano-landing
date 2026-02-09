"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./StoriesCarousel.module.css";
import Story from "@/layouts/Story/Story";

interface Media {
  url: string;
  type: "image" | "video";
  duration?: number; // in seconds, default 15 for images
}

interface StoryData {
  username: string;
  avatarUrl: string;
  media: Media[];
}

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
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const stories: StoryData[] = [
    {
      username: "Story 1",
      avatarUrl: "/images/sample.jpg",
      media: [
        { url: "/images/sample.jpg", type: "image", duration: 15 },
        { url: "/images/sample.jpg", type: "image", duration: 15 },
      ],
    },
    {
      username: "Story 2",
      avatarUrl: "/images/sample.jpg",
      media: [
        { url: "/images/sample.jpg", type: "image", duration: 15 },
        { url: "/videos/video-sample.mp4", type: "video" },
      ],
    },
    {
      username: "Story 3",
      avatarUrl: "/images/sample.jpg",
      media: [{ url: "/images/sample.jpg", type: "image", duration: 15 }],
    },
  ];

  const handleCloseStory = useCallback(() => {
    setActiveStoryIndex(null);
  }, []);

  const handleNextStory = useCallback(() => {
    if (activeStoryIndex === null) {
      return;
    }
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      handleCloseStory();
    }
  }, [activeStoryIndex, stories.length, handleCloseStory]);

  return (
    <>
      <div className={styles.storiesCarousel}>
        {stories.map((story, index) => (
          <StoryButton
            key={index}
            username={story.username}
            imageUrl={story.avatarUrl}
            onClick={() => setActiveStoryIndex(index)}
          />
        ))}
      </div>
      {activeStoryIndex !== null && (
        <Story
          story={stories[activeStoryIndex]}
          onClose={handleCloseStory}
          onNext={handleNextStory}
          onPrevious={() => {
            if (activeStoryIndex > 0) {
              setActiveStoryIndex(activeStoryIndex - 1);
            } else if (activeStoryIndex === 0) {
              handleCloseStory();
            } else {
              setActiveStoryIndex(activeStoryIndex - 1);
            }
          }}
        />
      )}
    </>
  );
};

export default StoriesCarousel;
