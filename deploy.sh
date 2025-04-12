#!/bin/bash

# NestJS Docker Deployment Script with Git Pull
# Usage: ./deploy.sh [environment]
# Example: ./deploy.sh development
# Example: ./deploy.sh staging
# Example: ./deploy.sh production

# Default to development environment if not specified
ENVIRONMENT=${1:-development}

# Define color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Set the docker directory path based on environment
DOCKER_DIR="$(pwd)/docker/${ENVIRONMENT}"

# Check if the docker directory exists
if [ ! -d "$DOCKER_DIR" ]; then
  echo -e "${RED}Error: Docker directory for ${ENVIRONMENT} environment not found at:${NC}"
  echo -e "${RED}$DOCKER_DIR${NC}"
  exit 1
fi

# Git operations - pull current branch
echo -e "${YELLOW}Performing git operations...${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
  echo -e "${RED}Error: Git is not installed. Please install git and try again.${NC}"
  exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo -e "${RED}Error: Not a git repository. Please run this script from the root of your git repository.${NC}"
  exit 1
fi

# Get current branch name
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null)
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}Not on a branch (detached HEAD state). Skipping git pull.${NC}"
else
  echo -e "${YELLOW}Current branch: ${CURRENT_BRANCH}${NC}"
  
  # Pull latest changes from current branch
  echo -e "${YELLOW}Pulling latest changes from ${CURRENT_BRANCH}...${NC}"
  git pull origin ${CURRENT_BRANCH}
  
  if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to pull latest changes from '${CURRENT_BRANCH}'.${NC}"
    exit 1
  fi
  
  echo -e "${GREEN}Successfully pulled latest changes.${NC}"
fi

# Navigate to the project root directory
echo -e "${BLUE}Deploying NestJS application to ${ENVIRONMENT} environment...${NC}"

# Build the images
echo -e "${YELLOW}Building Docker images...${NC}"
docker compose -f "$DOCKER_DIR/compose.yaml" build --no-cache

# Stop any running containers from the previous deployment
echo -e "${YELLOW}Stopping any existing containers...${NC}"
docker compose -f "$DOCKER_DIR/compose.yaml" down

# Start the containers in detached mode
echo -e "${YELLOW}Starting the application...${NC}"
docker compose -f "$DOCKER_DIR/compose.yaml" up -d

# Check if the containers are running
if [ $? -eq 0 ]; then
  echo -e "${GREEN}NestJS application deployment completed successfully!${NC}"

  # Display running containers
  echo -e "${BLUE}Running containers:${NC}"
  docker compose -f "$DOCKER_DIR/compose.yaml" ps

  # Get the app container name
  APP_CONTAINER=$(docker compose -f "$DOCKER_DIR/compose.yaml" ps -q app 2>/dev/null)

  if [ -n "$APP_CONTAINER" ]; then
    # Display logs from the app container
    echo -e "${BLUE}Application logs:${NC}"
    docker logs --tail=20 $APP_CONTAINER
  fi

  # Display service endpoints
  echo -e "${GREEN}Service is now running!${NC}"
  echo -e "${GREEN}Deployed from branch: ${CURRENT_BRANCH}${NC}"
else
  echo -e "${RED}Deployment failed. Check the Docker logs for more information.${NC}"
  exit 1
fi