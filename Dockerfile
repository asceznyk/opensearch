FROM python:3.10-slim

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY ./toycomplete/ ./
COPY ./rplsh ./rplsh

RUN apt-get update
RUN apt-get install -y gnupg lsb-release wget

RUN lsb_release -c -s > /tmp/lsb_release
RUN GCSFUSE_REPO=$(cat /tmp/lsb_release); echo "deb http://packages.cloud.google.com/apt gcsfuse-$GCSFUSE_REPO main" | tee /etc/apt/sources.list.d/gcsfuse.list
RUN wget -O - https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

RUN apt-get update
RUN apt-get install -y fuse
RUN apt-get install -y gcsfuse
#RUN usermod -a -G fuse $USER

RUN mkdir ./ext_storage
RUN gcsfuse --implicit-dirs vector_spaces ./ext_storage/

ENV PORT=5000

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 micro:app


