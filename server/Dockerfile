FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm run build

COPY wait-for-it.sh wait-for-it-sh
RUN chmod +x wait-for-it.sh

ENV NODE_ENV production
ENV TZ=America/Argentina/Mendoza

EXPOSE 8080
CMD [ "node", "dist/index.js" ]
USER node