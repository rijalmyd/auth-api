import { describe, expect } from 'vitest';
import UserLogin from '../UserLogin.js';

describe('a UserLogin entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      username: 'dicoding'
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      username: 'dicoding',
      password: true
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when username contains more than 50 characters', () => {
    const payload = {
      username: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      password: 'super_secret'
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted character', () => {
    const payload = {
      username: 'dico ding',
      password: 'super_secret'
    };

    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
  });

  it('should create UserLogin correctly', () => {
    const payload = {
      username: 'dicoding',
      password: 'super_secret'
    };

    const { username, password } = new UserLogin(payload);
    
    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});