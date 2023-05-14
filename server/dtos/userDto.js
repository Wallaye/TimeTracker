export class UserDto{
    userName;
    userId;
    isAdmin;

    constructor(model) {
        this.userName = model.userName;
        this.userId = model._id;
        this.isAdmin = model.isAdmin;
    }
}