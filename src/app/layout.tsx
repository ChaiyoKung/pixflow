import "@mantine/core/styles.css";
import { type Metadata } from "next";
import { ColorSchemeScript, Container, mantineHtmlProps, MantineProvider, Stack } from "@mantine/core";
import { TRPCReactProvider } from "~/trpc/react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

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
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider forceColorScheme="dark">
          <TRPCReactProvider>
            <Stack gap={0} mih="100vh">
              <Header />
              <Container
                size="lg"
                component="main"
                flex={1}
                w="100%"
                styles={{
                  root: {
                    display: "flex",
                    flexDirection: "column",
                  },
                }}
              >
                {children}
              </Container>
              <Footer />
            </Stack>
          </TRPCReactProvider>
        </MantineProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
