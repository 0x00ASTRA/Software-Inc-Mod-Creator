@echo off

:: Check for Python 3.12+
python --version 2>NUL | findstr /R "3\.1[2-9]" >NUL
if %ERRORLEVEL% NEQ 0 (
    echo Error: Python 3.12+ is required. Please install it and try again.
    exit /b 1
)

:: Set up virtual environment
if not exist .venv (
    echo Setting up virtual environment...
    python -m venv .venv
)

:: Activate virtual environment
call .venv\Scripts\activate

:: Install dependencies
if exist requirements.txt (
    pip install -r requirements.txt
) else (
    echo Warning: requirements.txt not found. Make sure dependencies are installed manually.
)

echo Setup complete! You can now run the application using run.bat