"use client";

import { usePathname } from "next/navigation";
import MenuButton from "../MenuButton/MenuButton";
import styles from "./NavbarMobile.module.css";

const NavbarMobile = () => {
  const pathname = usePathname();

  return (
    <div className={styles["menu-button-container"]}>
      <MenuButton icon="home" href="/" isActive={pathname === "/"} />
      {/* <MenuButton icon="home" href="/" isActive={pathname === "/"} /> */}

      <div className={styles["menu-button-center"]}>
        <MenuButton
          icon="call"
          href="https://wa.me/3516468790"
          size={40}
          openInNewTab
        />
      </div>

      <MenuButton
        icon="camera"
        href="/nosotros"
        isActive={pathname === "/nosotros"}
      />
    </div>
  );
};

export default NavbarMobile;
