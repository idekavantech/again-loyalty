const path = require("path");
const packageJSON = require("./package.json");
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
  it.includes("@saas/")
);

const { withSentryConfig } = require("@sentry/nextjs");

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled:
    process.env.ANALYZE === "true" && process.env.NODE_ENV === "production",
});
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const plugins = [[withBundleAnalyzer]];
const moduleExports = plugins.reduce(
  (acc, [plugin, pluginOptions]) => plugin(acc, pluginOptions),
  {
    transpilePackages: [
      "react-leaflet",
      "@react-leaflet/core",
      ...transpiledPackages,
    ],
    publicRuntimeConfig: {
      jwt_key: process.env.jwt_key,
    },
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
    images: {
      domains: [
        "hyper-s3.behtarino.com",
        "hongo.themezaa.com",
        "hongo.b-cdn.net",
        "hs3-cf.behtarino.com",
        "behtarino.hs3.ir",
        "hs3-cdn-saas.behtarino.com",
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack(config, { webpack }) {
      config.module.rules.push({
        test: /\.svg$/,
        issuer: {
          and: ["/.(js|ts)x?$/"],
        },
        use: ["@svgr/webpack"],
      });

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.jwt_key": JSON.stringify(process.env.jwt_key),
        })
      );
      config.plugins.push(new DuplicatePackageCheckerPlugin());

      return config;
    },
    async redirects() {
      return [
        { source: "/", destination: "/login", permanent: false },
        {
          source: "/admin/:site_domain/s/settings/records",
          destination: "/admin/:site_domain/s/settings/courier-records",
          permanent: true,
        },
        {
          source: "/admin/:site_domain/setting/menu/:slug*",
          destination: "/admin/:site_domain/appearance/menu/:slug*",
          permanent: true,
        },
        {
          source: "/admin/:site_domain/setting/theme/:slug*",
          destination: "/admin/:site_domain/appearance/theme/:slug*",
          permanent: true,
        },
        {
          source: "/admin/:site_domain/setting/pages/:slug*",
          destination: "/admin/:site_domain/appearance/pages/:slug*",
          permanent: true,
        },
        {
          source: "/admin/:site_domain/pagebuilder/:slug*",
          destination: "/admin/:site_domain/appearance/pages/:slug*",
          permanent: true,
        },
        {
          source:
            "/admin/:site_domain/branches/:branch_domain/setting/menu/:slug*",
          destination:
            "/admin/:site_domain/branches/:branch_domain/appearance/menu/:slug*",
          permanent: true,
        },
        {
          source:
            "/admin/:site_domain/branches/:branch_domain/setting/theme/:slug*",
          destination:
            "/admin/:site_domain/branches/:branch_domain/appearance/theme/:slug*",
          permanent: true,
        },
        {
          source:
            "/admin/:site_domain/branches/:branch_domain/setting/pages/:slug*",
          destination:
            "/admin/:site_domain/branches/:branch_domain/appearance/pages/:slug*",
          permanent: true,
        },
        {
          source:
            "/admin/:site_domain/branches/:branch_domain/pagebuilder/:slug*",
          destination:
            "/admin/:site_domain/branches/:branch_domain/appearance/pages/:slug*",
          permanent: true,
        },
      ];
    },
  }
);
module.exports = moduleExports;
// module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
