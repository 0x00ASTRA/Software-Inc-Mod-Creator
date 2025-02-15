#!/bin/bash

# Set script to exit on error
set -e

# Activate virtual environment
source .venv/bin/activate

# Run the FastAPI app
uvicorn app.main:app --host localhost --port 8000 --reload
