class UserDto {
  constructor({
    primeiroNome,
    ultimoNome,
    cpf,
    cep,
    logradouro,
    bairro,
    complemento = '', // opcional, default vazio
    login,
    password
  }) {
    this.primeiroNome = primeiroNome;
    this.ultimoNome = ultimoNome;
    this.cpf = cpf;
    this.cep = cep;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.complemento = complemento;
    this.login = login;
    this.password = password;
  }
}

export default UserDto;
