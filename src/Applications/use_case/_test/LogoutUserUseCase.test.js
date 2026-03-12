import { describe, expect, vi } from 'vitest';
import LogoutUserUseCase from '../LogoutUserUseCase.js';
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository.js';

describe('LogoutUserUseCase', () => {
  it('should throw error if use case payload not contain refreshToken', async () => {
    const useCasePayload = {};
    const logoutUserUseCase = new LogoutUserUseCase({});

    await expect(logoutUserUseCase.execute(useCasePayload))
      .rejects.toThrowError('DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });

  it('should throw error if refresh token not string', async () => {
    const useCasePayload = {
      refreshToken: 1
    };
    const logoutUserUseCase = new LogoutUserUseCase({});

    await expect(logoutUserUseCase.execute(useCasePayload))
      .rejects.toThrowError('DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete authentication action correctly', async () => {
    const useCasePayload = {
      refreshToken: 'some_refresh_token'
    };
    const mockAuthenticationRepository = new AuthenticationRepository();

    mockAuthenticationRepository.checkAvailabilityToken = vi.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteToken = vi.fn()
      .mockImplementation(() => Promise.resolve());
    const logoutUserUseCase = new LogoutUserUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    await logoutUserUseCase.execute(useCasePayload);
    
    expect(mockAuthenticationRepository.checkAvailabilityToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
  });
});