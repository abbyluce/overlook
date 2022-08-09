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
let newBooking
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
const upcomingBookingsContainer = document.querySelector('.upcoming-bookings-container')
const bookARoomPage = document.querySelector('.book-a-room-page')
const availableRoomsPage = document.querySelector('.available-rooms-page')
const availRoomsTitle = document.querySelector('#availRoomsTitle')
const filterRoomTagsContainer = document.querySelector('.filter-rooms')
const availableRoomsContainer = document.querySelector('.available-rooms-container')
const totalDollars = document.querySelector('.total-dollars')
const roomDetailsPage = document.querySelector('.room-details-page')

window.addEventListener('load', function() {
  getPromiseData()
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
  hide(logoutButton)
})
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
roomDetailsPage.addEventListener('click', function(event) {
  confirmNewBooking(event)
})

function getPromiseData() {
  Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
  .then(data => {
    roomData = data[0].rooms
    bookingsData = data[1].bookings
    customersData = data[2].customers
    overlook = new Hotel(bookingsData, roomData, customersData)
    setCurrentDate()
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
  } else {
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

function populateExistingBookings() {
  existingBookingsContainer.innerHTML = ""
  upcomingBookingsContainer.innerHTML = ""
  let todaysDate = new Date().toJSON().slice(0,10)
  let userID = parseInt(username.value.slice(8, username.value.length))
  newCustomer = new Customer(userID)
  newCustomer.getName(customersData)
  dashboardTitle.innerText = `${newCustomer.name}'s Dashboard`
  overlook.findExistingBookings(newCustomer).forEach(booking => {
    if (booking.date.split('/') < todaysDate.split('-')) {
      existingBookingsContainer.innerHTML +=
      `<section class="room-booking">
        <h4 class="room-title">BOOKING DATE: ${booking.date} </h4>
        <img src="${getPhoto(booking.roomType)}" class="room-photo">
        <p class="room-${booking.roomNumber}-details">ROOM NUMBER: ${booking.roomNumber}
        <br> COST: $${booking.cost}<br>ROOM TYPE: ${booking.roomType}</p>
      </section>`
    } else if (booking.date.split('/') >= todaysDate.split('-')) {
      upcomingBookingsContainer.innerHTML +=
      `<section class="room-booking">
        <h4 class="room-title">BOOKING DATE: ${booking.date} </h4>
        <img src="${getPhoto(booking.roomType)}" class="room-photo">
        <p class="room-${booking.roomNumber}-details">ROOM NUMBER: ${booking.roomNumber}
        <br> COST: $${booking.cost}<br>ROOM TYPE: ${booking.roomType}</p>
      </section>`
    }
  })
    totalDollars.innerHTML = ""
    totalDollars.innerHTML = `${overlook.findTotalCost(newCustomer)}`
}

function populateAvailableRooms() {
  errorDatePlaceholder.innerText = ""
  let date = dateSearchForm.value.split('-').join('/')
  availRoomsTitle.innerText = `AVAILABLE ROOMS ON ${date}`
  availableRoomsContainer.innerHTML = ''
  overlook.availableRoomsByDate(date)
    if (overlook.availableRooms.length === 0) {
      availableRoomsContainer.innerText = `WE APOLOGIZE, THERE ARE NO ROOMS AVAILABLE ON YOUR REQUESTED DATE, PLEASE SEARCH A DIFFERENT DATE.`
    }
  overlook.availableRooms.forEach(room => {
    availableRoomsContainer.innerHTML +=
    `<section class="room-booking">
      <h4 class="room-title">ROOM NUMBER: ${room.number} <br> COST PER NIGHT: $${room.costPerNight}</h4>
      <button class="button" id="${room.number}">BOOK THIS ROOM</button>
      <img src="${getPhoto(room.roomType)}" class="room-photo">
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
      if (filteredRoomsByTag.length === 0) {
        availableRoomsContainer.innerText = `WE APOLOGIZE, THERE ARE NO ROOMS OF YOUR REQUESTED ROOM TYPE AVAILABLE, PLEASE ADJUST YOUR SEARCH.`
      }
      filteredRoomsByTag.forEach(room => {
      availableRoomsContainer.innerHTML +=
      `<section class="room-booking">
        <h4 class="room-title">ROOM NUMBER: ${room.number} <br> COST PER NIGHT: $${room.costPerNight}</h4>
        <button class="button" id="${room.number}">BOOK THIS ROOM</button>
        <img src="${getPhoto(room.roomType)}" class="room-photo">
        <p class="room-${room.number}-details">ROOM TYPE: ${room.roomType} <br> BED SIZE: ${room.bedSize} <br> NUMBER OF BEDS: ${room.numBeds}</p>
      </section>`
    })
  }
}

function populateRoomDetails(event) {
  const clickedRoom = roomData.filter(room => event.target.id === `${room.number}`)
  newRoom = new Room(clickedRoom[0].number, clickedRoom[0].roomType, clickedRoom[0].bidet, clickedRoom[0].bedSize, clickedRoom[0].numBeds, clickedRoom[0].costPerNight)
  roomDetailsPage.innerHTML = ''
    let bidet
    if (newRoom.bidet) {
      bidet = "This room has a bidet!"
    } else {
      bidet = ''
    }
  roomDetailsPage.innerHTML += `<h2 class="room-details-title">ROOM DETAILS</h2>
      <img src="${getPhoto(newRoom.roomType)}" class="room-details-photo">
      <p class="room-details-${newRoom.number}">ROOM NUMBER: ${newRoom.number} <br> COST PER NIGHT: $${newRoom.costPerNight} <br> ROOM TYPE: ${newRoom.roomType} <br> BED SIZE: ${newRoom.bedSize} <br> NUMBER OF BEDS: ${newRoom.numBeds} <br> ${bidet} </p> <button class="button" id="confirmBooking">CONFIRM BOOKING</button>`
}

function confirmNewBooking(event) {
  if (event.target.classList.contains('button')) {
    fetchBookingPost()
  }
}

function fetchBookingPost() {
    let date = dateSearchForm.value.split('-').join('/')
    newBooking = new Booking(newCustomer, date, newRoom)
  fetch("http://localhost:3001/api/v1/bookings", {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userID: newBooking.userID,
         date: date,
         roomNumber: newBooking.roomNumber})
        })
      .then(response => {
          if (!response.ok) {
            throw new Error('There was an error and your booking was not completed, please try again!')
          } else {
            roomDetailsPage.innerHTML = ''
            roomDetailsPage.innerHTML += `THANKS FOR BOOKING WITH US! <br>
            BOOKING ADDED TO DASHBOARD`
            return response.json()
          }
        })
      .then(() => getPromiseData())
      .catch(err => {
        roomDetailsPage.innerHTML = `${err.message}`
      })

}

function getPhoto(roomType) {
  if (roomType === "residential suite") {
      return "https://www.aman.com/sites/default/files/styles/full_size_large/public/2021-03/Amangiri-Gallery-15.jpg?itok=Wui89NRF"
    }
    if (roomType === "suite") {
      return "https://www.aman.com/sites/default/files/styles/full_size_large/public/2021-01/210119_AmanWebsite2021_LandscapeImageFrame_WholePixels_Amangiri_41.jpg?itok=9Ibun5bC"
    }
    if (roomType === "single room") {
      return "https://www.aman.com/sites/default/files/styles/full_size_large/public/2021-02/210127_AmanWebsite2021_LandscapeImageFrame_WholePixels_Amangiri59.jpg?itok=BZ62PaZv"
    }
    if (roomType === "junior suite") {
      return "https://www.aman.com/sites/default/files/styles/full_size_large/public/2021-01/210119_AmanWebsite2021_LandscapeImageFrame_WholePixels_Amangiri_15.jpg?itok=1aadr4EX"
    }
}

function setCurrentDate() {
  dateSearch.min = new Date().toJSON().slice(0,10)
}

function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}
