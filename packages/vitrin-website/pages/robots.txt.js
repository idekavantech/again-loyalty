import { Component } from "react";

export default class Robots extends Component {
  static getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/plain");
    res.write(`user-agent: *

    allow: /
    
    disallow: /login
    disallow: /profile
    disallow: /admin
    disallow: /posts/
    disallow: /pwa/
    disallow: /wallet/
    disallow: /s/
    disallow: /feed
    disallow: *gclid*
    
    Sitemap: https://vitrin.me/sitemap.xml`);
    res.end();
  }
}
