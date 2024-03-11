
export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    userId: number;
    email: string;
    location: string;

    constructor(username: string, password: string, firstName: string, lastName: string, userId: number, email: string, location: string) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userId = userId;
        this.email = email;
        this.location = location;
    }
}