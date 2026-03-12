import { describe, expect, vi } from 'vitest';
import bcrypt from 'bcrypt';
import BcryptPasswordHash from '../BcryptPasswordHash.js';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError.js';

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      const spyHash = vi.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      const encryptedPassword = await bcryptPasswordHash.hash('plain_password');

      expect(typeof encryptedPassword).toEqual('string');
      expect(encryptedPassword).not.toEqual('plain_password');
      expect(spyHash).toBeCalledWith('plain_password', 10); // 10 adalah salt default bcrypt
    });
  });

  describe('compare function', () => {
    it('should throw AuthorizationError if password not match', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

      await expect(bcryptPasswordHash.compare('plain', 'encrypted'))
        .rejects.toThrowError(AuthenticationError);
    });

    it('should not return AuthorizationError if password match', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);
      const plainPassword = 'secret';
      const encryptedPassword = await bcryptPasswordHash.hash(plainPassword);

      await expect(bcryptPasswordHash.compare(plainPassword, encryptedPassword))
        .resolves.not.toThrowError(AuthenticationError);
    });
  });
});