export class User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;

  constructor(firstName, lastName, username, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
