const path = require("path");
const packageJSON = require("./package.json");
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
  it.includes("@saas/")
);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const redirects = require("./redirects.json");
module.exports = withBundleAnalyzer({
  transpilePackages: [
    "react-leaflet",
    "@react-leaflet/core",
    ...transpiledPackages,
  ],
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: ["/.(js|ts)x?$/"],
      },
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "hyper-s3.behtarino.com",
      "hs3-cf.behtarino.com",
      "hs3-cdn-saas.behtarino.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/website",
        destination: "/",
        permanent: true,
      },
      {
        source: "/23961-%D8%B3%D8%A7%DB%8C%D8%AA-%D8%B3%D8%A7%D8%B2",
        destination: "/site-builder",
        permanent: true,
      },
      {
        source: "/23961",
        destination: "/site-builder",
        permanent: true,
      },
      {
        source:
          "/23962-%D9%81%D8%B1%D9%88%D8%B4%DA%AF%D8%A7%D9%87-%D8%B3%D8%A7%D8%B2",
        destination: "/shop-builder",
        permanent: true,
      },
      {
        source: "/23962",
        destination: "/shop-builder",
        permanent: true,
      },
      {
        source:
          "/24184-%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%B3%D8%A7%DB%8C%D8%AA-%D8%B4%D8%AE%D8%B5%DB%8C",
        destination: "/website/t~personal",
        permanent: true,
      },
      {
        source: "/24184",
        destination: "/website/t~personal",
        permanent: true,
      },
      {
        source:
          "/345-%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%B3%D8%A7%DB%8C%D8%AA-%D9%81%D8%B1%D9%88%D8%B4%DA%AF%D8%A7%D9%87%DB%8C",
        destination: "/shopping",
        permanent: true,
      },
      {
        source: "/345",
        destination: "/shopping",
        permanent: true,
      },

      {
        source:
          "/23879-%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%B3%D8%A7%DB%8C%D8%AA-%D8%B4%D8%B1%DA%A9%D8%AA%DB%8C",
        destination: "/website/t~corporate",
        permanent: true,
      },
      {
        source: "/23879",
        destination: "/website/t~corporate",
        permanent: true,
      },
      {
        source: "/3216-%D8%B7%D8%B1%D8%A7%D8%AD%DB%8C-%D8%B3%D8%A7%DB%8C%D8%AA",
        destination: "/",
        permanent: true,
        basePath: false,
      },
      {
        source: "/3216",
        destination: "/",
        permanent: true,
      },
      ...redirects.map((_redirect) => ({
        source: _redirect,
        destination: "/",
        permanent: true,
      })),
    ];
  },
});
