class Reservation {
  constructor(db, parkingLot) {
    this.db = db;
    this.parkingLot = parkingLot;
  }

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

  getReservation(email) {
    return this.db.getReservation(email);
  }

  getReservations() {
    return this.db.getReservations();
  }

  cancelReservation() {
    this.db.deleteReservation();
  }
}

module.exports = Reservation;
