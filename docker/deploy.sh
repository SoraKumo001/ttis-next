#!/usr/bin/bash
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:/$PWD" -w="/$PWD" docker/compose:latest -f docker/docker-compose.yml down
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:/$PWD" -w="/$PWD" docker/compose:latest -f docker/docker-compose.yml up -d --build
