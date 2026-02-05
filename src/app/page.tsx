import StoriesCarousel from "@/components/StoriesCarousel/StoriesCarousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <StoriesCarousel />
      <h1>Testing Overflow Behavior</h1>
      {Array.from({ length: 10 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Paragraph #
          {i + 1}
        </p>
      ))}
      <div
        style={{
          width: "3000px",
          height: "200px",
          background: "linear-gradient(to right, red, blue)",
        }}
      >
        Wide horizontal content to test horizontal overflow
      </div>
    </div>
  );
}
