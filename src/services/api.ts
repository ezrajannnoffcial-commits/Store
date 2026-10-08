import { Product } from '../data/products';

export interface StoreSettings {
  telegramUsername: string;
  ownerName: string;
  currency: 'USD' | 'KHR';
  khrExchangeRate: number;
  storeName: string;
  tagline: string;
  announcement: string;
}

export interface AdminProduct extends Product {
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

const TOKEN_KEY = 'manith_admin_token';

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string | null): void {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ----------------------------------------------------
// Public API Calls
// ----------------------------------------------------

export async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn('API fetch products error, fallback to initial data:', err);
    throw err;
  }
}

export async function fetchSettings(): Promise<StoreSettings> {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    console.warn('API fetch settings error:', err);
    return {
      telegramUsername: 'sormmakara',
      ownerName: 'SORM MAKARA',
      currency: 'USD',
      khrExchangeRate: 4100,
      storeName: 'Ma Nith Store',
      tagline: 'គ្រឿងអលង្ការស្អាតៗ សម្រាប់រាល់ថ្ងៃរបស់អ្នក។',
      announcement: '♡ គ្រឿងអលង្ការ Stainless Steel ស្អាតៗ សម្រាប់រាល់ថ្ងៃ · កម្មង់តាម Telegram @sormmakara ♡',
    };
  }
}

// ----------------------------------------------------
// Admin Auth API Calls
// ----------------------------------------------------

export async function adminLogin(password: string): Promise<{ success: boolean; settings?: StoreSettings; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (res.ok && data.token) {
      setAdminToken(data.token);
      return { success: true, settings: data.settings };
    }
    return { success: false, error: data.message || data.error || 'Login failed' };
  } catch (err) {
    return { success: false, error: 'Network error connecting to admin server' };
  }
}

export async function checkAdminAuth(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/auth/me', {
      headers: getAuthHeaders(),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function adminLogout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  } catch {
    // ignore
  } finally {
    setAdminToken(null);
  }
}

// ----------------------------------------------------
// Admin Products Management API Calls
// ----------------------------------------------------

export async function adminFetchProducts(): Promise<AdminProduct[]> {
  const res = await fetch('/api/admin/products', {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Unauthorized or failed to fetch admin products');
  return await res.json();
}

export async function adminCreateProduct(productData: Partial<AdminProduct>): Promise<AdminProduct> {
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(productData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create product');
  }
  return await res.json();
}

export async function adminUpdateProduct(id: string, updates: Partial<AdminProduct>): Promise<AdminProduct> {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update product');
  }
  return await res.json();
}

export async function adminDeleteProduct(id: string): Promise<void> {
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to delete product');
  }
}

export async function adminUploadImage(file: File): Promise<string> {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to upload image');
  }

  const data = await res.json();
  return data.url;
}

// ----------------------------------------------------
// Admin Settings API Calls
// ----------------------------------------------------

export async function adminUpdateSettings(settingsData: Partial<StoreSettings>): Promise<StoreSettings> {
  const res = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(settingsData),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update settings');
  }
  return await res.json();
}

export async function adminChangePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || data.error || 'Failed to change password' };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: 'Network error changing password' };
  }
}
