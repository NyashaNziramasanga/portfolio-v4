import { createContext, useContext, type ReactNode } from "react";
import { CopyValue } from "./CopyValue";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../styles/Colors.stylex";
import { spacing } from "../../styles/Spacing.stylex";
import { radii } from "../../styles/BorderRadius.stylex";
import { fonts } from "../../styles/Fonts.stylex";

// Column flags keep each row aligned with its table header.
const TableColumns = createContext(1);

export function TokenTable({
  children,
  label = "Design tokens",
  headings = ["Token", "Value", "Example"],
  showExample = true,
  showDescription = false,
}: {
  children: ReactNode;
  label?: string;
  showExample?: boolean;
  showDescription?: boolean;
  headings?: [string, string, string];
}) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`${label}, scroll horizontally on small screens`}
      {...stylex.props(styles.container)}
    >
      <table
        aria-label={label}
        {...stylex.props(
          styles.table,
          showExample && styles.withExample,
          showDescription && styles.withDescription,
        )}
      >
        <colgroup>
          <col />
          <col />
          {showExample && <col />}
          {showDescription && <col />}
        </colgroup>
        <thead>
          <tr>
            {[
              headings[0],
              headings[1],
              ...(showExample ? [headings[2]] : []),
              ...(showDescription ? ["Description"] : []),
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                {...stylex.props(fonts.bodySmall, styles.header)}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableColumns.Provider
            value={(showExample ? 1 : 0) | (showDescription ? 2 : 0)}
          >
            {children}
          </TableColumns.Provider>
        </tbody>
      </table>
    </div>
  );
}

export function TokenRow({
  name,
  value,
  usage,
  children,
}: {
  name: string;
  value: string | number;
  usage?: string;
  children?: ReactNode;
}) {
  const columns = useContext(TableColumns);
  return (
    <tr {...stylex.props(styles.row)}>
      <th scope="row" {...stylex.props(styles.cell, styles.name)}>
        <code {...stylex.props(fonts.bodySmall, styles.text)}>{name}</code>
      </th>
      <td {...stylex.props(styles.cell, styles.valueCell)}>
        <CopyValue name={name} value={value} />
      </td>
      {!!(columns & 1) && (
        <td {...stylex.props(styles.cell)}>
          <div {...stylex.props(styles.example)}>{children}</div>
        </td>
      )}
      {!!(columns & 2) && (
        <td {...stylex.props(styles.cell)}>
          <p {...stylex.props(fonts.bodySmall, styles.text, styles.muted)}>
            {usage}
          </p>
        </td>
      )}
    </tr>
  );
}

const styles = stylex.create({
  container: {
    overflowX: "auto",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.borderAlpha40,
    borderRadius: radii.lg,
    outlineColor: colors.accentText,
  },
  table: {
    width: "100%",
    minWidth: 320,
    tableLayout: "fixed",
    borderCollapse: "collapse",
    backgroundColor: colors.surfaceSubtleAlpha20,
  },
  withExample: {
    minWidth: 640,
  },
  withDescription: {
    minWidth: 800,
  },
  header: {
    paddingBlock: spacing.sm,
    paddingInline: spacing.md,
    textAlign: "left",
    color: colors.textMuted,
    backgroundColor: colors.surfaceSubtleAlpha35,
  },
  row: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: colors.borderAlpha40,
    backgroundColor: {
      ":hover": colors.surfaceSubtleAlpha50,
    },
  },
  cell: {
    paddingBlock: spacing.xs,
    paddingInline: spacing.md,
    verticalAlign: "middle",
    textAlign: "left",
  },
  valueCell: {
    paddingBlock: 0,
  },
  name: {
    color: colors.textPrimary,
  },
  text: {
    overflowWrap: "anywhere",
    minWidth: 0,
  },
  muted: {
    color: colors.textMuted,
  },
  example: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xxs,
    minWidth: 0,
  },
});
