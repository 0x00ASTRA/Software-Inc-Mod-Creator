@echo off
setlocal

:: Activate virtual environment
call .venv\Scripts\activate.bat

:: Run the FastAPI app
uvicorn app.src.app:app --host 127.0.0.1 --port 8000 --reload
