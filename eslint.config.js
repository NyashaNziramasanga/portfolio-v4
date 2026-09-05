import stylex from "@stylexjs/eslint-plugin";
import tseslint from "typescript-eslint";

const stylexDefinitionMethods = new Set([
  "create",
  "defineConsts",
  "defineVars",
  "keyframes",
]);

const verticalStyleObjects = {
  meta: {
    type: "layout",
    docs: {
      description: "Keep StyleX object properties on separate lines",
    },
    fixable: "whitespace",
    schema: [],
    messages: {
      vertical:
        "Keep StyleX object properties vertically aligned, one per line.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;

    function belongsToStylexDefinition(node) {
      let current = node.parent;

      while (current) {
        if (
          current.type === "CallExpression" &&
          current.callee.type === "MemberExpression" &&
          current.callee.object.type === "Identifier" &&
          current.callee.object.name === "stylex" &&
          current.callee.property.type === "Identifier" &&
          stylexDefinitionMethods.has(current.callee.property.name)
        ) {
          return true;
        }

        current = current.parent;
      }

      return false;
    }

    return {
      ObjectExpression(node) {
        if (node.properties.length === 0 || !belongsToStylexDefinition(node)) {
          return;
        }

        const openingBrace = sourceCode.getFirstToken(node);
        const closingBrace = sourceCode.getLastToken(node);
        const firstProperty = node.properties[0];
        const lastProperty = node.properties.at(-1);
        const fixes = [];

        if (openingBrace.loc.end.line === firstProperty.loc.start.line) {
          fixes.push(["after", openingBrace]);
        }

        for (let index = 1; index < node.properties.length; index += 1) {
          const previousProperty = node.properties[index - 1];
          const property = node.properties[index];

          if (previousProperty.loc.end.line === property.loc.start.line) {
            const comma = sourceCode.getTokenAfter(previousProperty);
            fixes.push(["after", comma]);
          }
        }

        if (lastProperty.loc.end.line === closingBrace.loc.start.line) {
          fixes.push(["before", closingBrace]);
        }

        if (fixes.length === 0) {
          return;
        }

        context.report({
          node,
          messageId: "vertical",
          fix(fixer) {
            return fixes.map(([position, token]) =>
              position === "after"
                ? fixer.insertTextAfter(token, "\n")
                : fixer.insertTextBefore(token, "\n"),
            );
          },
        });
      },
    };
  },
};

const colorProperties = new Set([
  "backgroundColor",
  "borderBlockColor",
  "borderBlockEndColor",
  "borderBlockStartColor",
  "borderBottomColor",
  "borderColor",
  "borderInlineColor",
  "borderInlineEndColor",
  "borderInlineStartColor",
  "borderLeftColor",
  "borderRightColor",
  "borderTopColor",
  "caretColor",
  "color",
  "fill",
  "outlineColor",
  "stroke",
  "textDecorationColor",
]);
const spacingProperties = new Set([
  "columnGap",
  "gap",
  "margin",
  "marginBlock",
  "marginBlockEnd",
  "marginBlockStart",
  "marginBottom",
  "marginInline",
  "marginInlineEnd",
  "marginInlineStart",
  "marginLeft",
  "marginRight",
  "marginTop",
  "padding",
  "paddingBlock",
  "paddingBlockEnd",
  "paddingBlockStart",
  "paddingBottom",
  "paddingInline",
  "paddingInlineEnd",
  "paddingInlineStart",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "rowGap",
]);
const radiusProperties = new Set([
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "borderEndEndRadius",
  "borderEndStartRadius",
  "borderRadius",
  "borderStartEndRadius",
  "borderStartStartRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
]);
const typographyProperties = new Set([
  "fontFamily",
  "fontSize",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
]);
const motionProperties = new Set([
  "animationDuration",
  "animationTimingFunction",
  "transitionDuration",
  "transitionTimingFunction",
]);
const shadowProperties = new Set(["boxShadow", "textShadow"]);
const structuralValues = new Set([
  "auto",
  "currentColor",
  "inherit",
  "initial",
  "none",
  "revert",
  "revert-layer",
  "unset",
]);

function propertyName(node) {
  if (node.type !== "Property") {
    return null;
  }

  if (!node.computed && node.key.type === "Identifier") {
    return node.key.name;
  }

  if (node.key.type === "Literal" && typeof node.key.value === "string") {
    return node.key.value;
  }

  return null;
}

function belongsToStylexDefinition(node) {
  let current = node.parent;

  while (current) {
    if (
      current.type === "CallExpression" &&
      current.callee.type === "MemberExpression" &&
      current.callee.object.type === "Identifier" &&
      current.callee.object.name === "stylex" &&
      current.callee.property.type === "Identifier" &&
      stylexDefinitionMethods.has(current.callee.property.name)
    ) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

function governedProperty(node) {
  let current = node;

  while (current) {
    const name = propertyName(current);
    if (
      name &&
      (colorProperties.has(name) ||
        spacingProperties.has(name) ||
        radiusProperties.has(name) ||
        typographyProperties.has(name) ||
        motionProperties.has(name) ||
        shadowProperties.has(name) ||
        name === "zIndex")
    ) {
      return name;
    }

    current = current.parent;
  }

  return null;
}

const useStyleTokens = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require shared tokens for governed StyleX properties",
    },
    schema: [],
    messages: {
      rawBreakpoint: "Use a token from Breakpoints.stylex.ts for media queries.",
      rawValue:
        "Use a shared StyleX token for the raw {{property}} value {{value}}.",
    },
  },
  create(context) {
    if (context.filename.includes("/src/styles/")) {
      return {};
    }

    return {
      Property(node) {
        if (!belongsToStylexDefinition(node)) {
          return;
        }

        const name = propertyName(node);
        if (name?.startsWith("@media ")) {
          context.report({
            node: node.key,
            messageId: "rawBreakpoint",
          });
          return;
        }

        const governed = governedProperty(node);
        if (!governed) {
          return;
        }

        const value = node.value;
        if (value.type !== "Literal") {
          return;
        }

        if (value.value === 0 || structuralValues.has(String(value.value))) {
          return;
        }

        context.report({
          node: value,
          messageId: "rawValue",
          data: {
            property: governed,
            value: JSON.stringify(value.value),
          },
        });
      },
    };
  },
};

export default tseslint.config(
  { ignores: ["dist", "src/routeTree.gen.ts", "test-results"] },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "@stylexjs": stylex,
      local: {
        rules: {
          "use-style-tokens": useStyleTokens,
          "vertical-style-objects": verticalStyleObjects,
        },
      },
    },
    rules: {
      "@stylexjs/valid-styles": "error",
      "@stylexjs/no-unused": "error",
      "@stylexjs/valid-shorthands": "warn",
      "local/use-style-tokens": "error",
      "local/vertical-style-objects": "error",
    },
  },
);
