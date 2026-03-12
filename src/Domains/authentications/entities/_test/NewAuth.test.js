import { describe, expect } from 'vitest';
import NewAuth from '../NewAuth.js';

describe('a NewAuth entities', () => {
  it('should throw error when payload not contain needed property', () => {
    const payload = {
      accessToken: '123'
    };

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      accessToken: 123,
      refreshToken: 234
    };

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create NewAuth entities correctly', () => {
    const payload = {
      accessToken: '123',
      refreshToken: '234'
    };

    const newAuth = new NewAuth(payload);

    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});