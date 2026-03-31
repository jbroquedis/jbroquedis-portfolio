#!/bin/bash

# JBroquedis Portfolio Deployment Script
# This script builds and prepares the portfolio for deployment

echo "🚀 Building JBroquedis Portfolio..."

# Build the project
npm run build

echo "✅ Build completed!"
echo ""
echo "📁 Deployment files are in the 'dist' folder"
echo ""
echo "🌐 To deploy to jbroquedis.xyz:"
echo "1. Upload all contents of 'dist/' folder to your web server"
echo "2. Point your domain to the uploaded files"
echo "3. Configure SSL certificate for HTTPS"
echo ""
echo "📋 Recommended hosting options:"
echo "   • Vercel: vercel --prod"
echo "   • Netlify: netlify deploy --prod --dir=dist"
echo "   • GitHub Pages: Enable Pages in repository settings"
echo ""
echo "🔗 Your portfolio will be live at: https://jbroquedis.xyz"