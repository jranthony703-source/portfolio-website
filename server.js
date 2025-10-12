const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Middleware
// ==========================================

// Parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Custom logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ==========================================
// Routes
// ==========================================

// Home route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Contact form submission route
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all fields.'
        });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    // Log the contact form submission (In production, you'd send an email or save to database)
    console.log('\n=================================');
    console.log('NEW CONTACT FORM SUBMISSION');
    console.log('=================================');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('=================================\n');

    // TODO: In production, implement email sending using nodemailer or similar
    // Example:
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //     from: email,
    //     to: 'your-email@example.com',
    //     subject: `Portfolio Contact from ${name}`,
    //     text: message
    // });

    // Send success response
    res.json({
        success: true,
        message: 'Thank you for reaching out! I\'ll get back to you soon.'
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API info route
app.get('/api', (req, res) => {
    res.json({
        name: 'Antonio Michael Portfolio API',
        version: '1.0.0',
        endpoints: {
            'GET /': 'Home page',
            'POST /contact': 'Contact form submission',
            'GET /health': 'Health check',
            'GET /api': 'API information'
        }
    });
});

// ==========================================
// Error Handling
// ==========================================

// 404 handler - must be after all other routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong on the server.',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ==========================================
// Server Startup
// ==========================================

app.listen(PORT, () => {
    console.log('\n=================================');
    console.log('   ANTONIO MICHAEL PORTFOLIO');
    console.log('=================================');
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Local: http://localhost:${PORT}`);
    console.log(`📧 Contact form endpoint: POST /contact`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
    console.log('=================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    app.close(() => {
        console.log('HTTP server closed');
    });
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    process.exit(0);
});

module.exports = app;
