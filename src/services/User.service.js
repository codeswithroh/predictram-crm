import { USER_URL } from 'src/config/api.config';

import ApiService from './Api.service';

class UserService extends ApiService {
  constructor() {
    super(USER_URL);
  }

  register(payload) {
    return this.post(payload);
  }

  getUsers() {
    return this.get();
  }
}

export default new UserService();
