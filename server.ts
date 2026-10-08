import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSettings,
  updateSettings,
  verifyAdminPassword,
  updateAdminPassword,
} from './server/db';
import { createSession, revokeSession, validateSession, requireAdminAuth } from './server/auth';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Ensure uploads directory exists
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${base || 'image'}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(UPLOADS_DIR));

// ----------------------------------------------------
// Public API Endpoints
// ----------------------------------------------------

// Get store settings (public)
app.get('/api/settings', async (_req: Request, res: Response) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: 'Failed to retrieve settings' });
  }
});

// Get public products (excludes hidden products)
app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await getProducts(false);
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Get single product by id
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product || product.isHidden) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// ----------------------------------------------------
// Admin Authentication Endpoints
// ----------------------------------------------------

// Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if (!password) {
      res.status(400).json({ error: 'Password is required' });
      return;
    }

    const isValid = await verifyAdminPassword(password);
    if (!isValid) {
      res.status(401).json({ error: 'Invalid password', message: 'ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ' });
      return;
    }

    const token = createSession();
    const settings = await getSettings();
    res.json({ success: true, token, settings });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify session
app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string | undefined);

  if (validateSession(token)) {
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
});

// Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string | undefined);

  revokeSession(token);
  res.json({ success: true });
});

// ----------------------------------------------------
// Protected Admin API Endpoints
// ----------------------------------------------------

// Get all products (including hidden)
app.get('/api/admin/products', requireAdminAuth, async (_req: Request, res: Response) => {
  try {
    const products = await getProducts(true);
    res.json(products);
  } catch (error) {
    console.error('Admin get products error:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Create product
app.post('/api/admin/products', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { name, price, category, image } = req.body;
    if (!name || price === undefined || !category || !image) {
      res.status(400).json({ error: 'Missing required product fields (name, price, category, image)' });
      return;
    }

    const product = await createProduct({
      ...req.body,
      price: Number(price) || 0,
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
app.put('/api/admin/products/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(updated);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
app.delete('/api/admin/products/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const success = await deleteProduct(req.params.id);
    if (!success) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Update store settings (Telegram username, owner name, currency, etc.)
app.put('/api/admin/settings', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = await updateSettings(req.body);
    res.json(updated);
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Change admin password
app.post('/api/admin/change-password', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword || newPassword.length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters' });
      return;
    }

    const success = await updateAdminPassword(oldPassword, newPassword);
    if (!success) {
      res.status(400).json({ error: 'Old password is incorrect', message: 'ពាក្យសម្ងាត់ចាស់មិនត្រឹមត្រូវទេ' });
      return;
    }

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Upload image file
app.post('/api/admin/upload', requireAdminAuth, upload.single('image'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No image file uploaded' });
      return;
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl, filename: req.file.filename });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// ----------------------------------------------------
// Frontend Mounting (Vite Middleware in Dev, Static in Prod)
// ----------------------------------------------------

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ma Nith Store Server] Running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
