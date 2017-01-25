#!/bin/bash

docker build -f docker/web.dockerfile -t aramys/web-warmuprx .
docker run -d -p 4000:4000 -v /Users/aramys/git/adrianmpt.github.io/shared:/var/www/virtual/warmuprx/shared aramys/web-warmuprx

docker build -f docker/api.dockerfile -t aramys/api-warmuprx .
docker run -d -p 3000:3000 -v /Users/aramys/git/adrianmpt.github.io/shared:/shared aramys/api-warmuprx
