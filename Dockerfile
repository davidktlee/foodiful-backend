FROM node:latest

COPY . .

RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm install

RUN ls -al

RUN npm run build

CMD npm run start:prod


