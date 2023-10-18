FROM node:latest

COPY . .

RUN npm install

RUN ls -al

RUN npm run build

CMD ["npm", "start"]


