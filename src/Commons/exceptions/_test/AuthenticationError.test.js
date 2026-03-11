import { describe, expect } from 'vitest';
import AuthenticationError from '../AuthenticationError.js';

describe('AuthenticationError', () => {
  it('should create AuthorizationError correctly', () => {
    const authenticationError = new AuthenticationError('authentication error!');

    expect(authenticationError.statusCode).toEqual(401);
    expect(authenticationError.message).toEqual('authentication error!');
    expect(authenticationError.name).toEqual('AuthenticationError');
  });
});