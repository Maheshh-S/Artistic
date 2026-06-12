"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TemplateRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const hidePreloader = () => {
      document.querySelectorAll<HTMLElement>(".preloader").forEach((element) => {
        element.style.display = "none";
      });
    };

    const timer = window.setTimeout(hidePreloader, 700);

    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", hidePreloader);
    };
  }, [pathname]);

  return null;
}
