const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8084/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8084,
    historyApiFallback: true,
    openPage: 'login'
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "login",
      filename: "remoteEntry.js",
      remotes: {
        login: "login@http://localhost:8084/remoteEntry.js",
        // home: "home@http://localhost:8080/remoteEntry.js",
        // checkout: "checkout@http://localhost:8082/remoteEntry.js",
        // search: "search@http://localhost:8081/remoteEntry.js",
        // details: "details@http://localhost:8083/remoteEntry.js",
      },
      exposes: {
        "./Login": "./src/LoginFrame",
        "./reducers": "./src/store/reducers"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new DashboardPlugin({
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url: "http://github.com",
        },
        remote: "http://localhost:8082/remoteEntry.js",
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
