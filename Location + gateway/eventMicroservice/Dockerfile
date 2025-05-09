# Docker file for event microservice
FROM python:3.13.3-alpine

# Set the working directory
WORKDIR /app

# install Curl
RUN apk add --no-cache curl

# Copy our app's code
COPY . .

# Install our python libraries and dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Port the microservice runs on
EXPOSE 3000

# Start the FastAPI app using Uvicorn on the correct host and port
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]