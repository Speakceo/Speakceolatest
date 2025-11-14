#!/bin/bash

echo "🚀 SpeakCEO Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo "📊 Checking git status..."

# Show current status
git status

echo ""
echo "🔗 Current remote:"
git remote -v

echo ""
echo "📋 Recent commits:"
git log --oneline -5

echo ""
echo "💡 Manual Deployment Options:"
echo ""
echo "Option 1 - GitHub Web Upload:"
echo "1. Go to: https://github.com/Speakceo/Speakceolatest"
echo "2. Click 'uploading an existing file'"
echo "3. Drag and drop all project files"
echo "4. Commit changes"
echo ""
echo "Option 2 - GitHub CLI Login:"
echo "Run: gh auth login"
echo "Then: git push origin main"
echo ""
echo "Option 3 - Personal Access Token:"
echo "1. Go to GitHub Settings > Developer settings > Personal access tokens"
echo "2. Generate new token with repo permissions"
echo "3. Use token as password when prompted"
echo ""
echo "🎯 All files are ready for deployment!"
