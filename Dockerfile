FROM node:20.6.1-alpine3.18 AS build

# Set working directory
WORKDIR /voiesbordelaises

# Install dependencies
ADD package.json .
ADD yarn.lock .
RUN yarn install

# Add source code
ADD . .

# Build the pages
RUN npm run build

# Configure Nitro server
ENV NITRO_PORT 80

# Start Nitro server
CMD ["node", ".output/server/index.mjs"]
