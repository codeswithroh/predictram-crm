import { ORG_URL } from 'src/config/api.config';

import ApiService from './Api.service';

class OrganizationService extends ApiService {
    constructor() {
        super(ORG_URL);
    }

    register(payload) {
        return this.post(payload);
    }
}

export default new OrganizationService();
