/**
 * Represents a Reservation.
 */
class Reservation {
  /**
   * Constructor for Reservation.
   * @constructor
   * @param {DataBase} db - A reference to the database instance.
   * @param {ParkingLot} parkingLot - A reference to the Parking Lot instance.
   */
  constructor(db, parkingLot) {
    this.db = db;
    this.parkingLot = parkingLot;
  }

  /**
   * Makes a reservation
   * @param {string} email - the email address of the user creating the reservation
   * @param {number} storeID - the id of the store that the quest is visiting
   * @param {DateTime} dateTime - the date and time of the reservation
   */
  makeReservation(email, storeID, dateTime) {
    let parkingSpotID;
    if (!this.parkingLot.isParkingLotFull()) {
      parkingSpotID = this.parkingLot.findClosestSpot(storeID);
      this.db.addReservation({
        email: email,
        reservationDateAndTime: dateTime,
        spotID: parkingSpotID,
      });
    }
  }

  /**
   * Get the reservation associated with email address
   * @param {string} email - the email address of the user who created the reservation
   * @returns {Object} - Reservation
   */
  getReservation(email) {
    return this.db.getReservation(email);
  }

  /**
   * Get the reservation associated with email address
   * @returns {Array} - All Reservations
   */
  getReservations() {
    return this.db.getReservations();
  }

  /**
   * Deletes reservation for the specified email address
   * @param {string} email - the email address of the user who created the reservation
   */
  cancelReservation(email) {
    this.db.deleteReservation(email);
  }
}

module.exports = Reservation;
