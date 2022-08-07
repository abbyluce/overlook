let fetchData = (data) => {
  return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Issue loading information, please refresh page.')
      } else {
        return response.json()
      }
    })
    .catch(error => loginPage.innerHTML = `${error.message}`)
}

export { fetchData }
