class Room {
  constructor(number, roomType, bidet, bedSize, numBeds, costPerNight) {
    this.number = number
    this.roomType = roomType
    this.bidet = bidet
    this.bedSize = bedSize
    this.numBeds = numBeds
    this.costPerNight = costPerNight
    // this.roomPhoto
  }

  // getRoomPhoto() {
  //   if (room.roomType === "residential suite") {
  //     this.roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
  //   }
  //   if (room.roomType === "suite") {
  //     this.roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
  //   }
  //   if (room.roomType === "single room") {
  //     this.roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
  //   }
  //   if (room.roomType === "junior suite") {
  //     this.roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
  //   }
  // }
}

export default Room
