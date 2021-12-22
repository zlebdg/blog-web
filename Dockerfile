FROM zlebdg/alpine-yarn-serve:latest as temp
COPY . /
RUN yarn && yarn build

FROM zlebdg/alpine-yarn-serve:latest
COPY --from=temp /dist/ /dist/
