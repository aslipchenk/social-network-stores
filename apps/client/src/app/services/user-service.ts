import $api from '../http';

export default class UserService {
  static async userList(dtoIn: any) {
    return $api.get('user/list', dtoIn);
  }
}
