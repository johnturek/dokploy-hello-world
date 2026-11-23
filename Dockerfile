FROM node:26-alpine@sha256:6bd9ab43c0ec0190ca7b2d193906cb8b7edf6e7f4afa43ddeccd6452710bffb5
LABEL org.opencontainers.image.source="https://github.com/johnturek/dokploy-hello-world"
LABEL org.opencontainers.image.description="Secure Dokploy CI/CD reference application"
WORKDIR /app
ARG GIT_SHA=unknown
COPY package.json ./
COPY src ./src
# The runtime has no dependencies or package-manager need. Removing npm also
# removes its bundled transitive packages from the production attack surface.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
ENV NODE_ENV=production PORT=3000 GIT_SHA=$GIT_SHA
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD ["wget", "-qO-", "http://127.0.0.1:3000/health"]
USER node
CMD ["node", "src/server.js"]
