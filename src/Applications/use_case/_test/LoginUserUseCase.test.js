import { describe, expect, vi } from 'vitest';
import NewAuth from '../../../Domains/authentications/entities/NewAuth.js';
import UserRepository from '../../../Domains/users/UserRepository.js';
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository.js';
import PasswordHash from '../../security/PasswordHash.js';
import AuthenticationTokenManager from '../../security/AuthenticationTokenManager.js';
import LoginUserUseCase from '../LoginUserUseCase.js';

describe('LoginUserUseCase', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      username: 'dicoding',
      password: 'super_secret'
    };
    const expectedAuthentication = new NewAuth({
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    });
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockPasswordHash = new PasswordHash();
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();

    // mocking
    mockUserRepository.getPasswordByUsername = vi.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.compare = vi.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.createAccessToken = vi.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken));
    mockAuthenticationTokenManager.createRefreshToken = vi.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken));
    mockAuthenticationRepository.addToken = vi.fn()
      .mockImplementation(() => Promise.resolve());

    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      passwordHash: mockPasswordHash,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith('dicoding');
    expect(mockPasswordHash.compare)
      .toBeCalledWith('super_secret', 'encrypted_password');
    expect(mockAuthenticationTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'dicoding' });
    expect(mockAuthenticationTokenManager.createRefreshToken)
      .toBeCalledWith({ username: 'dicoding' });
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(expectedAuthentication.refreshToken);
  });
});