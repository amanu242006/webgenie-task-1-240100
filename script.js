const seatsContainer = document.getElementById('seats');
const ticketInput = document.getElementById('tickets');
const nextBtn = document.getElementById('nextBtn');
const confirmBtn = document.getElementById('confirmBtn');
const confirmation = document.getElementById('confirmation');
const movieSelect = document.getElementById('movie');
const languageSelect = document.getElementById('language');
const dateInput = document.getElementById('date');
const timeSelect = document.getElementById('time');

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

const indicatorStep1 = document.getElementById('indicator-step1');
const indicatorStep2 = document.getElementById('indicator-step2');
const indicatorStep3 = document.getElementById('indicator-step3');

const ROWS = 5;
const COLUMNS = 10;
let selectedSeats = [];

function createSeats() {
  seatsContainer.innerHTML = "";
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLUMNS; col++) {
      const seatNumber = `${String.fromCharCode(65 + row)}${col + 1}`;
      const seat = document.createElement('div');
      seat.classList.add('seat');
      seat.dataset.index = seatNumber;
      seat.innerText = seatNumber;
      seat.addEventListener('click', () => toggleSeat(seat));
      seatsContainer.appendChild(seat);
    }
  }
}

function toggleSeat(seat) {
  if (seat.classList.contains('booked')) return;

  const index = seat.dataset.index;
  const maxTickets = parseInt(ticketInput.value);

  if (seat.classList.contains('selected')) {
    seat.classList.remove('selected');
    selectedSeats = selectedSeats.filter(s => s !== index);
  } else {
    if (selectedSeats.length >= maxTickets) {
      alert(`You can only select up to ${maxTickets} seats.`);
      return;
    }
    seat.classList.add('selected');
    selectedSeats.push(index);
  }
}

nextBtn.addEventListener('click', () => {
  const numTickets = parseInt(ticketInput.value);
  const selectedDate = dateInput.value;
  const selectedTime = timeSelect.value;

  if (!movieSelect.value || !languageSelect.value || numTickets <= 0 || !selectedDate || !selectedTime) {
    alert("Please fill in all details including date and time.");
    return;
  }

  step1.classList.add('hidden');
  step2.classList.remove('hidden');
  indicatorStep1.classList.remove('active');
  indicatorStep2.classList.add('active');
  createSeats();
});

confirmBtn.addEventListener('click', () => {
  if (selectedSeats.length === 0) {
    alert('Please select your seats.');
    return;
  }

  selectedSeats.forEach(index => {
    const seat = document.querySelector(`.seat[data-index='${index}']`);
    seat.classList.remove('selected');
    seat.classList.add('booked');
  });

  step2.classList.add('hidden');
  step3.classList.remove('hidden');
  indicatorStep2.classList.remove('active');
  indicatorStep3.classList.add('active');

  const selectedDate = dateInput.value;
  const selectedTime = timeSelect.value;

  confirmation.innerText = `🎟️ Booked ${selectedSeats.length} seat(s): ${selectedSeats.join(', ')}\nMovie: ${movieSelect.options[movieSelect.selectedIndex].text}\nLanguage: ${languageSelect.value.toUpperCase()}\nDate: ${selectedDate}\nTime: ${selectedTime}`;

  console.log({
    movie: movieSelect.value,
    language: languageSelect.value,
    date: selectedDate,
    time: selectedTime,
    seatNumbers: selectedSeats,
    count: selectedSeats.length,
  });

  selectedSeats = [];
});





