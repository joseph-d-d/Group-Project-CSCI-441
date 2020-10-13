class Reservation {
  constructor(db, parkingLot) {
    this.db = db;
    this.parkingLot = parkingLot;
  }

  makeReservation(user, store, dateTime) {
    let parkingSpotID;
    if (this.parkingLot.isParkingSpotAvailable) {
      parkingSpotID = this.parkingLot.reserveSpot(store);
    }
    this.db.addReservation({
      user: user,
      reservationDateAndTime: dateTime,
      spotID: parkingSpotID,
    });
  }

  getReservations() {
    return this.db.getReservations();
  }

  cancelReservation() {
    this.db.deleteReservation();
  }
}

module.exports = Reservation;
