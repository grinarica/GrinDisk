#!/bin/bash

# Exit immediately if a command fails
set -e

# Start DB
echo "Starting MongoDB..."
sudo systemctl start mongod

# Start Backend
cd backend
echo "Starting backend..."
npm run dev &
BACKEND_PID=$!

# Start Frontend
cd ../frontend
echo "Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
