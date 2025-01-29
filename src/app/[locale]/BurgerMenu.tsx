"use client";

import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { useEffect, useState } from "react";
import { MenuIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navigation");

  // Disable scrolling when the menu is open, and enable it when closed
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleMenuToggle = (state: { isOpen: boolean }) => {
    setIsOpen(state.isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Menu
        aria-hidden="false"
        right
        className="bg-background flex flex-col p-6 items-center"
        isOpen={isOpen}
        onStateChange={handleMenuToggle}
        disableAutoFocus
        customBurgerIcon={<MenuIcon className="cursor-pointer" />}
        customCrossIcon={<X className="cursor-pointer" />}
        styles={{
          bmBurgerButton: {
            width: "36px",
            height: "30px",
            position: "relative",
          },

          bmCrossButton: {
            height: "24px",
            width: "24px",
            margin: "15px",
          },
          bmMenuWrap: {
            position: "fixed",
            top: "0",
            right: "0",
            height: "100vh",
            width: "50vw",
            zIndex: "9999",
          },
          bmMenu: {
            padding: "2.5em 1.5em 0",
            fontSize: "18px",
          },
          bmMorphShape: {},
          bmItemList: {
            paddingTop: "6rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            gap: "3rem",
          },
          bmOverlay: {
            position: "fixed",
            top: "0",
            left: "0",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: "99",
            width: "100vw",
            height: "100vh",
          },
        }}
      >
        <Link
          id="home"
          className="menu-item hover:text-primary transition-all duration-300"
          href="/"
          onClick={handleMenuItemClick}
        >
          {t("home")}
        </Link>
        <Link
          id="about"
          className="menu-item hover:text-primary transition-all duration-300"
          href="/store"
          onClick={handleMenuItemClick}
        >
          {t("products")}
        </Link>
        <Link
          id="contact"
          className="menu-item hover:text-primary transition-all duration-300"
          href="/blog"
          onClick={handleMenuItemClick}
        >
          {t("blogs")}
        </Link>
        <Link
          id="contact"
          className="menu-item hover:text-primary transition-all duration-300"
          href="/contact"
          onClick={handleMenuItemClick}
        >
          {t("contact")}
        </Link>
      </Menu>
    </div>
  );
};

export default Sidebar;
