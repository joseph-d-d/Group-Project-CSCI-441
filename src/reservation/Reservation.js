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
  makeReservation(email, phoneNumber, storeID, dateTime) {
    let parkingSpotID;
    if (!this.parkingLot.isParkingLotFull()) {
      parkingSpotID = this.parkingLot.findClosestSpot(storeID);
      let userPin = this.generatePin(phoneNumber, parkingSpotID);
      this.db.addReservation({
        email: email,
        pin: userPin,
        reservationDateAndTime: dateTime,
        spotID: parkingSpotID,
      });
    }
  }

  generatePin(phoneNumber, parkingSpotID) {
    return phoneNumber.slice(-4) + parkingSpotID;
  }

  /**
   * Get the reservation associated with email address
   * @param {string} email - the email address of the user who created the reservation
   * @returns {object} - Reservation
   */
  getReservation(email) {
    return this.db.getReservation(email);
  }

  /**
   * Gets all reservations
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
