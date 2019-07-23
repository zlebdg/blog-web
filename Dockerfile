FROM xuqplus2/yarn-serve

COPY ./dist/ /dist/

CMD yarn serve ./dist/
