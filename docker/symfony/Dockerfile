FROM alpine:latest

LABEL maintainer="Skyflow - Franck Diomandé <fkdiomande@gmail.com>"

ARG APPLICATION_NAME=twib
ARG SERVER_NAME=localhost
ARG SERVER_ADMIN=admin@myapp.com
ARG DIRECTORY_INDEX=index.php
ARG DOCUMENT_ROOT=/$APPLICATION_NAME/public
ARG PHP_MODULES="apache2 curl json gd mcrypt \
intl sqlite3 gmp mbstring xml zip \
cli imagick xsl imap pdo pdo_mysql fileinfo \
ctype soap simplexml tokenizer session dom iconv"

ENV APPLICATION_NAME ${APPLICATION_NAME}
ENV SERVER_NAME ${SERVER_NAME}
ENV SERVER_ADMIN ${SERVER_ADMIN}
ENV DIRECTORY_INDEX ${DIRECTORY_INDEX}
ENV DOCUMENT_ROOT ${DOCUMENT_ROOT}

RUN apk add --no-cache apache2 php7
RUN for module in $PHP_MODULES; do apk add --no-cache php7-"$module" ; done

RUN mkdir -p /run/apache2
RUN rm -rf /var/cache/apk/*

ENTRYPOINT ["httpd"]
CMD ["-D", "FOREGROUND"]

