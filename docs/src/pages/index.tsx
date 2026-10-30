import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

const features = [
  {
    number: "01",
    title: "Made for NativeWind",
    description:
      "Style with the className API you already know. Customize the design tokens or override any component to fit your app.",
    link: "/docs/theming",
    label: "Explore theming",
  },
  {
    number: "02",
    title: "A thoughtful component set",
    description:
      "Buttons, inputs, overlays, layout primitives and more. Every component and prop is typed and ready to compose.",
    link: "/docs/components/actions",
    label: "Browse components",
  },
  {
    number: "03",
    title: "See it in Storybook",
    description:
      "Explore interactive examples, compare variants and test component states in the Expo Storybook app.",
    link: "/docs/storybook",
    label: "Open Storybook guide",
  },
];

function CodePreview() {
  return (
    <div className={styles.preview}>
      <div className={styles.previewBar}>
        <span className={styles.windowDots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.fileName}>App.tsx</span>
        <span className={styles.language}>TSX</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>1</span>
          <code>
            <span className={styles.syntaxPurple}>import</span> {"{"} Button {"}"}
          </code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>2</span>
          <code>
            {"  "}
            <span className={styles.syntaxPurple}>from</span>{" "}
            <span className={styles.syntaxGreen}>&quot;./src/components/ui/button&quot;</span>;
          </code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>3</span>
          <code />
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>4</span>
          <code>
            <span className={styles.syntaxPurple}>export default function</span>{" "}
            <span className={styles.syntaxBlue}>WelcomeScreen</span>() {"{"}
          </code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>5</span>
          <code>
            {"  "}
            <span className={styles.syntaxPurple}>return</span> (
          </code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>6</span>
          <code>
            {"    "}&lt;Button title=
            <span className={styles.syntaxGreen}>&quot;Get started&quot;</span>
          </code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>7</span>
          <code>
            {"      "}className=
            <span className={styles.syntaxGreen}>&quot;rounded-full bg-primary&quot;</span> /&gt;
          </code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>8</span>
          <code>{"  "});</code>
        </div>
        <div className={styles.codeLine}>
          <span className={styles.lineNumber}>9</span>
          <code>{"}"}</code>
        </div>
      </div>
      <div className={styles.previewResult}>
        <span className={styles.previewLabel}>COMPONENT PREVIEW</span>
        <div className={styles.previewCard}>
          <span className={styles.previewGreeting}>A little less setup.</span>
          <span className={styles.previewSubtext}>A more considered starting point.</span>
          <span className={styles.previewButton}>
            Get started <span aria-hidden="true">→</span>
          </span>
        </div>
        <span className={styles.previewCaption}>NativeWind styles. Native feel.</span>
      </div>
    </div>
  );
}

function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />A personal React Native component library
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            Thoughtful UI.
            <br />
            <span>Native by nature.</span>
          </Heading>
          <p className={styles.heroDescription}>
            My personal collection of React Native components. Add only what you want, then make the source
            your own.
          </p>
          <p className={styles.personalNote}>
            Not a replacement for React Native&apos;s built-in components. Just my own optional additions.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/docs/installation">
              Get started <span aria-hidden="true">→</span>
            </Link>
            <Link className={styles.textButton} to="/docs/components/actions">
              Explore components <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={styles.installHint}>
            <span className={styles.installPrompt}>$</span> npm i midestic-rn-library
          </div>
        </div>
        <CodePreview />
      </div>
      <div className={styles.heroBottom}>
        <span>BUILT FOR THE WAY YOU BUILD</span>
        <span className={styles.heroRule} />
        <span>React Native</span>
        <span className={styles.heroSeparator}>·</span>
        <span>NativeWind</span>
        <span className={styles.heroSeparator}>·</span>
        <span>TypeScript</span>
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className={styles.featureSection}>
      <div className={styles.sectionHeading}>
        <div>
          <span className={styles.sectionEyebrow}>THE LIBRARY</span>
          <Heading as="h2">The details, already considered.</Heading>
        </div>
        <p>Useful building blocks, careful defaults and room to make every screen your own.</p>
      </div>
      <div className={styles.featureGrid}>
        {features.map((feature) => (
          <article className={styles.featureCard} key={feature.number}>
            <span className={styles.featureNumber}>{feature.number}</span>
            <div>
              <Heading as="h3">{feature.title}</Heading>
              <p>{feature.description}</p>
            </div>
            <Link to={feature.link} className={styles.featureLink}>
              {feature.label} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className={styles.quickStartCopy}>
        <span className={styles.sectionEyebrow}>UP AND RUNNING</span>
        <Heading as="h2">From install to interface.</Heading>
        <p>
          Copy only the components you choose into your app, where you can edit and maintain them yourself.
        </p>
        <Link to="/docs/installation" className={styles.featureLink}>
          Follow the installation guide <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={styles.commandBlock}>
        <div className={styles.commandHeader}>
          <span className={styles.commandIndicator} />
          <span>Terminal</span>
          <span className={styles.commandLanguage}>npm</span>
        </div>
        <code>
          <span className={styles.syntaxMuted}>$</span> npm i midestic-rn-library
          <br />
          <span className={styles.syntaxMuted}>$</span> npx midestic-rn-library add button
        </code>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="React Native component library"
      description="A personal React Native component library. Add only the components you choose; this project complements, not replaces, React Native's built-in components."
    >
      <main className={styles.home}>
        <HomeHero />
        <FeatureSection />
        <QuickStart />
      </main>
    </Layout>
  );
}
