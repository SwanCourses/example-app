import crypto from 'crypto';

export function generateRandomToken() {
  var buffer = crypto.pseudoRandomBytes(256);
  return crypto.createHash('sha1').update(buffer).digest("hex");
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
export const sha512 = (password, salt)=> {
  var hash = crypto.createHmac('sha512', salt);
  /** Hashing algorithm sha512 */
  hash.update(password);
  return hash.digest('hex');
};
