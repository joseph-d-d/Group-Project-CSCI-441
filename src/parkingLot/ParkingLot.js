class ParkingLot {
  constructor(db, parkingLotLayout) {
    this.db = db;
    this.parkingLotLayout = parkingLotLayout;
  }
  //TODO
  //FINDS CLOSEST SPOT AVAILALBLE TO SELECTED STORE
  reserveSpot(store) {
	let xStore = 0; //will update to get x coordinate from store in database
	let yStore = 0; //will update to get y coordinate from store in database
	let distanceTemp = 999;
	let xSpot = 0;
	let ySpot = 0;
	
	//EACH parkingSpotID HAS AN x AND A y VALUE ATTACHED TO RETRIEVE FOR ALGORITHM
	//RETREIVE AN ARRAY WITH ALL x AND y PAIRS FROM SPOTS THAT ARE MARKED "AVAILALBLE"
	//TODO
	
	//FOR EXAMPLE, THE FOLLOWING ARE SPOTS THAT WERE MARKED AVAILALBLE FROM DATABASE
	//PAIRS ARE (0,0) (5,2) (10,15) etc...
	let xAvailSpots = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]; //will update to get x coordinates from available spots in database
	let yAvailSpots = [0,2,15,75,35,23,96,12,89,86,58,24,53,15,74,73,85,13,53,74,52]; //will update to get x coordinates from available spots in database
					  
	//USE DISTANCE FORMULA TO FIND CLOSEST AVAILALBLE SPOT TO THE SELECTED "store"
	for (i = 0; i < availSpots.length; i++){
		if (Math.sqrt(xStore * yStore + xAvailSpots[i] * yAvailSpots[i]) < distanceTemp){
			xSpot = xAvailSpots[i];
			ySpot = yAvailSpots[i];
		}
	}
	
	//GET parkingSpotID THATS ATTACHED TO THE x AND y VALUE
	//TODO
      	let parkingSpotID = 1;
      	return parkingSpotID;
  }
  //TODO
  isParkingSpotAvailable() {
    return true;
  }
}

module.exports = ParkingLot;
