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
let room
let overlook

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
const dashboardTitle = document.querySelector('.dashboard-title')
const loginPage = document.querySelector('.login-page')
const existingBookingsContainer = document.querySelector('.existing-bookings-container')
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
  getPromiseData()
  // fetchRoomData()
  // fetchBookingsData()
  // fetchCustomersData()
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
})

function getPromiseData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
  .then(data => {
    roomData = data[0].rooms
    bookingsData = data[1].bookings
    customersData = data[2].customers
    overlook = new Hotel(bookingsData, roomData, customersData)
    console.log(overlook)
  })
}

function showDashboardPage(event) {
  event.preventDefault()
  if (username.value === "" || password.value === "") {
    errorMessage.innerText = `Please complete the form!`
  } else if (password.value !== "overlook2021"){
    errorMessage.innerText = `Wrong password! Please try again.`
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
    populateExistingBookings()
    // populateTotalCost()
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
  existingBookingsContainer.innerHTML = ""
  //create customer instance here.
  newCustomer = new Customer(parseInt(username.value))
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
}

function populateTotalCost() {
  totalDollars.innerHTML = ""
  totalDollars.innerHTML = `${newCustomer.findTotalCost(parseInt(username.value))}`
}

function populateAvailableRooms() {
  errorDatePlaceholder.innerText = ""
  availRoomsTitle.innerText = `AVAILABLE ROOMS ON ${dateSearchForm.value}`
  availableRoomsContainer.innerHTML = ''
  // newBooking.availableRoomsByDate(dateSearchForm.value).forEach(room => {
  //   // room.getRoomPhoto()
  //   let roomPhoto
  //     if (room.roomType === "residential suite") {
  //       roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
  //     }
  //     if (room.roomType === "suite") {
  //       roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
  //     }
  //     if (room.roomType === "single room") {
  //       roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
  //     }
  //     if (room.roomType === "junior suite") {
  //       roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
  //     }
  //   availableRoomsContainer.innerHTML +=
  //   `<section class="room-booking">
  //     <h4 class="room-title">ROOM NUMBER: ${room.number} <br> COST PER NIGHT: $${room.costPerNight}</h4>
  //     <button class="button" id="clickToBookButton">BOOK THIS ROOM</button>
  //     <img src="${roomPhoto}" class="room-photo">
  //     <p class="room-${room.number}-details">ROOM TYPE: ${room.roomType} <br> BED SIZE: ${room.bedSize} <br> NUMBER OF BEDS: ${room.numBeds}</p>
  //   </section>`
  // })
}

function createRoomTags() {
  const tags = roomData.map(room => room.roomType).flat()
  const uniqueTags = tags.filter((room, index) => tags.indexOf(room) === index)
  filterRoomTagsContainer.innerHTML = ''
  uniqueTags.forEach(tag => {
    filterRoomTagsContainer.innerHTML += `<input class="checkbox" type="checkbox" id="${tag}"><label for="${tag}">${tag.toUpperCase()}</label>`
  })
}


// getRoomPhoto(booking) {
//   let roomPhoto
//     if (booking.roomType === "residential suite") {
//       roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Schgaguler-Hotel_Town-Suite_1.jpg"
//     }
//     if (room.roomType === "suite") {
//       roomPhoto = "https://www.schgaguler.com/app/uploads/2018/07/Family_Suite_1-Schlafzimmer-mit-Wohnbereich.jpg"
//     }
//     if (room.roomType === "single room") {
//       roomPhoto = "https://www.schgaguler.com/app/uploads/2019/06/Loft-Suite_Schgaguler-Hotel_Bed-web-2.jpg"
//     }
//     if (room.roomType === "junior suite") {
//       roomPhoto = "https://www.schgaguler.com/app/uploads/2018/08/Gable_room4_web.jpg"
//     }
// }

function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}
