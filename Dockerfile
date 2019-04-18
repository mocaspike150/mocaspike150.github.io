FROM ruby:alpine

RUN  apk add --no-cache --update --virtual .build_deps make build-base \
  && apk add --no-cache --update make \
  && apk add --no-cache --update vim \
  && apk add --no-cache --update git \
  && apk add --no-cache --update tzdata \
  && gem install github-pages \
  && apk del .build_deps \
  && gem cleanup

ENV TZ=America/New_York

VOLUME ["/site"]
EXPOSE 4000
WORKDIR /site
ENTRYPOINT ["jekyll", "serve", "--drafts", "-w", "--host=0.0.0.0", "--port=8080", "--incremental"]
RUN date
