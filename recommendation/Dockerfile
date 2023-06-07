FROM node:16
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . ./
# Ini untuk dev only
# RUN rm -r node_modules
# RUN rm -r dist
# RUN npm install
# If you are building your code for production
RUN npm install
# Bundle app source
EXPOSE 8000
CMD [ "npm", "run", "start" ]