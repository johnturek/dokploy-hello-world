FROM node:24-alpine
WORKDIR /app
ARG GIT_SHA=unknown
COPY package.json ./
COPY src ./src
ENV NODE_ENV=production PORT=3000 GIT_SHA=$GIT_SHA
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health || exit 1
USER node
CMD ["node", "src/server.js"]
