@echo off
setlocal

:: Check if virtual environment exists
if not exist .venv (
    echo Virtual environment not found. Running setup.bat...
    call setup.bat
)

:: Activate virtual environment
call .venv\Scripts\activate.bat

:: Run the FastAPI app
uvicorn app.src.app:app --host 127.0.0.1 --port 8000 --reload
