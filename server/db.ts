import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { PRODUCTS as INITIAL_PRODUCTS, Product, Category, ProductBadge, StockStatus } from '../src/data/products';

export interface StoreSettings {
  telegramUsername: string;
  ownerName: string;
  currency: 'USD' | 'KHR';
  khrExchangeRate: number; // e.g. 4100
  storeName: string;
  tagline: string;
  announcement: string;
  passwordHash: string;
  passwordSalt: string;
}

export interface StoredProduct extends Product {
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  settings: StoreSettings;
  products: StoredProduct[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Helper to hash password with PBKDF2
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// Default initial password: "manith2026"
const DEFAULT_SALT = crypto.randomBytes(16).toString('hex');
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'manith2026';
const DEFAULT_HASH = hashPassword(DEFAULT_PASSWORD, DEFAULT_SALT);

const DEFAULT_SETTINGS: StoreSettings = {
  telegramUsername: 'sormmakara',
  ownerName: 'SORM MAKARA',
  currency: 'USD',
  khrExchangeRate: 4100,
  storeName: 'Ma Nith Store',
  tagline: 'គ្រឿងអលង្ការស្អាតៗ សម្រាប់រាល់ថ្ងៃរបស់អ្នក។',
  announcement: '♡ គ្រឿងអលង្ការ Stainless Steel ស្អាតៗ សម្រាប់រាល់ថ្ងៃ · កម្មង់តាម Telegram @sormmakara ♡',
  passwordHash: DEFAULT_HASH,
  passwordSalt: DEFAULT_SALT,
};

let cachedDb: DatabaseSchema | null = null;
let writeQueue = Promise.resolve();

// Ensure DB directory and file exist
async function initDb(): Promise<DatabaseSchema> {
  if (cachedDb) return cachedDb;

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content) as DatabaseSchema;
    cachedDb = parsed;
    return parsed;
  } catch {
    // Seed database with existing products
    const now = new Date().toISOString();
    const seededProducts: StoredProduct[] = INITIAL_PRODUCTS.map((p) => ({
      ...p,
      isHidden: false,
      createdAt: now,
      updatedAt: now,
    }));

    const newDb: DatabaseSchema = {
      settings: DEFAULT_SETTINGS,
      products: seededProducts,
    };

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(newDb, null, 2), 'utf-8');
    cachedDb = newDb;
    return newDb;
  }
}

// Persist database to disk safely
async function saveDb(data: DatabaseSchema): Promise<void> {
  cachedDb = data;
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const tmpFile = `${DB_FILE}.tmp.${Date.now()}`;
    await fs.writeFile(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tmpFile, DB_FILE);
  });
  return writeQueue;
}

export async function getProducts(includeHidden = false): Promise<StoredProduct[]> {
  const db = await initDb();
  if (includeHidden) {
    return db.products;
  }
  return db.products.filter((p) => !p.isHidden);
}

export async function getProductById(id: string): Promise<StoredProduct | null> {
  const db = await initDb();
  return db.products.find((p) => p.id === id) || null;
}

export async function createProduct(input: Omit<StoredProduct, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<StoredProduct> {
  const db = await initDb();
  const now = new Date().toISOString();
  
  // Create slug ID from name or random hex
  const baseSlug = input.name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 30);
  const id = input.id || `${baseSlug || 'product'}-${Date.now().toString(36)}`;

  const newProduct: StoredProduct = {
    ...input,
    id,
    isHidden: Boolean(input.isHidden),
    createdAt: now,
    updatedAt: now,
  };

  db.products.unshift(newProduct);
  await saveDb(db);
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<StoredProduct>): Promise<StoredProduct | null> {
  const db = await initDb();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = db.products[index];
  const updated: StoredProduct = {
    ...existing,
    ...updates,
    id: existing.id, // prevent changing id
    updatedAt: new Date().toISOString(),
  };

  db.products[index] = updated;
  await saveDb(db);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await initDb();
  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);
  if (db.products.length !== initialLength) {
    await saveDb(db);
    return true;
  }
  return false;
}

export async function getSettings(): Promise<Omit<StoreSettings, 'passwordHash' | 'passwordSalt'>> {
  const db = await initDb();
  const { passwordHash, passwordSalt, ...publicSettings } = db.settings;
  return publicSettings;
}

export async function updateSettings(updates: Partial<Omit<StoreSettings, 'passwordHash' | 'passwordSalt'>>): Promise<Omit<StoreSettings, 'passwordHash' | 'passwordSalt'>> {
  const db = await initDb();
  db.settings = {
    ...db.settings,
    ...updates,
  };
  await saveDb(db);
  const { passwordHash, passwordSalt, ...publicSettings } = db.settings;
  return publicSettings;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const db = await initDb();
  const hash = hashPassword(password, db.settings.passwordSalt);
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(db.settings.passwordHash));
}

export async function updateAdminPassword(oldPassword: string, newPassword: string): Promise<boolean> {
  const isValid = await verifyAdminPassword(oldPassword);
  if (!isValid) return false;

  const db = await initDb();
  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHash = hashPassword(newPassword, newSalt);

  db.settings.passwordSalt = newSalt;
  db.settings.passwordHash = newHash;
  await saveDb(db);
  return true;
}
