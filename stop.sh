#!/bin/bash

PROJECT_ROOT=$(pwd)
BACKEND_PID_FILE="$PROJECT_ROOT/.backend.pid"
FRONTEND_PID_FILE="$PROJECT_ROOT/.frontend.pid"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "Stopping PhishGuard AI..."

# Stop Backend
if [ -f "$BACKEND_PID_FILE" ]; then
    BACKEND_PID=$(cat "$BACKEND_PID_FILE")
    if ps -p $BACKEND_PID > /dev/null; then
        echo "Stopping Backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        echo -e "${GREEN}Backend stopped.${NC}"
    else
        echo -e "${RED}Backend process (PID: $BACKEND_PID) not found. It may have already stopped.${NC}"
    fi
    rm "$BACKEND_PID_FILE"
else
    echo -e "${RED}Backend PID file not found. Skipping.${NC}"
fi

# Stop Frontend
if [ -f "$FRONTEND_PID_FILE" ]; then
    FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
    # Because 'npm run dev' spawns a node process, it's safer to kill the process group or use pkill on vite
    if ps -p $FRONTEND_PID > /dev/null; then
        echo "Stopping Frontend (PID: $FRONTEND_PID)..."
        # Kill the npm run process and all its children (vite)
        pkill -P $FRONTEND_PID
        kill $FRONTEND_PID
        echo -e "${GREEN}Frontend stopped.${NC}"
    else
         echo -e "${RED}Frontend process (PID: $FRONTEND_PID) not found. It may have already stopped.${NC}"
    fi
    rm "$FRONTEND_PID_FILE"
else
    # Fallback to kill any rogue vite instances just in case
    if pgrep -f "vite" > /dev/null; then
        echo "Killing rogue vite processes..."
        pkill -f "vite"
        echo -e "${GREEN}Frontend stopped.${NC}"
    else
        echo -e "${RED}Frontend PID file not found and no vite processes running. Skipping.${NC}"
    fi
fi

echo "----------------------------------------------------"
echo -e "${GREEN}✅ PhishGuard has been completely stopped.${NC}"
