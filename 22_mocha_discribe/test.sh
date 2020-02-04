#!/usr/bin/env bash

path='src';

if [ -n "$1" ]; then
    path="$1";
fi

if [ -d "$path" ]; then
    for filePath in $(find ./$path -regex '.+\.test\.js$'); do
        ./node_modules/.bin/mocha $filePath
    done
else
    echo "\"$path\" is not found"
fi