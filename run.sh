#!/bin/bash

# Set script to exit on error
set -e

if [ ! -d ".venv" ]; then
    echo "Virtual environment not found. Running setup.sh..."
    bash setup.sh
fi

# Activate virtual environment
source .venv/bin/activate

# Run the FastAPI app
uvicorn app.main:app --host localhost --port 8000 --reload
