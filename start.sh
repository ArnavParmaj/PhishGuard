#!/bin/bash

# Configuration
PROJECT_ROOT=$(pwd)
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
LOG_DIR="$PROJECT_ROOT/logs"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting PhishGuard AI...${NC}"

# Create logs directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Ensure dependencies are installed (optional but good practice)
echo "Checking backend dependencies..."
cd "$BACKEND_DIR"
npm install --silent

echo "Checking frontend dependencies..."
cd "$FRONTEND_DIR"
npm install --silent

# Start Backend
echo -e "Starting backend server on port 3001..."
cd "$BACKEND_DIR"
# Run with nohup to detach it from the shell, saving output to log file
nohup node index.js > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo "$BACKEND_PID" > "$PROJECT_ROOT/.backend.pid"
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"

# Start Frontend
echo "Starting frontend server (Vite)..."
cd "$FRONTEND_DIR"
nohup npm run dev > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo "$FRONTEND_PID" > "$PROJECT_ROOT/.frontend.pid"
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"

echo "----------------------------------------------------"
echo -e "${GREEN}✅ PhishGuard is now running in the background!${NC}"
echo "Frontend URL: http://localhost:5173"
echo "Backend URL:  http://localhost:3001"
echo "Logs are available in the $LOG_DIR directory."
echo -e "${YELLOW}To stop the application, run: ./stop.sh${NC}"
