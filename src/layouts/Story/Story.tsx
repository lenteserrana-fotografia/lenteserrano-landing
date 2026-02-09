"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./Story.module.css";

interface Media {
  url: string;
  type: "image" | "video";
  duration?: number;
}

interface StoryData {
  username: string;
  avatarUrl: string;
  media: Media[];
}

interface StoryProps {
  story: StoryData;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Story = ({ story, onClose, onNext, onPrevious }: StoryProps) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMedia = story.media[currentMediaIndex];
  const isLastMedia = currentMediaIndex === story.media.length - 1;

  const goToNextMedia = useCallback(() => {
    if (isLastMedia) {
      onNext();
      setCurrentMediaIndex(0);
    } else {
      setCurrentMediaIndex((prev) => prev + 1);
      setProgress(0);
    }
  }, [isLastMedia, onNext]);

  const goToPreviousMedia = useCallback(() => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setCurrentMediaIndex(0);
    }
  }, [currentMediaIndex]);

  useEffect(() => {
    if (isPaused) return;

    if (currentMedia.type === "video") {
      const video = videoRef.current;
      if (!video) return;

      const updateProgress = () => {
        if (video.duration && video.currentTime) {
          setProgress((video.currentTime / video.duration) * 100);
        }
      };

      const handleEnded = () => {
        goToNextMedia();
      };

      video.addEventListener("timeupdate", updateProgress);
      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("timeupdate", updateProgress);
        video.removeEventListener("ended", handleEnded);
      };
    } else {
      // Image with default duration
      const duration = (currentMedia.duration || 15) * 1000;
      const interval = 50;
      const increment = (interval / duration) * 100;

      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNextMedia();
            return 0;
          }
          return prev + increment;
        });
      }, interval);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentMedia, isPaused, goToNextMedia]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftSide = x < rect.width / 2;

    if (isLeftSide) {
      goToPreviousMedia();
    } else {
      goToNextMedia();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className={styles.storyOverlay} onClick={handleTap}>
      <div
        className={styles.storyContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <Image
              src={story.avatarUrl}
              alt={story.username}
              width={32}
              height={32}
              className={styles.avatar}
            />
            <span className={styles.username}>{story.username}</span>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.progressBars}>
          {story.media.map((_, index) => (
            <div key={index} className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width:
                    index < currentMediaIndex
                      ? "100%"
                      : index === currentMediaIndex
                        ? `${progress}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.mediaContainer} onClick={handleTap}>
          {currentMedia.type === "video" ? (
            <video
              ref={videoRef}
              src={currentMedia.url}
              className={styles.media}
              autoPlay
              playsInline
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                }
              }}
            />
          ) : (
            <Image
              src={currentMedia.url}
              alt={`Media ${currentMediaIndex + 1}`}
              fill
              className={styles.media}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <button
          className={styles.pauseButton}
          onClick={(e) => {
            e.stopPropagation();
            togglePause();
          }}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
      </div>
    </div>
  );
};

export default Story;
