import NewAuth from '../../Domains/authentications/entities/NewAuth.js';
import UserLogin from '../../Domains/users/entities/UserLogin.js';

class LoginUserUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    passwordHash,
    authenticationTokenManager,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._passwordHash = passwordHash;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.compare(password, encryptedPassword);

    const accessToken = await this._authenticationTokenManager.createAccessToken({ username });
    const refreshToken = await this._authenticationTokenManager.createRefreshToken({ username });

    const newAuthentication = new NewAuth({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

export default LoginUserUseCase;