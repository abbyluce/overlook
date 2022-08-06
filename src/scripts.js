import './css/styles.css';
import { fetchData } from './apiCalls'
import Customer from './classes/customer.js'
import Booking from './classes/booking.js'
import Room from './classes/room.js'
import Hotel from './classes/hotel.js'

let roomData
let customersData
let bookingsData
let booking
let newCustomer
let newRoom
let overlook

const backToDashboardButton = document.querySelector('#backToDashboardButton')
const changeDateButton = document.querySelector('#changeDate')
const bookRoomButton = document.querySelector('#bookRoomButton')
const logoutButton = document.querySelector('#logoutButton')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const errorMessage = document.querySelector('#errorMessagePlaceholder')
const errorDatePlaceholder = document.querySelector('#errorDatePlaceholder')
const loginButton = document.querySelector('#loginButton')
const dateSearchForm = document.querySelector('#dateSearch')
const dateSearchButton = document.querySelector('#dateSearchButton')
const customerDashboardPage = document.querySelector('.customer-dashboard-page')
const dashboardTitle = document.querySelector('.dashboard-title')
const loginPage = document.querySelector('.login-page')
const existingBookingsContainer = document.querySelector('.existing-bookings-container')
const bookARoomPage = document.querySelector('.book-a-room-page')
const availableRoomsPage = document.querySelector('.available-rooms-page')
const availRoomsTitle = document.querySelector('#availRoomsTitle')
const filterRoomTagsContainer = document.querySelector('.filter-rooms')
const availableRoomsContainer = document.querySelector('.available-rooms-container')
const totalDollars = document.querySelector('.total-dollars')
const roomDetailsPage = document.querySelector('.room-details-page')

loginButton.addEventListener('click', showDashboardPage)
bookRoomButton.addEventListener('click', showBookARoomPage)
dateSearchButton.addEventListener('click', showAvailableRoomsPage)
backToDashboardButton.addEventListener('click', showDashboardPage)
changeDateButton.addEventListener('click', showBookARoomPage)
logoutButton.addEventListener('click', showLoginPage)
availableRoomsPage.addEventListener('click', function(event) {
  editTags(event)
  filterRooms(event)
})
availableRoomsContainer.addEventListener('click', function(event) {
  showRoomDetailsPage(event)
})
// showRoomDetailsPage.addEventListener('click', function(event) {
//   confirmNewBooking(event)
// })

window.addEventListener('load', function() {
  getPromiseData()
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
  hide(logoutButton)
})

function getPromiseData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
  .then(data => {
    roomData = data[0].rooms
    bookingsData = data[1].bookings
    customersData = data[2].customers
    overlook = new Hotel(bookingsData, roomData, customersData)
  })
}

function showLoginPage() {
  username.value = ''
  password.value = ''
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
  hide(customerDashboardPage)
  show(loginPage)
  hide(bookARoomPage)
  hide(availableRoomsPage)
  hide(logoutButton)
  hide(roomDetailsPage)
}

function showDashboardPage(event) {
  event.preventDefault()
  if (username.value === "" || password.value === "") {
    errorMessage.innerText = `PLEASE COMPLETE THE FORM!`
  } else if (password.value !== "overlook2021"){
    errorMessage.innerText = `WRONG PASSWORD! PLEASE TRY AGAIN.`
  } else
    //userid is greater than 50
  {
    errorMessage.innerText = ""
    hide(backToDashboardButton)
    hide(changeDateButton)
    show(bookRoomButton)
    show(customerDashboardPage)
    hide(loginPage)
    hide(bookARoomPage)
    hide(availableRoomsPage)
    show(logoutButton)
    hide(roomDetailsPage)
    populateExistingBookings()
  }
}

function showBookARoomPage() {
  dateSearchForm.value = ""
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
  hide(customerDashboardPage)
  hide(loginPage)
  show(bookARoomPage)
  hide(availableRoomsPage)
  show(logoutButton)
  hide(roomDetailsPage)
}

function showAvailableRoomsPage(event) {
  if (dateSearchForm.value === "") {
    errorDatePlaceholder.innerText = `Please complete the form!`
  } else {
  show(backToDashboardButton)
  show(changeDateButton)
  hide(bookRoomButton)
  hide(customerDashboardPage)
  hide(loginPage)
  hide(bookARoomPage)
  show(availableRoomsPage)
  populateAvailableRooms()
  createRoomTags()
  show(logoutButton)
  hide(roomDetailsPage)
  }
}

function showRoomDetailsPage(event) {
  if (event.target.classList.contains('button')){
    show(roomDetailsPage)
    show(backToDashboardButton)
    show(changeDateButton)
    hide(bookRoomButton)
    hide(customerDashboardPage)
    hide(loginPage)
    hide(bookARoomPage)
    hide(availableRoomsPage)
    show(logoutButton)
    populateRoomDetails(event)
  }
}

// function confirmNewBooking(event) {
//   if (event.target.id.contains('confirmBooking')) {
//     roomDetailsPage.innerHTML += `THANKS FOR BOOKING WITH US! <br>
//     BOOKING ADDED TO DASHBOARD`
//   }
// }

function populateRoomDetails(event) {
  const clickedRoom = roomData.filter(room => event.target.id === `${room.number}`)
  newRoom = new Room(clickedRoom[0].number, clickedRoom[0].roomType, clickedRoom[0].bidet, clickedRoom[0].bedSize, clickedRoom[0].numBeds, clickedRoom[0].costPerNight)
  roomDetailsPage.innerHTML = ''
  let roomPhoto
  if (newRoom.roomType === "residential suite") {
      roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
    }
    if (newRoom.roomType === "suite") {
      roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
    }
    if (newRoom.roomType === "single room") {
      roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
    }
    if (newRoom.roomType === "junior suite") {
      roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
    }
    let bidet
    if (newRoom.bidet) {
      bidet = "This room has a bidet!"
    } else {
      bidet = ''
    }
  roomDetailsPage.innerHTML += `<h2>ROOM DETAILS</h2>
      <img src="${roomPhoto}" class="room-details-photo">
      <p class="room-details-${newRoom.number}">ROOM NUMBER: ${newRoom.number} <br> COST PER NIGHT: $${newRoom.costPerNight} <br> ROOM TYPE: ${newRoom.roomType} <br> BED SIZE: ${newRoom.bedSize} <br> NUMBER OF BEDS: ${newRoom.numBeds} <br> ${bidet} </p> <button class="button" id="confirmBooking">CONFIRM BOOKING</button>`
}

function populateExistingBookings() {
  existingBookingsContainer.innerHTML = ""
  let userID = parseInt(username.value.slice(8, username.value.length))
  console.log(userID)
  newCustomer = new Customer(userID)
  newCustomer.getName(customersData)
  dashboardTitle.innerText = `${newCustomer.name}'s Dashboard`
  overlook.findExistingBookings(newCustomer).forEach(booking => {
    let roomPhoto
    if (booking.roomType === "residential suite") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
      }
      if (booking.roomType === "suite") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
      }
      if (booking.roomType === "single room") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
      }
      if (booking.roomType === "junior suite") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
      }
    existingBookingsContainer.innerHTML +=
    `<section class="room-booking">
      <h4 class="room-title">BOOKING DATE: ${booking.date} </h4>
      <img src="${roomPhoto}" class="room-photo">
      <p class="room-${booking.roomNumber}-details">ROOM NUMBER: ${booking.roomNumber}
      <br> COST: $${booking.cost}<br>ROOM TYPE: ${booking.roomType}</p>
    </section>`
    })
    totalDollars.innerHTML = ""
    totalDollars.innerHTML = `${overlook.findTotalCost(newCustomer)}`
}

function populateAvailableRooms() {
  errorDatePlaceholder.innerText = ""
  availRoomsTitle.innerText = `AVAILABLE ROOMS ON ${dateSearchForm.value}`
  availableRoomsContainer.innerHTML = ''
  overlook.availableRoomsByDate(dateSearchForm.value)
  overlook.availableRooms.forEach(room => {
    let roomPhoto
      if (room.roomType === "residential suite") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
      }
      if (room.roomType === "suite") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
      }
      if (room.roomType === "single room") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
      }
      if (room.roomType === "junior suite") {
        roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
      }
    availableRoomsContainer.innerHTML +=
    `<section class="room-booking">
      <h4 class="room-title">ROOM NUMBER: ${room.number} <br> COST PER NIGHT: $${room.costPerNight}</h4>
      <button class="button" id="${room.number}">BOOK THIS ROOM</button>
      <img src="${roomPhoto}" class="room-photo">
      <p class="room-${room.number}-details">ROOM TYPE: ${room.roomType} <br> BED SIZE: ${room.bedSize} <br> NUMBER OF BEDS: ${room.numBeds}</p>
    </section>`
  })
}

function createRoomTags() {
  const tags = roomData.map(room => room.roomType).flat()
  const uniqueTags = tags.filter((room, index) => tags.indexOf(room) === index)
  filterRoomTagsContainer.innerHTML = ''
  uniqueTags.forEach(tag => {
    filterRoomTagsContainer.innerHTML += `<input class="checkbox" type="checkbox" id="${tag}"><label for="${tag}">${tag.toUpperCase()}</label>`
  })
}

let tags = []
function editTags(event) {
  if(event.srcElement.checked === true) {
    tags.push(event.target.id)
  }
  else {
    tags = tags.filter(tag => tag !== event.target.id)
  }
}

function filterRooms(event) {
  if(event.target.classList.contains('checkbox')) {
  const filteredRoomsByTag = overlook.filterByTags(tags, overlook.availableRooms)
    availableRoomsContainer.innerHTML = ''
    filteredRoomsByTag.forEach(room => {
      let roomPhoto
        if (room.roomType === "residential suite") {
          roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
        }
        if (room.roomType === "suite") {
          roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
        }
        if (room.roomType === "single room") {
          roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
        }
        if (room.roomType === "junior suite") {
          roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
        }
    availableRoomsContainer.innerHTML +=
    `<section class="room-booking">
      <h4 class="room-title">ROOM NUMBER: ${room.number} <br> COST PER NIGHT: $${room.costPerNight}</h4>
      <button class="button" id="${room.number}">BOOK THIS ROOM</button>
      <img src="${roomPhoto}" class="room-photo">
      <p class="room-${room.number}-details">ROOM TYPE: ${room.roomType} <br> BED SIZE: ${room.bedSize} <br> NUMBER OF BEDS: ${room.numBeds}</p>
    </section>`
  })
  }
}




function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}
