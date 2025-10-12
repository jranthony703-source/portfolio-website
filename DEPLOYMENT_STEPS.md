# 🌍 Deploy Your Portfolio to a Domain

## Quick Options (Easiest to Hardest)

### 🚀 Option 1: Vercel (RECOMMENDED - Free & Easiest)
**Time: 5 minutes | Cost: FREE | Domain: Free subdomain or custom**

#### Step 1: Prepare for Deployment
```bash
cd "/Users/antonyomichael/Desktop/personal web"

# Create vercel.json
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
EOF
```

#### Step 2: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 3: Deploy
```bash
# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Get your live URL (like: antonio-portfolio.vercel.app)
```

#### Step 4: Add Custom Domain (Optional)
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your domain (e.g., antoniomichael.com)
5. Update DNS records as shown

**Your site will be live at: `https://your-project.vercel.app`**

---

### 🔷 Option 2: Netlify (Also Easy & Free)
**Time: 5 minutes | Cost: FREE | Domain: Free subdomain or custom**

#### Method A: Deploy via GitHub

1. **Push to GitHub**
```bash
cd "/Users/antonyomichael/Desktop/personal web"

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

2. **Connect to Netlify**
- Go to https://netlify.com
- Click "Add new site" → "Import an existing project"
- Connect GitHub
- Select your repository
- Build settings:
  - Build command: `npm install`
  - Publish directory: `public`
- Click "Deploy"

3. **Your site will be live at: `https://your-site.netlify.app`**

#### Method B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod

# Follow prompts
```

---

### 🟣 Option 3: Heroku (Good for Node.js)
**Time: 10 minutes | Cost: FREE tier available**

#### Step 1: Prepare
```bash
cd "/Users/antonyomichael/Desktop/personal web"

# Heroku needs a Procfile
echo "web: node server.js" > Procfile
```

#### Step 2: Install Heroku CLI
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Or download from: https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 3: Deploy
```bash
# Login
heroku login

# Create app
heroku create antonio-portfolio

# Initialize git if not done
git init
git add .
git commit -m "Deploy to Heroku"

# Deploy
git push heroku main

# Open your site
heroku open
```

**Your site will be live at: `https://antonio-portfolio.herokuapp.com`**

---

### 🟠 Option 4: Custom Domain with Cloudflare Pages
**Time: 10 minutes | Cost: Domain cost only (~$10-15/year)**

#### Step 1: Get a Domain
- Buy from: Namecheap, GoDaddy, or Cloudflare (~$10-15/year)
- Recommended: `antoniomichael.com` or `antoniomichael.dev`

#### Step 2: Setup Cloudflare Pages
1. Go to https://pages.cloudflare.com
2. Create account with Cloudflare
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm install`
   - Output directory: `public`
5. Deploy

#### Step 3: Add Custom Domain
1. In Cloudflare dashboard → "Pages" → Your project
2. Click "Custom domains"
3. Add your domain
4. Cloudflare will auto-configure DNS

**Your site will be live at: `https://yourdomain.com`**

---

### 🔴 Option 5: DigitalOcean / AWS / Your Own Server
**Time: 30-60 minutes | Cost: $5-10/month**

#### Step 1: Create Server (DigitalOcean Droplet)
1. Go to https://digitalocean.com
2. Create Droplet (Ubuntu 22.04)
3. Choose $5/month plan
4. Add SSH key or use password

#### Step 2: Setup Server
```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2
```

#### Step 3: Deploy Your Code
```bash
# On your local machine, upload code
scp -r "/Users/antonyomichael/Desktop/personal web" root@YOUR_SERVER_IP:/var/www/portfolio

# SSH back into server
ssh root@YOUR_SERVER_IP

# Setup application
cd /var/www/portfolio
npm install

# Start with PM2
pm2 start server.js --name antonio-portfolio
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx
```bash
# Create Nginx config
cat > /etc/nginx/sites-available/portfolio << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Step 5: Add SSL Certificate (HTTPS)
```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

#### Step 6: Point Domain to Server
1. Go to your domain registrar (Namecheap, GoDaddy, etc.)
2. Update DNS records:
   - **A Record**: `@` → `YOUR_SERVER_IP`
   - **A Record**: `www` → `YOUR_SERVER_IP`
3. Wait 5-60 minutes for DNS propagation

**Your site will be live at: `https://yourdomain.com`**

---

## 🎯 Which Option Should You Choose?

### Choose **Vercel** if:
- ✅ You want it live in 5 minutes
- ✅ You want FREE hosting
- ✅ You don't have a custom domain (they give you one)
- ✅ **BEST FOR BEGINNERS**

### Choose **Netlify** if:
- ✅ Similar to Vercel
- ✅ You prefer Netlify's interface
- ✅ FREE hosting

### Choose **Heroku** if:
- ✅ You need more backend control
- ✅ You might add databases later

### Choose **Cloudflare Pages** if:
- ✅ You have a custom domain
- ✅ You want best performance
- ✅ You want advanced features

### Choose **Your Own Server** if:
- ✅ You want full control
- ✅ You're comfortable with Linux
- ✅ You might add more services

---

## 🚀 FASTEST Way (Do This Now!)

### Deploy to Vercel in 2 Minutes:

```bash
# 1. Install Vercel
npm install -g vercel

# 2. Go to your project
cd "/Users/antonyomichael/Desktop/personal web"

# 3. Create vercel.json
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
EOF

# 4. Deploy
vercel

# Follow prompts:
# - Login/signup
# - Confirm settings
# - Get your live URL!
```

**BOOM! Your site is live! 🎉**

---

## 📱 After Deployment

### Update Your Links
1. Get your live URL (e.g., `antonio-portfolio.vercel.app`)
2. Share on LinkedIn: "Check out my portfolio at [URL]"
3. Add to resume
4. Update GitHub profile

### Test Your Live Site
- ✅ Test all sections
- ✅ Test contact form
- ✅ Test on mobile
- ✅ Test dark mode
- ✅ Share with friends!

---

## 🔧 Troubleshooting

### Site not loading?
```bash
# Check server logs
vercel logs  # For Vercel
netlify logs  # For Netlify
heroku logs --tail  # For Heroku
```

### Need to update?
```bash
# Make changes, then redeploy
vercel --prod  # Vercel
netlify deploy --prod  # Netlify
git push heroku main  # Heroku
```

---

## 💡 Pro Tips

1. **Custom Domain** - Buy `yourname.com` for ~$12/year
2. **Email** - Setup professional email: `contact@yourname.com`
3. **Analytics** - Add Google Analytics to track visitors
4. **SEO** - Add to Google Search Console
5. **Share** - Add to LinkedIn, resume, email signature

---

## 🎉 Ready to Deploy?

Run this command now:
```bash
npm install -g vercel && cd "/Users/antonyomichael/Desktop/personal web" && vercel
```

Your portfolio will be live in 2 minutes! 🚀

---

Need help? Let me know which option you want and I'll guide you through it step by step!
