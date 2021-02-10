#!/usr/bin/env bash
set -o errexit -o nounset -o xtrace

export $(egrep -v '^#' .env | xargs)

docker run \
    -v $BUILD_PATH:/app/build \
    -v $(pwd):/app \
    --rm \
    atlekbai/react_builder:0.01
