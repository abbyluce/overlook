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
const loginButton = document.querySelector('#loginButton')
const dateSearchForm = document.querySelector('#dateSearch')
const dateSearchButton = document.querySelector('#dateSearchButton')
const customerDashboardPage = document.querySelector('.customer-dashboard-page')
const loginPage = document.querySelector('.login-page')
const bookARoomPage = document.querySelector('.book-a-room-page')
const availableRoomsPage = document.querySelector('.available-rooms-page')
const filterRoomTagsContainer = document.querySelector('.filter-rooms')
const availableRoomsContainer = document.querySelector('.available-rooms-container')

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
  newBooking = new Booking(bookingsData, roomData)
  customer = new Customer(bookingsData, roomData)
  hide(backToDashboardButton)
  hide(changeDateButton)
  show(bookRoomButton)
  show(customerDashboardPage)
  hide(loginPage)
  hide(bookARoomPage)
  hide(availableRoomsPage)
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

function populateExistingBookings() {

}

function populateAvailableRooms() {
  // h2.innerText = `AVAILABLE ROOMS ON ${dateSearchForm.value}`
  availableRoomsContainer.innerHTML = ''
  console.log(newBooking.availableRoomsByDate(dateSearchForm.value))
  newBooking.availableRoomsByDate(dateSearchForm.value).forEach(room => {
    availableRoomsContainer.innerHTML +=
    `<section class="room-booking">
      <h4 class="room-title">Room Number: ${room.number} <br> Cost Per Night: $${room.costPerNight}</h4>
      <p class="room-${room.number}-details">Room Type: ${room.roomType} <br> Bed Size: ${room.bedSize} <br> Number Of Beds: ${room.numBeds}</p>
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
