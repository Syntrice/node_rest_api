import crypto from 'crypto';

const SALT_SIZE = 32;
const HASH_SIZE = 64;
const ITERATIONS = 100000;
const SESSION_TOKEN_SIZE = 32;

export const generateSalt = () => crypto.randomBytes(SALT_SIZE).toString('base64');

export const hashPassword = (salt: string, password: string) => {
    return crypto.pbkdf2Sync(password, salt, ITERATIONS, HASH_SIZE, 'sha512').toString('hex')
}

export const generateSessionToken = () => {
    return crypto.randomBytes(SESSION_TOKEN_SIZE).toString('hex');
}

export const validatePassword = (password: string, salt: string, hash: string) => {
    return hashPassword(salt, password) === hash;
} 