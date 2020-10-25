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
  addUser(first_name, last_name, phone, email, permissions, modified_date, modified_by, paymentMethods, vehicles) {
    this.db.addUser({
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      email: email,
      permissions: permissions,
      modified_date: modified_date,
      modified_by: modified_by,
      paymentMethods: paymentMethods,
      vehicles: vehicles
    });
  }
}

module.exports = User;
