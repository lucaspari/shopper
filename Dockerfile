FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

ENV DATABASE_URL="mysql://root:root@mysql-database:3306/shopper"

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
