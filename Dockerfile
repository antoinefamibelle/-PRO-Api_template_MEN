FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./

RUN npm install

# add app
COPY . ./

# expose port
EXPOSE 8080

# start app
CMD ["yarn", "dev"]