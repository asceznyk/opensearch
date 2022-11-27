FROM python:3.10-slim

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY ./toycomplete/* ./
RUN mkdir rplsh
ADD ./rplsh/* ./rplsh

ENV PORT=5000

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 "home:main('config_micro.json')"


