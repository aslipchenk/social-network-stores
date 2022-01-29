import $api from '../http';

export default class FriendService {
  static async createFriendship(dtoIn: any) {
    return await $api.post('friend/createFriendship', dtoIn);
  }

  static async friendShipList(dtoIn: any) {
    return $api.get('friend/friendshipList', dtoIn);
  }

  static async friendShipListPoll(dtoIn: any) {
    return $api.get('friend/friendshipListPoll', dtoIn);
  }
}
