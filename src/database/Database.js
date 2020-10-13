//TODO wire up mongoDB
class Database {
  constructor() {
    this.reservations = [];
  }

  addReservation = (reservation) => {
    this.reservations.push(reservation);
  };

  getReservation = () => {};

  getReservations = () => {
    return this.reservations;
  };

  deleteReservation = () => {};
}

module.exports = Database;
