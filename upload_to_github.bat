@echo off
setlocal enabledelayedexpansion
title GitHub Upload Script - Sektor/insanmiy Portfolio
color 0A

echo ===========================================
echo  GitHub Upload Script - Sektor/insanmiy Portfolio
echo ===========================================
echo .

:: Check if Git is installed
where git >nul 2>nul
if !ERRORLEVEL! NEQ 0 (
    echo Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

:: Initialize Git repository if it doesn't exist
if not exist ".git" (
    echo Initializing new Git repository...
    git init
    
    echo Creating .gitignore file...
    echo .DS_Store > .gitignore
    echo .vscode/ >> .gitignore
    echo node_modules/ >> .gitignore
    echo upload_to_github.bat >> .gitignore
)

:: Add and commit changes
echo Adding files to Git...
git add .

set /p commit_msg=Enter commit message (or press Enter for default): 
if "!commit_msg!"=="" set commit_msg="Update files"

git commit -m !commit_msg!

:: Check for existing remote origin
git remote -v | findstr /C:"origin" >nul
set remote_exists=!ERRORLEVEL!

if !remote_exists! EQU 1 (
    echo.
    echo No remote repository configured.
    echo.
    echo Please follow these steps:
    echo 1. Create a new repository on GitHub (https://github.com/new)
    echo 2. Copy the repository URL (e.g., https://github.com/username/repository.git)
    echo.
    set /p repo_url=Enter your GitHub repository URL: 
    
    if "!repo_url!"=="" (
        echo No URL provided. Exiting...
        pause
        exit /b 1
    )
    
    git remote add origin !repo_url!
    echo Remote 'origin' added.
)

:: Push to GitHub
echo.
echo Pushing to GitHub...
git push -u origin master

if !ERRORLEVEL! NEQ 0 (
    echo.
    echo ===========================================
    echo  Error: Could not push to main branch.
    echo  Trying to create and push to main branch...
    echo ===========================================
    
    git branch -M master
    git push -u origin master
    
    if !ERRORLEVEL! NEQ 0 (
        echo.
        echo ===========================================
        echo  Still having issues? Try these steps:
        echo  1. Check your internet connection
        echo  2. Verify your GitHub credentials
        echo  3. Make sure the repository exists and you have access
        echo  4. Make sure you have write permissions to the repository
        echo ===========================================
    ) else (
        echo.
        echo ===========================================
        echo  Successfully uploaded to GitHub!
        echo ===========================================
    )
) else (
    echo.
    echo ===========================================
    echo  Successfully uploaded to GitHub!
    echo ===========================================
)

echo.
pause
