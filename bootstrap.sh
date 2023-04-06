# it should be just used in bash terminal

# for cleaning node_modules in packages
lerna clean --yes
# for cleaning node_modules in root of the repo
rm -rvf node_modules
# for cleaning .next folders packages apps
rm -rvf ./packages/panel/.next
rm -rvf ./packages/vitrin-website/.next
rm -rvf ./packages/webapp/.next
# for skipping download and install chromium in linux and macOS
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true 
# for skipping download and install chromium in windows
set PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
# for installing all the packages
lerna bootstrap -- --force