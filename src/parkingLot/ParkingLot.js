class ParkingLot {
  constructor(db, parkingLotLayout) {
    this.db = db;
    this.parkingLotLayout = parkingLotLayout;
  }
  
  //TODO
  //for example, the array storing parkinglot info. to be update with parkingLotLayout database array 
  var parkingSpots = [
	[[101,"open"],[102,"open"],[103,"open"],[104,"open"],[105,"open"],[106,"open"],[107,"open"],[108,"open"],[109,"store"]],
	[[201,"open"],[202,"open"],[203,"open"],[204,"open"],[205,"open"],[206,"open"],[207,"open"],[208,"open"],[209,"store"]],
	[[301,"open"],[302,"open"],[303,"open"],[304,"open"],[305,"open"],[306,"open"],[307,"open"],[308,"open"],[309,"store"]],
	[[401,"open"],[402,"open"],[403,"open"],[404,"open"],[405,"open"],[406,"open"],[407,"open"],[408,"open"],[409,"store"]],
	[[501,"open"],[502,"open"],[503,"open"],[504,"open"],[505,"open"],[506,"open"],[507,"open"],[508,"open"],[509,"store"]],
	[[601,"open"],[602,"open"],[603,"open"],[604,"open"],[605,"open"],[606,"open"],[607,"open"],[608,"open"],[609,"store"]],
	[[701,"open"],[702,"open"],[703,"open"],[704,"open"],[705,"open"],[706,"open"],[707,"open"],[708,"open"],[709,"store"]],
	[[801,"open"],[802,"open"],[803,"open"],[804,"open"],[805,"open"],[806,"open"],[807,"open"],[808,"open"],[809,"store"]],
	[[901,"store"],[902,"store"],[903,"store"],[904,"store"],[905,"store"],[906,"store"],[907,"store"],[908,"store"],[909,"store"]]
  ];
	
	
	
	
	
  //FUNCTION: takes ID for store and returns the ID for the closest "open" parking spot
  reserveSpot(store) {
	//find store coordinates for distance formula
	let xStore = findSpotCoordinatesX(store); //get x coordinate for storeID
	let yStore = findSpotCoordinatesX(store); //get y coordinate for storeID
	let distanceTemp = 999;
	let shortestSpotID = 0;
	
	//EACH parkingSpot HAS AN x AND A y VALUE FROM THE MATRIX TO BE USED FOR ALGORITHM
					  
	//USE DISTANCE FORMULA TO FIND CLOSEST AVAILALBLE SPOT TO THE SELECTED store's coordinates
	for (i=0; i < parkingSpots.length; i++){
		for (j = 0; j < parkingSpots[i].length; j++) {
			if ((parkingSpots[i][j][1]) == "open") {
				if (Math.sqrt(xStore * yStore + i * j) < distanceTemp) {
					shortestSpotID = parkingSpots[i][j][0];
				}
			}
		}
	}
	
	reserveSpot(shortestSpotID)
    return shortestSpotID;
  }
  
  
  //FUNTION: takes ID for the spot and checks if it is "open"
  isParkingSpotAvailable(spotID) {
	for (i=0; i < parkingSpots.length; i++){
		for (j = 0; j < parkingSpots[i].length; j++) {
			if ((parkingSpots[i][j][0]) = spotID) {
				if ((parkingSpots[i][j][1]) = "open") {
					return true;
				}
			}
		}
	 }
  }
  
  
  //FUNTION: takes ID for spot and returns x coordinate
  findSpotCoordinatesX(spotID) {
	  for (i=0; i < parkingSpots.length; i++){
		for (j = 0; j < parkingSpots[i].length; j++) {
			if ((parkingSpots[i][j][0]) = spotID) {
				return i;
			}
		}
	  }
  }
  
  
  //FUNTION: takes ID for spot and returns x coordinate
  findSpotCoordinatesY(spotID) {
	  for (i=0; i < parkingSpots.length; i++){
		for (j = 0; j < parkingSpots[i].length; j++) {
			if ((parkingSpots[i][j][0]) = spotID) {
				return j;
			}
		}
	  }
  }


  //FUNTION: takes spot and updates its status to "open"
  openSpot(spotID) {
	  updateParkingSpot(shortestSpotID, "open");
  }
  
  
  //FUNTION: takes spot and updates its status to "reserved"
  reservedSpot(spotID) {
	  updateParkingSpot(shortestSpotID, "reserved");
  }
  
  
  //FUNTION: takes spot and updates its status to "occupied"
  occupiedSpot(spotID) {
	  updateParkingSpot(shortestSpotID, "occupied");
  }
  
  
  //FUNTION: takes spot and updates its status to "closed"
  closeSpot(spotID) {
	  updateParkingSpot(shortestSpotID, "closed");
  }
  
  
  //FUNTION: takes spot and updates its status to "store"
  storeSpot(spotID) {
	  updateParkingSpot(shortestSpotID, "store")
  }
  
  
  //takes the parking spot's ID and the string status to be updated to
  updateParkingSpotStatus(spotID, newSpotStatus) {
	  for (i=0; i < parkingSpots.length; i++){
		for (j = 0; j < parkingSpots[i].length; j++) {
			if ((parkingSpots[i][j][0]) = spotID) {
				parkingSpots[i][j][1] = newSpotStatus;
			}
		}
	  }
  }
  
}

module.exports = ParkingLot;
