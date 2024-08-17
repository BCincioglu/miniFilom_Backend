FROM node:20
WORKDIR /miniFilom_Backend
COPY package*.json /miniFilom_Backend/
COPY . /miniFilom_Backend/
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]