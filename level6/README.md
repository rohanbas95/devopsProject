added docker files 
and docker-compose

docker build -t userservice:1.1 .

docker build -t productservice:1.1 .

docker-compose -f docker-compose.yaml up

make sure to update the mongodb url if using application locally 
also make sure to update the endpoint in index.ts if application locally