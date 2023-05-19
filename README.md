# Karira Backend 

How to start:
- Install docker on your machine
- Run 'docker-compose up -d' on root folder
- change to server directory
- install all packages with 'npm install'
- Run serer with 'npm run dev'

How to set database
- npm run migrate
- npm run generate

How to insert dummy data
- Open localhost:8080 and login  with username 'root' and password from docker.env
- Open SQL tab

How to open database in interactive mode
- npm run studio
- open localhost:5555

How to make changes to database
- Edit src/prisma/schema.prisma
- npm run migrate
- npm run generate