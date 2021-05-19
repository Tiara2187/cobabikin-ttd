# Create image based off of the official Node 6 image
FROM node:14

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new dir
WORKDIR /app

# Copy dependency definitions
COPY package.json /app

# Install dependecies
RUN npm install npm@7

# Get all the code needed to run the app
COPY . /app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm" , "dev-ts"]
