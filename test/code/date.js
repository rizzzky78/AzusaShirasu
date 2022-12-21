let makeDate = new Date(new Date + 3600000)
let date = makeDate.toLocaleDateString('en', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
let day = makeDate.toLocaleDateString('en', { weekday: 'long' })

let registerDate = day + " " + date

console.log(registerDate)