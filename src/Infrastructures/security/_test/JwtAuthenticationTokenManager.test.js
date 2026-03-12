import { describe, expect, vi } from 'vitest';
import config from '../../../Commons/config.js';
import JwtAuthenticationTokenManager from '../JwtAuthenticationTokenManager.js';
import jwt from 'jsonwebtoken';
import InvariantError from '../../../Commons/exceptions/InvariantError.js';

describe('JwtAuthenticationTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      const payload = {
        username: 'dicoding'
      };
      const mockJwtToken = {
        sign: vi.fn().mockImplementation(() => 'mock_token')
      };
      const jwtTokenManager = new JwtAuthenticationTokenManager(mockJwtToken);

      const accessToken = await jwtTokenManager.createAccessToken(payload);

      expect(mockJwtToken.sign).toBeCalledWith(
        payload, 
        config.auth.accessTokenKey, 
        { expiresIn: config.auth.accessTokenAge }
      );
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      const payload = {
        username: 'dicoding'
      };
      const mockJwtToken = {
        sign: vi.fn().mockImplementation(() => 'mock_token')
      };
      const jwtTokenManager = new JwtAuthenticationTokenManager(mockJwtToken);

      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      expect(mockJwtToken.sign).toBeCalledWith(payload, config.auth.refreshTokenKey);
      expect(refreshToken).toEqual('mock_token');
    });
  });

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when verification failed', async () => {
      const jwtTokenManager = new JwtAuthenticationTokenManager(jwt);
      const accessToken = await jwtTokenManager.createAccessToken({ username: 'dicoding' });

      await expect(jwtTokenManager.verifyRefreshToken(accessToken))
        .rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when refresh token verified', async () => {
      const jwtTokenManager = new JwtAuthenticationTokenManager(jwt);
      const refreshToken = await jwtTokenManager.createRefreshToken({ username: 'dicoding' });

      await expect(jwtTokenManager.verifyRefreshToken(refreshToken))
        .resolves.not.toThrowError(InvariantError);
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
      const jwtTokenManager = new JwtAuthenticationTokenManager(jwt);
      const accessToken = await jwtTokenManager.createAccessToken({ username: 'dicoding' });

      const { username: expectedUsername } = await jwtTokenManager.decodePayload(accessToken);

      expect(expectedUsername).toEqual('dicoding');
    });
  });
});