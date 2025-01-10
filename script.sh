# npx prisma db push
# npx prisma generate
# npx prisma db pull --force

# npx prisma migrate reset


# # mongodb://admin:password123@my_mongodb:27017/admin

# # docker exec -it my_mongodb_chat mongosh -u admin -p password123 --authenticationDatabase admin

# docker run -d \
#   --name my_mongodb_chat \
#   --restart=always \
#   -p 27017:27017 \
#   -e MONGO_INITDB_ROOT_USERNAME=admin \
#   -e MONGO_INITDB_ROOT_PASSWORD=password123 \
#   -v mongodb_data:/data/db \
#   mongo
  

#!/bin/bash

# Function to generate Swagger from Postman collection
generate_docs() {
  echo "Generating Swagger API documentation from Postman collection..."
  node --experimental-modules convertPostmanToSwagger.js
}

# Function for other tasks (you can expand this as needed)
other_function() {
  echo "Executing other functions..."
}

# Main script execution
case "$1" in
  --docgenerate)
    generate_docs
    ;;
  
  --other)
    other_function
    ;;
  
  # Add more options as needed
  *)
    echo "Usage: $0 {--docgenerate|--other}"
    exit 1
    ;;
esac
