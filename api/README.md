# run postgrel in docker

docker run --name financial-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
