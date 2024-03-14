import "~/styles/globals.css";
import "~/styles/editor.css";

import { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./providers";

const title =
  "Tiptap- OpenAI- and Vercel-powered WYSIWYG editor with autocompletions.";
const description =
  "Tiptap is a WYSIWYG editor that uses OpenAI's GPT-3 to provide autocompletions. It's built with Vercel's Next.js and ProseMirror.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@steventey",
  },
  metadataBase: new URL("https://novel.sh"),
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
