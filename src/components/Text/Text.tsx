import { ReactNode, ElementType } from "react";
import styles from "./Text.module.css";

export enum TEXTSIZES {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

interface TextProps {
  children: ReactNode;
  size?: TEXTSIZES;
  as?: ElementType;
  className?: string;
}

export const Text = ({
  children,
  size = TEXTSIZES.md,
  as: Component = "span",
  className = "",
}: TextProps) => {
  return (
    <Component className={`${styles.text} ${styles[size]} ${className}`}>
      {children}
    </Component>
  );
};
