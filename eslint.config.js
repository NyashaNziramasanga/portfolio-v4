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

export default tseslint.config(
  { ignores: ["dist", "src/routeTree.gen.ts", "test-results"] },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "@stylexjs": stylex,
      local: {
        rules: {
          "vertical-style-objects": verticalStyleObjects,
        },
      },
    },
    rules: {
      "@stylexjs/valid-styles": "error",
      "@stylexjs/no-unused": "error",
      "@stylexjs/valid-shorthands": "warn",
      "local/vertical-style-objects": "error",
    },
  },
);
