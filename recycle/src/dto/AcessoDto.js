export default class AcessoDTO {
  constructor(login = '', password = '') {
    this.login = login;
    this.password = password;
  }

  getLogin() {
    return this.login;
  }

  setLogin(login) {
    this.login = login;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}
