FROM node:18-alpine

RUN apk add --no-cache bash
# Only copy the package.json file to work directory
COPY package*.json ./
RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm install
RUN npm install prisma -g

# wait-for-it.sh
COPY . .

RUN chmod +x wait-for-it.sh

RUN npx prisma generate

RUN npm run build

# CMD npm run start:prod
CMD ["npm", "run", "start:prod"]


EXPOSE 3000