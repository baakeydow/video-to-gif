#!/usr/bin/env bash

# Clean env
docker rmi -f video-svc:latest &>/dev/null || true
docker stop runningVideoSvc &>/dev/null || true

# Build fresh Image
docker build --no-cache --pull -t video-svc:latest .

# Run Container
docker run \
-p 9999:9999 \
-d --rm --name runningVideoSvc video-svc

docker logs -f runningVideoSvc