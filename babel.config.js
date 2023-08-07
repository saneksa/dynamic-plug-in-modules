module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    "@babel/proposal-object-rest-spread",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-class-static-block" 
  ], 
  assumptions: {
    setPublicClassFields: false,
  },
};
