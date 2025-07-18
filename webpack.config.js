const path = require("node:path");
const SizePlugin = require("size-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  devtool: "source-map",
  stats: "errors-only",
  entry: {
    // target_path/target_file_name: full_source_path
    "options/options": ["./source/options/options.ts", "./source/options/options.scss"],
    // content scripts
    "content_scripts/netflix": ["./source/content_scripts/netflix.ts"],
    "content_scripts/amazon": ["./source/content_scripts/amazon.ts"],
    "content_scripts/youtube": ["./source/content_scripts/youtube.ts"],
  },
  output: {
    path: path.join(__dirname, "distribution"),
    filename: "[name].js",
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".json"],
    alias: {
      "webextension-polyfill-ts": path.resolve(
        path.join(__dirname, "node_modules", "webextension-polyfill-ts"),
      ),
    },
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name(resourcePath, _resourceQuery) {
                return resourcePath.replace(/.+source[/\\]/, "").replace(/\.s[ac]ss$/i, ".css");
              },
            },
          },
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new SizePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          context: "source",
          globOptions: {
            ignore: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.scss"],
          },
        },
        // {
        //   from: './source/options/options.html',
        //   to: './browser_action/options.html',
        // },
        // {
        //   from: './distribution/options/options.css',
        //   to: './browser_action/options.css',
        // },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: false,
          output: {
            beautify: true,
            indent_level: 2, // eslint-disable-line camelcase
          },
        },
      }),
    ],
  },
};
