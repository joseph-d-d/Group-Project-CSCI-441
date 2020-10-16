class ParkingLot {
  constructor(db, parkingLotLayout) {
    this.db = db;
    this.parkingLotLayout = parkingLotLayout;
  }
  //TODO
  //FINDS CLOSEST SPOT AVAILALBLE TO SELECTED STORE
  reserveSpot(store) {
	let xStore = 0; //get x coordinate where name equals "store"
	let yStore = 0; //get y coordinate where name equals "store"
	let distanceTemp = 999;
	let xSpot = 0;
	let ySpot = 0;
	
	//EACH parkingSpotID HAS AN x AND A y VALUE ATTACHED TO RETRIEVE FOR ALGORITHM
	//RETREIVE AN ARRAY WITH ALL x AND y PAIRS FROM SPOTS THAT ARE MARKED "AVAILALBLE"
	//TODO
	
	//FOR EXAMPLE, THE FOLLOWING ARE SPOTS THAT WERE MARKED AVAILALBLE FROM DATABASE
	//PAIRS ARE (0,0) (5,2) (10,15) etc...
	let xAvailSpots = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]; //get x coordinate where status equals "available"
	let yAvailSpots = [0,2,15,75,35,23,96,12,89,86,58,24,53,15,74,73,85,13,53,74,52]; //get y coordinate where status equals "available"
					  
	//USE DISTANCE FORMULA TO FIND CLOSEST AVAILALBLE SPOT TO THE SELECTED "store"
	for (i = 0; i < availSpots.length; i++){
		if (Math.sqrt(xStore * yStore + xAvailSpots[i] * yAvailSpots[i]) < distanceTemp){
			xSpot = xAvailSpots[i];
			ySpot = yAvailSpots[i];
		}
	}
	
	//get name where x equals xSpot and where y equals ySpot
	//TODO
      	let parkingSpotID = 1;
      	return parkingSpotID;
  }
  //TODO
  isParkingSpotAvailable() {
	//if spot status equals "available"
    	return true;
  }
}

module.exports = ParkingLot;
