import { Figtree, Onest } from "next/font/google";

export const mainFont = Figtree({
  subsets: ["latin-ext", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const logoFont = Onest({
  subsets: ["latin-ext", "latin"],
  weight: ["400", "600", "700", "800", "900"],
});
