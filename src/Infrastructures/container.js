/* istanbul ignore file */
import { createContainer } from 'instances-container';
import UserRepository from '../Domains/users/UserRepository.js';
import UserRepositoryPostgres from './repository/UserRepositoryPostgres.js';
import pool from './database/postgres/pool.js';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import PasswordHash from '../Applications/security/PasswordHash.js';
import BcryptPasswordHash from './security/BcryptPasswordHash.js';
import AddUserUseCase from '../Applications/use_case/AddUserUseCase.js';
import AuthenticationRepository from '../Domains/authentications/AuthenticationRepository.js';
import AuthenticationRepositoryPostgres from './repository/AuthenticationRepositoryPostgres.js';
import AuthenticationTokenManager from '../Applications/security/AuthenticationTokenManager.js';
import JwtAuthenticationTokenManager from './security/JwtAuthenticationTokenManager.js';
import LoginUserUseCase from '../Applications/use_case/LoginUserUseCase.js';
import LogoutUserUseCase from '../Applications/use_case/LogoutUserUseCase.js';
import RefreshAuthenticationUseCase from '../Applications/use_case/RefreshAuthenticationUseCase.js';

const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        }
      ]
    }
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryPostgres,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        }
      ]
    }
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtAuthenticationTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: jwt,
        }
      ]
    }
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
        {
          name: 'passwordHash',
          internal: PasswordHash.name,
        },
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        }
      ]
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'authenticationTokenManager',
          internal: AuthenticationTokenManager.name,
        },
        {
          name: 'authenticationRepository',
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
]);

export default container;
