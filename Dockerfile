FROM xuqplus2/yarn-serve

COPY ./dist/ /dist/

CMD serve ./dist/
