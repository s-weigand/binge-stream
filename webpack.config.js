const path = require('path')
const SizePlugin = require('size-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  stats: 'errors-only',
  entry: {
    // target_path/target_file_name: full_source_path
    'background/background': './source/background/background.ts',
    'options/options': ['./source/options/options.ts', './source/options/options.scss'],
    'context_menue/context_menue_entry': './source/context_menue/context_menue_entry.ts',
    'sidebar/sidebar': './source/sidebar/sidebar.ts',
    'actions/option_action/add_option_action':
      './source/actions/option_action/add_option_action.ts',
  },
  output: {
    path: path.join(__dirname, 'distribution'),
    filename: '[name].js',
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json'],
    alias: {
      'webextension-polyfill-ts': path.resolve(
        path.join(__dirname, 'node_modules', 'webextension-polyfill-ts'),
      ),
    },
  },
  module: {
    rules: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name(resourcePath, resourceQuery) {
                return resourcePath.replace(/.+source[\/\\]/, '').replace(/\.s[ac]ss$/i, '.css')
              },
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new SizePlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'source',
          globOptions: {
            ignore: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.scss'],
          },
        },
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
}
