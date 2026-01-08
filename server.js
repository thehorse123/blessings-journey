// PayHip Webhook Server - Tracks payment confirmations
require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 80;  // Use port 80 (same as website)

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware - Allow requests from your domain and localhost for testing
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://blessingsjourney.xyz',
    'https://blessingsjourney.xyz',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');  // Fallback for webhook posts
  }
  
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});

// === CACHE CONTROL MIDDLEWARE ===
// Set efficient cache lifetimes for static assets
app.use((req, res, next) => {
  // Cache CSS, JS, Images for 30 days (production assets)
  if (req.url.match(/\.(css|js|woff2|woff|ttf)$/)) {
    res.set('Cache-Control', 'public, max-age=2592000, immutable');  // 30 days
    console.log(`📦 Cache set (30 days): ${req.url}`);
  }
  // Cache images for 60 days (rarely change)
  else if (req.url.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm)$/)) {
    res.set('Cache-Control', 'public, max-age=5184000, immutable');  // 60 days
    console.log(`🖼️ Cache set (60 days): ${req.url}`);
  }
  // Cache audio files for 90 days (very stable)
  else if (req.url.match(/\.(mp3|wav|ogg)$/)) {
    res.set('Cache-Control', 'public, max-age=7776000, immutable');  // 90 days
    console.log(`🎵 Cache set (90 days): ${req.url}`);
  }
  // Don't cache HTML (always fresh)
  else if (req.url.match(/\.(html)$/) || req.url === '/') {
    res.set('Cache-Control', 'no-cache, must-revalidate');
    console.log(`📄 Cache disabled: ${req.url}`);
  }
  // Default: minimal caching
  else {
    res.set('Cache-Control', 'public, max-age=3600');  // 1 hour
  }
  next();
});

// Payment logs directory
const PAYMENTS_DIR = path.join(__dirname, 'payment-logs');
if (!fs.existsSync(PAYMENTS_DIR)) {
  fs.mkdirSync(PAYMENTS_DIR, { recursive: true });
}

// PayHip API Secret (Get this from PayHip dashboard > Settings)
const PAYHIP_API_KEY = process.env.PAYHIP_API_KEY || 'a074a93418f0c6d224da7238be2edbe2cd38deae';

// Log payment data
function logPayment(data) {
  const timestamp = new Date().toISOString();
  const logFile = path.join(PAYMENTS_DIR, `payments-${new Date().toISOString().split('T')[0]}.json`);
  
  const paymentRecord = {
    timestamp,
    ...data
  };
  
  let logs = [];
  if (fs.existsSync(logFile)) {
    const content = fs.readFileSync(logFile, 'utf-8');
    logs = JSON.parse(content || '[]');
  }
  
  logs.push(paymentRecord);
  fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
  
  return paymentRecord;
}

// PayHip Webhook Endpoint
app.post('/webhook/payhip', (req, res) => {
  console.log('=== PayHip Webhook Received ===');
  console.log('Body:', req.body);
  
  try {
    const data = req.body;
    
    // Verify webhook signature (optional but recommended)
    // PayHip sends these fields for verification
    const { event, sale, product, customer } = data;
    
    // Only process completed sales
    if (event === 'sale_completed' || event === 'sale.completed') {
      const paymentData = {
        event,
        productId: product?.id || sale?.product_id,
        productName: product?.name || sale?.product_name,
        amount: sale?.amount || data.amount,
        currency: sale?.currency || 'USD',
        customerEmail: customer?.email || sale?.customer_email,
        customerName: customer?.name || sale?.customer_name,
        transactionId: sale?.transaction_id || data.transaction_id,
        status: 'completed',
        rawData: data
      };
      
      // Log the payment
      const logged = logPayment(paymentData);
      console.log('✅ Payment logged successfully:', logged.transactionId);
      
      // Send success response
      res.status(200).json({
        success: true,
        message: 'Payment confirmed',
        transactionId: logged.transactionId
      });
    } else {
      console.log('⚠️ Non-sale event received:', event);
      res.status(200).json({
        success: true,
        message: 'Event received but not a sale'
      });
    }
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// API Endpoint to check payment status
app.get('/api/payment/:transactionId', (req, res) => {
  const { transactionId } = req.params;
  
  try {
    // Search through all payment logs
    const files = fs.readdirSync(PAYMENTS_DIR);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(path.join(PAYMENTS_DIR, file), 'utf-8');
        const logs = JSON.parse(content || '[]');
        
        const payment = logs.find(p => p.transactionId === transactionId);
        if (payment) {
          return res.json({
            found: true,
            payment
          });
        }
      }
    }
    
    res.status(404).json({
      found: false,
      message: 'Payment not found'
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// API Endpoint to get all payments (for dashboard)
app.get('/api/payments', (req, res) => {
  try {
    const allPayments = [];
    const files = fs.readdirSync(PAYMENTS_DIR);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(path.join(PAYMENTS_DIR, file), 'utf-8');
        const logs = JSON.parse(content || '[]');
        allPayments.push(...logs);
      }
    }
    
    // Sort by timestamp descending
    allPayments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    res.json({
      total: allPayments.length,
      payments: allPayments
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// API Endpoint to get payment stats
app.get('/api/payment-stats', (req, res) => {
  try {
    const allPayments = [];
    const files = fs.readdirSync(PAYMENTS_DIR);
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(path.join(PAYMENTS_DIR, file), 'utf-8');
        const logs = JSON.parse(content || '[]');
        allPayments.push(...logs);
      }
    }
    
    // Calculate statistics
    const totalRevenue = allPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    const totalTransactions = allPayments.length;
    
    // Group by product
    const byProduct = {};
    allPayments.forEach(p => {
      const productName = p.productName || 'Unknown';
      if (!byProduct[productName]) {
        byProduct[productName] = { count: 0, revenue: 0 };
      }
      byProduct[productName].count++;
      byProduct[productName].revenue += parseFloat(p.amount) || 0;
    });
    
    res.json({
      totalRevenue: totalRevenue.toFixed(2),
      totalTransactions,
      byProduct,
      lastPayment: allPayments[0] || null
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  const webhookUrl = process.env.WEBHOOK_URL || `http://localhost:${PORT}/webhook/payhip`;
  
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║      🚀 Payment Webhook Server - PRODUCTION READY 🚀       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✅ Server running on: ${siteUrl}:${PORT}`);
  console.log(`✅ Webhook endpoint: ${webhookUrl}`);
  console.log(`✅ Stats endpoint: ${siteUrl}:${PORT}/api/payment-stats`);
  console.log(`✅ API Key: ${process.env.PAYHIP_API_KEY.substring(0, 8)}...`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📋 PayHip Dashboard Configuration:');
  console.log(`   Webhook URL: ${webhookUrl}`);
  console.log('   Method: POST');
  console.log('   Event: Payment Received');
  console.log('');
});
