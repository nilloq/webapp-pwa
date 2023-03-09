FROM node:18-alpine3.17

RUN mkdir -p /webapp
WORKDIR /webapp/.output
COPY ../.output .

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", "/webapp/.output/server/index.mjs"]