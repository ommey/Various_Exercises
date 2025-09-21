FROM node:20-alpine
WORKDIR /app

# copy manifest(s) and install first to leverage caching
COPY package*.json ./
RUN npm ci || npm install

# now bring in the rest of the source
COPY . .

# build the static assets into /app/dist
RUN npm run build