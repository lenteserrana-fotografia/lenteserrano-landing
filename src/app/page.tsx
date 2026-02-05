import StoriesCarousel from "@/components/StoriesCarousel/StoriesCarousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <StoriesCarousel />
    </div>
  );
}
