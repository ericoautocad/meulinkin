FROM node:12.15.0  
   
RUN mkdir –m777 -p /usr/src/app  
RUN npm install nodemon -g 

# ENV MONGODB_HOST="{MONGODB_HOST}"
# ENV MONGODB_PORT="{MONGODB_PORT}"
# ENV MONGODB_DATABASE="{MONGODB_DATABASE}"
# ENV KEY_AUTH="{KEY_AUTH}"
ENV PORT="8080"
   
WORKDIR /usr/src/app  
COPY ./ ./  
COPY package.json /usr/src/app/package.json  
RUN npm install -g  
   
EXPOSE 8080  
EXPOSE 5858  
   
CMD ["npm", "start"]  