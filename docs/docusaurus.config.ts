import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "midestic-rn-library",
  tagline: "React Native components and icons, themed with NativeWind (Tailwind CSS)",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: process.env.URL ?? "http://localhost:3000",
  baseUrl: "/",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: false,
      disableSwitch: true,
    },
    navbar: {
      title: "midestic",
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://www.npmjs.com/package/midestic-rn-library",
          label: "npm",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Installation",
              to: "/docs/installation",
            },
            {
              label: "Components",
              to: "/docs/components/actions",
            },
            {
              label: "Icons",
              to: "/docs/icons",
            },
          ],
        },
        {
          title: "Project",
          items: [
            {
              label: "Storybook",
              to: "/docs/storybook",
            },
            {
              label: "Development",
              to: "/docs/development",
            },
            {
              label: "npm",
              href: "https://www.npmjs.com/package/midestic-rn-library",
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} midestic. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "tsx"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
