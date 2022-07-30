// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

const backToDashboardButton = document.querySelector('#backToDashboardButton')
const changeDateButton = document.querySelector('#changeDate')
const bookRoomButton = document.querySelector('#bookRoomButton')
const loginButton = document.querySelector('#loginButton')
const dateSearchButton = document.querySelector('#dateSearchButton')
const customerDashboardPage = document.querySelector('.customer-dashboard-page')
const loginPage = document.querySelector('.login-page')
const bookARoomPage = document.querySelector('.book-a-room-page')
const availableRoomsPage = document.querySelector('.available-rooms-page')
const managerDashboardPage = document.querySelector('.manager-dashboard-page')
const managerViewUserPage = document.querySelector('.manager-view-user-page')

loginButton.addEventListener('click', showDashboardPage)
bookRoomButton.addEventListener('click', showBookARoomPage)
dateSearchButton.addEventListener('click', showAvailableRoomsPage)
backToDashboardButton.addEventListener('click', showDashboardPage)
changeDateButton.addEventListener('click', showBookARoomPage)

window.addEventListener('load', function() {
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
})

function showDashboardPage(event) {
  //conditional here to show either customer or manager dashboard
  event.preventDefault()
  hide(backToDashboardButton)
  hide(changeDateButton)
  show(bookRoomButton)
  show(customerDashboardPage)
  hide(loginPage)
  hide(bookARoomPage)
  hide(availableRoomsPage)
  hide(managerDashboardPage)
  hide(managerViewUserPage)
}

function showBookARoomPage() {
  hide(backToDashboardButton)
  hide(changeDateButton)
  hide(bookRoomButton)
  hide(customerDashboardPage)
  hide(loginPage)
  show(bookARoomPage)
  hide(availableRoomsPage)
  hide(managerDashboardPage)
  hide(managerViewUserPage)
}

function showAvailableRoomsPage() {
  show(backToDashboardButton)
  show(changeDateButton)
  hide(bookRoomButton)
  hide(customerDashboardPage)
  hide(loginPage)
  hide(bookARoomPage)
  show(availableRoomsPage)
  hide(managerDashboardPage)
  hide(managerViewUserPage)
}

function show(element) {
  element.classList.remove('hidden')
}

function hide(element) {
  element.classList.add('hidden')
}
