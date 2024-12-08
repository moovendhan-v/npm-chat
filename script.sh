npx prisma db push
npx prisma generate
npx prisma db pull --force

npx prisma migrate reset


# mongodb://admin:password123@my_mongodb:27017/admin

# docker exec -it my_mongodb mongosh -u admin -p password123 --authenticationDatabase admin

# docker run -d \
#   --name my_mongodb \
#   -p 27017:27017 \
#   -e MONGO_INITDB_ROOT_USERNAME=admin \
#   -e MONGO_INITDB_ROOT_PASSWORD=password123 \
#   -v mongodb_data:/data/db \
#   mongo