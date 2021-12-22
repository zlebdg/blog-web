FROM alpine:3.13 AS temp
COPY . /
RUN apk add nodejs npm && npm i -g yarn && yarn && yarn build

FROM zlebdg/alpine-yarn-serve:latest
COPY --from=temp /dist/ /dist/
