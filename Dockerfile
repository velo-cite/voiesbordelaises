###############
# Build stage #
###############

FROM node:20.6.1-alpine3.18 AS build

# Set working directory
WORKDIR /voiesbordelaises

# Install dependencies
ADD package.json .
ADD package-lock.json .
RUN npm install

# Add source code
ADD . .

# Build the pages
RUN npm run generate

####################
# Web server stage #
####################

FROM nginx:1.27.3-alpine

COPY --from=build /voiesbordelaises/dist /usr/share/nginx/html
