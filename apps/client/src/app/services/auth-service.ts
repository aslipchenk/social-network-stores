import $api from '../http';
import { AxiosResponse } from 'axios';

export default class AuthService {
  static async login(dtoIn: any): Promise<AxiosResponse> {
    const dtoOut = await $api.post('auth/login', dtoIn);
    localStorage.setItem('token', dtoOut.data.token);
    return dtoOut;
  }

  static async registration(dtoIn: any): Promise<AxiosResponse> {
    return $api.post('auth/registration', dtoIn);
  }

  static async logout() {
    return $api.post('auth/logout');
  }

  static async authMe() {
    const dtoOut = await $api.post('auth/me');
    localStorage.setItem('token', dtoOut.data.token);
    return dtoOut;
  }

  static async sendResetPasswordMail(dtoIn: any) {
    return await $api.post('auth/sendResetPasswordMail', dtoIn);
  }

  static async resetPassword(dtoIn: any) {
    return await $api.post('auth/resetPassword', dtoIn);
  }
}
