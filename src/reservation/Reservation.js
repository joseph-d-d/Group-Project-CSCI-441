class Reservation {
  constructor(db, parkingLot) {
    this.db = db;
    this.parkingLot = parkingLot;
  }

  makeReservation(user, storeID, dateTime) {
    let parkingSpotID;
    console.log(this.parkingLot.isParkingLotFull());
    if (!this.parkingLot.isParkingLotFull()) {
      parkingSpotID = this.parkingLot.findClosestSpot(storeID);
      console.log(parkingSpotID);
      this.db.addReservation({
        user: user,
        reservationDateAndTime: dateTime,
        spotID: parkingSpotID,
      });
    }
  }

  getReservations() {
    return this.db.getReservations();
  }

  cancelReservation() {
    this.db.deleteReservation();
  }
}

module.exports = Reservation;
