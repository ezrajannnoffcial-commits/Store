import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

interface Session {
  token: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory token store with 7-day expiration
const sessions = new Map<string, Session>();
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function createSession(): string {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  sessions.set(token, {
    token,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  });
  return token;
}

export function validateSession(token?: string): boolean {
  if (!token) return false;
  const session = sessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return false;
  }
  return true;
}

export function revokeSession(token?: string): void {
  if (token) {
    sessions.delete(token);
  }
}

export function requireAdminAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : (req.headers['x-admin-token'] as string | undefined);

  if (!validateSession(token)) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'សូមចូលគណនី Admin ដើម្បីបន្ត (Please log in as Admin)',
    });
    return;
  }

  next();
}
