#!/bin/sh
gcsfuse --implicit-dirs vector_spaces ./ext_storage/
gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 micro:app



