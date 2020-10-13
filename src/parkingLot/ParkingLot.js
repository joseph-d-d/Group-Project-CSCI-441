class ParkingLot {
  constructor(db, parkingLotLayout) {
    this.db = db;
    this.parkingLotLayout = parkingLotLayout;
  }
  //TODO
  reserveSpot(store) {
    let parkingSpotID = 1;
    return parkingSpotID;
  }
  //TODO
  isParkingSpotAvailable() {
    return true;
  }
}

module.exports = ParkingLot;
