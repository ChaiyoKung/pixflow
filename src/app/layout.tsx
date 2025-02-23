import "@mantine/core/styles.css";

import { type Metadata } from "next";
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from "@mantine/core";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "PixFlow",
  description: "PixFlow is an AI-powered application that automatically generates images on a schedule",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
