const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require("@module-federation/dashboard-plugin");

// const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8085/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
    alias: { vue: 'vue/dist/vue.esm.js' }
  },

  devServer: {
    port: 8085,
    historyApiFallback: true,
    openPage: 'vuejs'
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
      name: "vuejs",
      filename: "remoteEntry.js",
      remotes: {
        // home: "home@http://localhost:8080/remoteEntry.js"
        // checkout: "checkout@http://localhost:8082/remoteEntry.js",
        // search: "search@http://localhost:8085/remoteEntry.js",
        // details: "details@http://localhost:8083/remoteEntry.js",
      },
      exposes: {
        "./Vuejs": "./src/VuejsFrame"
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
