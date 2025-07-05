# devopsProject
understanding docker from basic and in level6 we implement it fro our project of level4


# docker commands
1. `docker ps` | `docker ps -a` 
3. `docker pull redis`
4. `docker run redis`
5. `docker run -d redis`
6. `docker images`
7. `docker start f32897c3b1c9`
8. `docker stop f32897c3b1c9`
---
9. `docker run -p6000:6379 -d redis`
10. `docker logs older`
11. `docker run -p6002:6379 -d --name older redis`
12. `docker exec -it afd05d2c05f6 /bin/bash`
---
15. `docker network ls`
16. `docker network create mongo-network`
17. to setup mongo 
```
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=password \
--name mongodb \
--net mongo-network \
mongo
```
18. to setup express
```
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
--net mongo-network \
--name mongo-express \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
mongo-express
```

19. to setup frondend in docker
docker run -d -p 3000:3000 --net mongo-network --name front my-app:1.0 

22. `docker build -t my-prod:1.2 .`

19. to setup frondend in docker
docker run -d -p 3000:3000 --net mongo-network --name front my-app:1.0 

20. `docker-compose -f docker-compose.yaml up -d`
21. `docker-compose -f docker-compose.yaml down`

## demo app - developing with Docker

This demo app shows a simple user profile app set up using 
- index.html with pure js and css styles
- nodejs backend with express module
- mongodb for data storage

All components are docker-based

### With Docker

#### To start the application

Step 1: Create docker network

    docker network create mongo-network 

Step 2: start mongodb 

    docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo    

Step 3: start mongo-express
    
    docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express   

_NOTE: creating docker-network in optional. You can start both containers in a default network. In this case, just emit `--net` flag in `docker run` command_

Step 4: open mongo-express from browser

    http://localhost:8081

Step 5: Start your nodejs application locally - go to `app` directory of project 

    npm install 
    node server.js
    
to run the nodejs application in docker run below 
create image
`docker build -t my-prod:1.2 .`

run container
docker run -d -p 3000:3000 --net mongo-network --name front my-app:1.0 

Step 6: Access you nodejs application UI from browser

    http://localhost:3000

### With Docker Compose

#### To start the application

Step 1: start mongodb and mongo-express

    docker-compose -f docker-compose.yaml up
    
_You can access the mongo-express under localhost:8080 from your browser_
    
    
Step 4: start node server 

    npm install
    node server.js
    
Step 5: access the nodejs application from browser 

    http://localhost:3000

#### To build a docker image from the application

    docker build -t my-app:1.0 .       
    
The dot "." at the end of the command denotes location of the Dockerfile.

very important note is that before creating a docker image of the nodejs application make sure the https://vscode.dev/github/rohanbas95/devopsProject/blob/main/level5/app/server.js#L38-L39 and https://vscode.dev/github/rohanbas95/devopsProject/blob/main/level5/app/server.js#L60-L61 is updated 

also important note make sure the mongodb on local is stopped before using mongodb of docker

