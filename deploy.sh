#!/bin/bash

# Antonio Michael Portfolio - Quick Deploy Script
# This script helps you deploy your portfolio to various platforms

echo "========================================"
echo "  🚀 Portfolio Deployment Assistant"
echo "========================================"
echo ""
echo "Choose your deployment platform:"
echo ""
echo "1) Vercel (Recommended - Easiest & Free)"
echo "2) Netlify (Easy & Free)"
echo "3) Heroku (Good for Node.js)"
echo "4) GitHub Pages (Static only)"
echo "5) Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    echo ""
    echo "🔷 Deploying to Vercel..."
    echo ""

    # Check if vercel is installed
    if ! command -v vercel &> /dev/null
    then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi

    echo ""
    echo "🚀 Starting deployment..."
    echo ""
    vercel

    echo ""
    echo "✅ Deployment complete!"
    echo "Your site should be live now!"
    ;;

  2)
    echo ""
    echo "🟢 Deploying to Netlify..."
    echo ""

    # Check if netlify is installed
    if ! command -v netlify &> /dev/null
    then
        echo "📦 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi

    echo ""
    echo "🚀 Starting deployment..."
    echo ""
    netlify deploy --prod

    echo ""
    echo "✅ Deployment complete!"
    echo "Your site should be live now!"
    ;;

  3)
    echo ""
    echo "🟣 Deploying to Heroku..."
    echo ""

    # Check if heroku is installed
    if ! command -v heroku &> /dev/null
    then
        echo "❌ Heroku CLI not found!"
        echo "Please install from: https://devcenter.heroku.com/articles/heroku-cli"
        echo "Or run: brew tap heroku/brew && brew install heroku"
        exit 1
    fi

    # Create Procfile if it doesn't exist
    if [ ! -f "Procfile" ]; then
        echo "web: node server.js" > Procfile
        echo "✅ Created Procfile"
    fi

    # Initialize git if needed
    if [ ! -d ".git" ]; then
        echo "📦 Initializing git repository..."
        git init
        git add .
        git commit -m "Initial commit for Heroku deployment"
    fi

    echo ""
    echo "Please follow these steps:"
    echo "1. Run: heroku login"
    echo "2. Run: heroku create your-portfolio-name"
    echo "3. Run: git push heroku main"
    echo ""
    read -p "Press Enter to open Heroku login..."
    heroku login
    ;;

  4)
    echo ""
    echo "📘 GitHub Pages Deployment"
    echo ""
    echo "For GitHub Pages, you need to:"
    echo "1. Create a repository on GitHub"
    echo "2. Push your code"
    echo "3. Enable GitHub Pages in repository settings"
    echo ""
    echo "Would you like to initialize git and push to GitHub? (y/n)"
    read -p "Choice: " gh_choice

    if [ "$gh_choice" = "y" ]; then
        if [ ! -d ".git" ]; then
            git init
            git add .
            git commit -m "Initial commit"
            echo ""
            echo "Now create a repository on GitHub, then run:"
            echo "git remote add origin https://github.com/YOUR_USERNAME/portfolio.git"
            echo "git branch -M main"
            echo "git push -u origin main"
        else
            echo "Git already initialized!"
            git status
        fi
    fi
    ;;

  5)
    echo "Goodbye! 👋"
    exit 0
    ;;

  *)
    echo "❌ Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
echo "========================================"
echo "  ✨ Deployment Process Complete!"
echo "========================================"
echo ""
echo "🎉 Your portfolio should be live now!"
echo ""
echo "Next steps:"
echo "1. Test your live site"
echo "2. Share the URL on LinkedIn"
echo "3. Add to your resume"
echo "4. Celebrate! 🎊"
echo ""
