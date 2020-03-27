#!/usr/bin/dumb-init /bin/bash

cd ${RUNTIME_FOLDER}

rm -rf node_modules

yarn && yarn start