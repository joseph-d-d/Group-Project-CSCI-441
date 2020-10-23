class ParkingLot {
	constructor(db, parkingLotLayout) {
	this.db = db;
	this.parkingLotLayout = parkingLotLayout;
	//this is an example of what the array will look like, first set represents the X coordinate, second set represents the Y coordinate, and then each contains both the spotID and it's status
	this.parkingSpots = [
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
	  
	}
  
	  
	//FUNCTION: for testing, attempts to reserve a spot based on spotID
	reserveSpot(spotID) {
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((this.parkingSpots[i][j][0]) == spotID) {
					if (this.parkingSpots[i][j][1] == 'open') {
						this.parkingSpots[i][j][1] = 'reserved';
						return 'space reserved'; 
				    }
					else {
						return 'spot unavailable';
					}
			    }
		    }
	    }
		return 'spot does not exist';
	}
	
	
	//FUNTION: takes ID for the spot and checks if it is "open"
	isParkingSpotAvailable(spotID) {
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((this.parkingSpots[i][j][0]) == spotID) {
					if ((this.parkingSpots[i][j][1]) == "open") {
						return true;
					}	
					else {
						return false;
					}
				}
			}
		}
		return false;
	}
	
	
	//FUNTION: takes ID for spot and returns x coordinate
	findSpotCoordinatesX(spotID) {
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((this.parkingSpots[i][j][0]) == spotID) {
					return i;
				}
			}
		}
		return 'does not exist';
	}
	
	
	//FUNTION: takes ID for spot and returns y coordinate
	findSpotCoordinatesY(spotID) {
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((this.parkingSpots[i][j][0]) == spotID) {
					return j;
				}
			}
		}
		return 'does not exist';
	}
  
  
	//FUNTION: takes spot and updates its status to "open"
	openSpot(spotID) {
		this.updateSpotStatus(spotID, "open");
	}
	
	
	//FUNTION: takes spot and updates its status to "reserved"
	reservedSpot(spotID) {
		this.updateSpotStatus(spotID, "reserved");
	}
	
	
	//FUNTION: takes spot and updates its status to "occupied" when camera detects car is present
	occupiedSpot(spotID) {
		this.updateSpotStatus(spotID, "occupied");
	}
	
	
	//FUNTION: takes spot and updates its status to "closed"
	closeSpot(spotID) {
		this.updateSpotStatus(spotID, "closed");
	}
	
	
	//FUNTION: takes spot and updates its status to "store"
	storeSpot(spotID) {
		this.updateSpotStatus(spotID, "store")
	}

	//FUNCTION: returns true if parking lot is full
	isParkingLotFull(){
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((this.parkingSpots[i][j][1]) == "open") {
					return false;
				}
			}
		}
		return true;
	}
	
	
	//FUNCTION: takes the parking spot's ID and the string status to be updated to
	updateSpotStatus(spotID, newSpotStatus) {
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((this.parkingSpots[i][j][0]) == spotID) {
					this.parkingSpots[i][j][1] = newSpotStatus;
				}
			}
		}
	}

	//FUNCTION: takes ID for store and returns the ID for the closest "open" parking spot
	findClosestSpot(storeID) {
		let xStore = this.findSpotCoordinatesX(storeID); //get x coordinate for storeID
		let yStore = this.findSpotCoordinatesY(storeID); //get y coordinate for storeID
		let distanceTemp = 999;
		let shortestSpotID = 0;
		//EACH parkingSpot HAS AN x AND A y VALUE FROM THE MATRIX TO BE USED FOR ALGORITHM			  
		//USE DISTANCE FORMULA TO FIND CLOSEST AVAILALBLE SPOT TO THE SELECTED store's coordinates
		for (let i = 0; i <= this.parkingSpots.length - 1; i++){
			for (let j = 0; j <= this.parkingSpots[i].length - 1; j++) {
				if ((Math.sqrt(((xStore-i)*(xStore-i))+((yStore-j)*(yStore-j)))) < distanceTemp) {
					if ((this.parkingSpots[i][j][1]) == "open") {
						distanceTemp = (Math.sqrt(((xStore-i)*(xStore-i))+((yStore-j)*(yStore-j))));
						shortestSpotID = this.parkingSpots[i][j][0];
					}
				}
			}
		}
		if (shortestSpotID != 0) {
			this.reservedSpot(shortestSpotID);
			return shortestSpotID;
		}
		return 'no spot available'
	}

	//FUCNTION: returns random "open" spot
	findRandomSpot() {
		while (this.isParkingLotFull() == false) {
			let xSpot = Math.floor(Math.random() * Math.floor(this.parkingSpots.length - 1));
			let ySpot = Math.floor(Math.random() * Math.floor(this.parkingSpots[xSpot].length - 1));
			if ((this.parkingSpots[xSpot][ySpot][1]) == "open") {
				this.reservedSpot(this.parkingSpots[xSpot][ySpot][0]);
				return (this.parkingSpots[xSpot][ySpot][0]);
			}
		}
	}
	
}

module.exports = ParkingLot;
  
