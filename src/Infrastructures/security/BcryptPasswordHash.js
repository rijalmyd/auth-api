import PasswordHash from '../../Applications/security/PasswordHash.js';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError.js';

class BcryptPasswordHash extends PasswordHash {
  constructor(bcrypt, saltRound = 10) {
    super();
    this._bcrypt = bcrypt;
    this._saltRound = saltRound;
  }

  async hash(password) {
    return this._bcrypt.hash(password, this._saltRound);
  }

  async compare(plain, encrypted) {
    const result = await this._bcrypt.compare(plain, encrypted);

    if (!result) {
      throw new AuthenticationError('kredensial yang Anda masukkan salah');
    }
  }
}

export default BcryptPasswordHash;