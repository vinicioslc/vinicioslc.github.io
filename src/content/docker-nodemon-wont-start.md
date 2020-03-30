---
title: Docker compose "develop enviroment" wont start with nodemon
author: Vinicios
date: '2020-01-25'
draft: false
hero: ./thumb.jpg
path: /posts/docker-compose-nodemon
lang: EN
excerpt: >-
  Runing nodemon in docker volume and app wont start ? this could be caused by
  dependencies from external machine.
tags:
  - Tips
  - Docker
  - CI
---

If you are using different host architecture and using docker as develop enviroment for nodejs you will need create some docker compose like this, some peoples forget if you mount current directory after build docker image the container will mount the **node_modules** from outside container over the container **node_modules** folder this will cause your node app run with outside container dependencies, and if you are using dependencies that need architecture specific non js pure modules, like `sharp` your app will run incorrectly, to fix this we need put the node_modules ignored by the volume with this simple line in docker compose.

```yml
# docker-compose.dev.yml

version: "3"

services:
  example-service:
    build: .
    volumes:
      - .:/usr/src/app
      # current folder mounted inside container
      - /usr/src/app/node_modules
      # folder to be ignored by docker volume
      # this are equivalent to say mount node_modules in own node_modules
    ports:
      - 3000:3000
    command: npm start
```

Now your app will start without problems, if this are the cause of your problem.

\_ End of execution.

Good bye, until next post.
