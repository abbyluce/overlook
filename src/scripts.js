import './css/styles.css';
import Customer from './classes/customer.js'
import Booking from './classes/booking.js'
import Room from './classes/room.js'

let roomData
let customer
let room
let bookingsData
let newBooking

const backToDashboardButton = document.querySelector('#backToDashboardButton')
const changeDateButton = document.querySelector('#changeDate')
const bookRoomButton = document.querySelector('#bookRoomButton')
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const errorMessage = document.querySelector('#errorMessagePlaceholder')
const errorDatePlaceholder = document.querySelector('#errorDatePlaceholder')
const loginButton = document.querySelector('#loginButton')
const dateSearchForm = document.querySelector('#dateSearch')
const dateSearchButton = document.querySelector('#dateSearchButton')
const customerDashboardPage = document.querySelector('.customer-dashboard-page')
const loginPage = document.querySelector('.login-page')
const roomBookingsContainer = document.querySelector('.room-bookings-container')
const bookARoomPage = document.querySelector('.book-a-room-page')
const availableRoomsPage = document.querySelector('.available-rooms-page')
const availRoomsTitle = document.querySelector('#availRoomsTitle')
const filterRoomTagsContainer = document.querySelector('.filter-rooms')
const availableRoomsContainer = document.querySelector('.available-rooms-container')
const totalDollars = document.querySelector('.total-dollars')

loginButton.addEventListener('click', showDashboardPage)
bookRoomButton.addEventListener('click', showBookARoomPage)
dateSearchButton.addEventListener('click', showAvailableRoomsPage)
backToDashboardButton.addEventListener('click', showDashboardPage)
changeDateButton.addEventListener('click', showBookARoomPage)

window.addEventListener('load', function() {
  fetchRoomData()
  fetchBookingsData()
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
})

function fetchRoomData() {
  fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())
  .then(data => {
  roomData = data.rooms
  console.log(roomData)
  })
}

function fetchBookingsData() {
  fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())
  .then(data => {
  bookingsData = data.bookings
  console.log(bookingsData)
  })
}

function showDashboardPage(event) {
  event.preventDefault()
  if (username.value === "" || password.value === "") {
    errorMessage.innerText = `Please complete the form!`
  } else if (password.value !== "overlook2021"){
    errorMessage.innerText = `Wrong password! Please try again.`
  } else {
    errorMessage.innerText = ""
    newBooking = new Booking(bookingsData, roomData)
    customer = new Customer(bookingsData, roomData)
    hide(backToDashboardButton)
    hide(changeDateButton)
    show(bookRoomButton)
    show(customerDashboardPage)
    hide(loginPage)
    hide(bookARoomPage)
    hide(availableRoomsPage)
    populateExistingBookings()
    populateTotalCost()
  }
}

function showBookARoomPage() {
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
  hide(customerDashboardPage)
  hide(loginPage)
  show(bookARoomPage)
  hide(availableRoomsPage)
}

function showAvailableRoomsPage() {
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
  createRoomTags()
  populateAvailableRooms()
  }
}

function populateExistingBookings() {
  roomBookingsContainer.innerHTML = ""
  customer.findExistingBookings(parseInt(username.value)).forEach(room => {
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
  roomBookingsContainer.innerHTML +=
  `<section class="room-booking">
    <h4 class="room-title">ROOM NUMBER: ${room.number} <br> COST PER NIGHT: $${room.costPerNight}</h4>
    <img src="${roomPhoto}" class="room-photo">
    <p class="room-${room.number}-details">ROOM TYPE: ${room.roomType} <br> BED SIZE: ${room.bedSize} <br> NUMBER OF BEDS: ${room.numBeds}</p>
  </section>`
  })
}

function populateTotalCost() {
  totalDollars.innerHTML = ""
  totalDollars.innerHTML = `${customer.findTotalCost(parseInt(username.value))}`
}

function populateAvailableRooms() {
  errorDatePlaceholder.innerText = ""
  availRoomsTitle.innerText = `AVAILABLE ROOMS ON ${dateSearchForm.value}`
  availableRoomsContainer.innerHTML = ''
  newBooking.availableRoomsByDate(dateSearchForm.value).forEach(room => {
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
      <button class="button" id="clickToBookButton">BOOK THIS ROOM</button>
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

function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}
