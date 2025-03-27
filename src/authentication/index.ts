import crypto from 'crypto';

const SALT_SIZE = 128;
const HASH_SIZE = 64;
const ITERATIONS = 10000;

export const generateSalt = () => crypto.randomBytes(SALT_SIZE).toString('base64');

export const hashPassword = (salt: string, password: string) => {
    return crypto.pbkdf2Sync(password, salt, ITERATIONS, HASH_SIZE, 'sha512').toString('hex')
}