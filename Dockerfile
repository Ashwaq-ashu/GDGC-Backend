FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat dumb-init

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

EXPOSE 3000

CMD ["dumb-init", "node", "src/index.js"]
