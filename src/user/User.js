class User {
  constructor(db) {
    this.db = db;
  }

  getUserById(id) {
    return this.db.getUserById(id);
  }

  getUsers() {
    return this.db.getUsers();
  }

  //Just an example of the user collection structure
  addUser(firstName, lastName, phone, email, password, permissions, modified_date, modified_by, paymentMethod, vehicles) {
    this.db.addUser({
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      password: password,
      permissions: permissions,
      modified_date: modified_date,
      modified_by: modified_by,
      paymentMethod: paymentMethod,
      vehicles: vehicles
    });
  }
}

module.exports = User;
