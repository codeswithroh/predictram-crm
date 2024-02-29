import { doGet, doPost } from 'src/utils/apiCallers';

import { AUTH_URL } from 'src/config/api.config';

export default class AuthService {
  static async login(email, password) {
    const payload = { email, password };

    return doPost(`${AUTH_URL}/login`, payload);
  }

  static async checkUserAuth() {
    return doGet(`${AUTH_URL}/check`);
  }

  static async register(payload) {
    return doPost(`${AUTH_URL}/register`, payload);
  }
}
