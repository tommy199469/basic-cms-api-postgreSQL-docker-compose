# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app with static export
RUN yarn build

# Install "serve" to serve the static files
RUN yarn global add serve

# Expose the port the app will run on
EXPOSE 3000

# Start the static file server using serve
CMD ["serve", "-s", "out", "-l", "3000"]
