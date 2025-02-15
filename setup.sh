#!/bin/bash

# Check for Python 3.12+
if ! command -v python3 &> /dev/null || [[ $(python3 -V 2>&1 | awk '{print $2}' | cut -d. -f1,2) < "3.12" ]]; then
    echo "Error: Python 3.12+ is required. Please install it and try again."
    exit 1
fi

# Set up virtual environment
if [ ! -d ".venv" ]; then
    echo "Setting up virtual environment..."
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
pip3 install --upgrade pip
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
else
    echo "Warning: requirements.txt not found. Make sure dependencies are installed manually."
fi

echo "Setup complete! You can now run the application using ./run.sh"
