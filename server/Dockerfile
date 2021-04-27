FROM node:lts-alpine3.12

RUN npm config set unsafe-perm true

# Global dependencies
RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers git make python3 && \
    npm install --quiet node-gyp -g

# App dependencies
WORKDIR /app
COPY package.json ./

RUN npm --allow-root install

# Remove unneeded dependencies
RUN apk del native-deps

# Build assets
COPY . ./

# Compile codes to dist
RUN npm run build

# run app
CMD npm run serve