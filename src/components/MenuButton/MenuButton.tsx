"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon/Icon";
import styles from "./MenuButton.module.css";

interface MenuButtonProps {
  icon: string;
  onClick?: () => void;
  size?: number;
  href?: string;
  openInNewTab?: boolean;
  isActive?: boolean;
}

const MenuButton = ({
  icon,
  onClick,
  size = 30,
  href,
  openInNewTab = false,
  isActive = false,
}: MenuButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (href) {
      if (openInNewTab) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles["menu-button"]} ${isActive ? styles["menu-button-active"] : ""}`}
    >
      <Icon
        name={icon}
        size={size}
        iconColor={isActive ? "white" : "grey"}
      ></Icon>
    </div>
  );
};

export default MenuButton;
