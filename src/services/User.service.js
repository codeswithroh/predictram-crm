import { USER_URL } from 'src/config/api.config';

import ApiService from './Api.service';

class UserService extends ApiService {
  constructor() {
    super(USER_URL);
  }
}

export default new UserService();
