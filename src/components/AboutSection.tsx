import * as stylex from "@stylexjs/stylex";
import techStackData from "@/data/techStack.json";
import { ResumeActions } from "@/components/ResumeActions";
import { colors, constants } from "../styles/tokens.stylex";

const YEARS_OF_EXPERIENCE = new Date().getFullYear() - 2018;

export function AboutSection() {
  return (
    <div {...stylex.props(styles.root)}>
      <p {...stylex.props(styles.eyebrow)}>Hello, I'm Nash 👋🏿</p>
      <h1 {...stylex.props(styles.title)}>
        Senior Mobile Engineer
        <span {...stylex.props(styles.subtitle)}>
          React Native, iOS, Android &amp; Agentic Tooling
        </span>
      </h1>
      <p {...stylex.props(styles.summary)}>
        I build and scale mobile products used by millions of people. Based in
        Melbourne with over {YEARS_OF_EXPERIENCE} years of experience, I work at{" "}
        <a
          href="https://linktr.ee"
          target="_blank"
          rel="noopener noreferrer"
          {...stylex.props(styles.link)}
        >
          Linktree
        </a>{" "}
        across React Native architecture, reliable delivery and creator
        experiences on iOS and Android.
      </p>

      <div {...stylex.props(styles.actions)}>
        <ResumeActions />
      </div>

      <div {...stylex.props(styles.grid)}>
        {techStackData.map((group) => (
          <div
            {...stylex.props(styles.card, stylex.defaultMarker())}
            key={group.id}
          >
            <div {...stylex.props(styles.emoji)} aria-hidden="true">
              {group.emoji}
            </div>
            <h2 {...stylex.props(styles.cardTitle)}>{group.label}</h2>
            <p {...stylex.props(styles.cardSummary)}>{group.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    maxWidth: 1024,
    flexDirection: "column",
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: colors.blue300,
  },
  title: {
    marginTop: 12,
    maxWidth: 896,
    fontSize: {
      default: 30,
      [constants.sm]: 36,
      [constants.lg]: 48,
    },
    lineHeight: 1.25,
    fontWeight: 700,
    color: colors.brand50,
  },
  subtitle: {
    marginTop: 8,
    display: "block",
    fontSize: {
      default: 20,
      [constants.sm]: 24,
      [constants.lg]: 30,
    },
    lineHeight: {
      default: "28px",
      [constants.sm]: "32px",
      [constants.lg]: "36px",
    },
    fontWeight: 600,
    color: colors.brand300,
  },
  summary: {
    marginTop: 24,
    maxWidth: 896,
    fontSize: {
      default: 14,
      [constants.sm]: 16,
    },
    lineHeight: {
      default: 1.625,
      [constants.sm]: "28px",
    },
    color: colors.brand200,
  },
  link: {
    color: {
      default: colors.blue300,
      ":hover": colors.blue200,
    },
    textDecorationLine: "underline",
    textUnderlineOffset: 2,
  },
  actions: {
    marginTop: 28,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 12,
  },
  grid: {
    marginTop: {
      default: 40,
      [constants.sm]: 48,
    },
    display: "grid",
    gap: 16,
    gridTemplateColumns: {
      [constants.sm]: "repeat(2, minmax(0, 1fr))",
      [constants.lg]: "repeat(3, minmax(0, 1fr))",
    },
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: {
      default: "color-mix(in oklab, #4A5568 50%, transparent)",
      ":hover": "color-mix(in oklab, #4299E1 30%, transparent)",
    },
    backgroundColor: {
      default: "color-mix(in oklab, #1F2937 50%, transparent)",
      ":hover": "color-mix(in oklab, #252F3F 70%, transparent)",
    },
    padding: 20,
    boxShadow: {
      default: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      ":hover":
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    transform: {
      default: "translateY(0)",
      ":hover": "translateY(-4px)",
      [constants.reduceMotion]: "none",
    },
    transitionProperty: {
      default: "all",
      [constants.reduceMotion]: "none",
    },
    transitionDuration: "300ms",
  },
  emoji: {
    marginBottom: 16,
    display: "flex",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: {
      default: "color-mix(in oklab, #4299E1 10%, transparent)",
      [stylex.when.ancestor(":hover")]:
        "color-mix(in oklab, #4299E1 15%, transparent)",
    },
    fontSize: 20,
    boxShadow: "inset 0 0 0 1px color-mix(in oklab, #4299E1 20%, transparent)",
    transitionProperty: "background-color",
  },
  cardTitle: {
    fontSize: 12,
    lineHeight: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.brand300,
  },
  cardSummary: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: "24px",
    color: colors.brand100,
  },
});
