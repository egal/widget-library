import vue from "rollup-plugin-vue";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss";
import alias from "@rollup/plugin-alias";
import typescript from "rollup-plugin-typescript2";

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: "src/index.js",
    output: {
      format: "esm",
      file: "dist/egal-widgets.esm.js",
      sourcemap: true,
    },
    external: ["@dvuckovic/vue3-bootstrap-icons"],
    plugins: [
      peerDepsExternal(),
      typescript({
        check: false, // disable typechecks if necessary
      }),
      alias({
        entries: [{ find: /^@\/(.+)/, replacement: "src" }],
      }),
      resolve(),
      scss(),
      vue({ css: true }),
      commonjs(),
      // json(),
    ],
  },
];
