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

const stories: StoryData[] = [
  {
    username: "Desafio Buffo",
    avatarUrl: "/images/avatar-buffo.png",
    media: [
      { url: "/images/photo-1.jpg", type: "image", duration: 1 },
      { url: "/images/photo-2.jpg", type: "image", duration: 1 },
      { url: "/images/photo-3.jpg", type: "image", duration: 1 },
      { url: "/images/photo-4.jpg", type: "image", duration: 1 },
      { url: "/images/photo-5.jpg", type: "image", duration: 1 },
      { url: "/images/photo-6.jpg", type: "image", duration: 1 },
      { url: "/images/photo-7.jpg", type: "image", duration: 15 },
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
  {
    username: "Story 4",
    avatarUrl: "/images/sample.jpg",
    media: [{ url: "/images/sample.jpg", type: "image", duration: 3 }],
  },
  {
    username: "Story 5",
    avatarUrl: "/images/sample.jpg",
    media: [{ url: "/images/sample.jpg", type: "image", duration: 1 }],
  },
];

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

  const handleNextStory = useCallback(() => {
    setActiveStoryIndex((prev) => {
      if (prev === null) return null;
      return prev < stories.length - 1 ? prev + 1 : null;
    });
  }, []);

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
          onClose={() => setActiveStoryIndex(null)}
          onNext={handleNextStory}
        />
      )}
    </>
  );
};

export default StoriesCarousel;
