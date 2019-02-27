FROM ruby:alpine

RUN  apk add --no-cache --update --virtual .build_deps make build-base \
  && apk add --no-cache --update make \
  && apk add --no-cache --update vim \
  && apk add --no-cache --update git \
  && gem install github-pages \
  && apk del .build_deps \
  && gem cleanup

VOLUME ["/site"]
EXPOSE 4000
WORKDIR /site
ENTRYPOINT ["jekyll", "serve", "--drafts", "-w", "--host=0.0.0.0"]
