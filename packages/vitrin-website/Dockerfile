FROM node:16

ARG NEXT_PUBLIC_NAMESPACE
ENV NEXT_PUBLIC_NAMESPACE=$NEXT_PUBLIC_NAMESPACE

WORKDIR /app/
# Installing dependencies
COPY package*.json /app/
COPY lerna.json /app/
RUN npm -g config set user root
RUN npm install
RUN npm install -g lerna@6.4.1 --unsafe-perm=true --allow-root
COPY . /app/


RUN lerna bootstrap --hoist

# Building app
RUN lerna run build --scope vitrin-website

EXPOSE 3000

# Running the app
CMD [ "lerna","run", "start",  "--scope", "vitrin-website"]