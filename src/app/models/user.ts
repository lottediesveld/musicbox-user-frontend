export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;

  constructor(id, firstName, lastName, username, email, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
