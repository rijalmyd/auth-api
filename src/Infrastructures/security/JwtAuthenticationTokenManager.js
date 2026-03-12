import AuthenticationTokenManager from '../../Applications/security/AuthenticationTokenManager.js';
import config from '../../Commons/config.js';
import InvariantError from '../../Commons/exceptions/InvariantError.js';

class JwtAuthenticationTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.sign(
      payload, 
      config.auth.accessTokenKey,
      { expiresIn: config.auth.accessTokenAge }
    );
  }

  async createRefreshToken(payload) {
    return this._jwt.sign(payload, config.auth.refreshTokenKey);
  }

  async verifyRefreshToken(token) {
    try {
      this._jwt.verify(token, config.auth.refreshTokenKey);
    } catch (error) {
      throw new InvariantError('refresh token tidak valid');
    }
  }

  async decodePayload(token) {
    return this._jwt.decode(token);
  }
}

export default JwtAuthenticationTokenManager;