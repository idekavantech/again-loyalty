function EnamadVerification() {
  return null;
}
EnamadVerification.getInitialProps = async ({ res, isServer }) => {
  if (isServer) {
    return res.writeHead(200, { "Content-Type": "text/plain" }).end("");
  }
  return {};
};

export default EnamadVerification;
