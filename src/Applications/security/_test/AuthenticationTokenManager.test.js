import { describe, expect } from 'vitest';
import AuthenticationTokenManager from '../AuthenticationTokenManager.js';

describe('AuthenticationTokenManager interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const authTokenManager = new AuthenticationTokenManager();

    await expect(authTokenManager.createAccessToken('')).rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authTokenManager.createRefreshToken('')).rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authTokenManager.verifyRefreshToken('')).rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(authTokenManager.decodePayload('')).rejects.toThrowError('AUTHENTICATION_TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});