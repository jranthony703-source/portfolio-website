# Deployment Guide

This guide covers deployment options for Antonio's portfolio website.

## Prerequisites

- Node.js 14+ installed
- npm or yarn package manager
- Git (for version control)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Production Deployment

### Option 1: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy your site.

### Option 2: Deploy to Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create a new Heroku app:
```bash
heroku create antonio-portfolio
```

3. Deploy:
```bash
git push heroku main
```

### Option 3: Deploy to Netlify

1. Build your static assets (if using build step)
2. Connect your GitHub repository to Netlify
3. Set build command: `npm install`
4. Set publish directory: `public`

### Option 4: Deploy to DigitalOcean/AWS/VPS

1. SSH into your server:
```bash
ssh user@your-server-ip
```

2. Clone the repository:
```bash
git clone https://github.com/antonio-michael/portfolio.git
cd portfolio
```

3. Install dependencies:
```bash
npm install
```

4. Install PM2 (process manager):
```bash
npm install -g pm2
```

5. Start the application:
```bash
pm2 start server.js --name antonio-portfolio
pm2 save
pm2 startup
```

6. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Configure the following variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- Email configuration (if using email notifications)

## SSL Certificate (HTTPS)

### Using Let's Encrypt (Free)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Performance Optimization

1. **Enable Gzip Compression** (in server.js):
```javascript
const compression = require('compression');
app.use(compression());
```

2. **Add Caching Headers**:
```javascript
app.use(express.static('public', {
    maxAge: '1y',
    etag: false
}));
```

3. **Minify Assets**: Use build tools to minify CSS/JS in production

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs antonio-portfolio
```

### Health Check Endpoint
```
GET /health
```

## Troubleshooting

### Port Already in Use
```bash
lsof -ti:3000 | xargs kill -9
```

### Application Won't Start
```bash
pm2 logs antonio-portfolio --err
```

### Check Application Status
```bash
pm2 status
```

## Backup & Updates

### Backup
```bash
git add .
git commit -m "Backup before update"
git push origin main
```

### Update Application
```bash
git pull origin main
npm install
pm2 restart antonio-portfolio
```

## Custom Domain Setup

1. Purchase a domain from a registrar (Namecheap, GoDaddy, etc.)
2. Add DNS records:
   - A Record: `@` → Your server IP
   - CNAME Record: `www` → `yourdomain.com`
3. Wait for DNS propagation (up to 48 hours)

## Contact Form Email Setup (Optional)

To enable email notifications for contact form submissions:

1. Install nodemailer:
```bash
npm install nodemailer
```

2. Update server.js with email configuration
3. Set environment variables for SMTP settings

## Security Best Practices

1. Keep dependencies updated:
```bash
npm audit
npm update
```

2. Use environment variables for sensitive data
3. Enable HTTPS
4. Implement rate limiting for contact form
5. Add CORS protection if needed

## Support

For issues or questions:
- Email: antonio.michael@example.com
- LinkedIn: https://www.linkedin.com/in/antonio-michael
- GitHub: https://github.com/antonio-michael

---

© 2025 Antonio Michael
