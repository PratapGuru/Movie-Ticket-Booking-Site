const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

//update movie image
function updateMovieImageVisibility(movieIndex) {
  const movieImage = document.querySelectorAll(".movie-image");
  movieImage.forEach((image, index) => {
    if (index === movieIndex) {
      image.classList.remove("hidden");
    } else {
      image.classList.add("hidden");
    }
  });
}

//Save Selected movie index and price
function setMOvieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
  updateMovieImageVisibility(movieIndex);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  }); //spread opretor

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectesMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectesMovieIndex !== null) {
    movieSelect.selectedIndex = selectesMovieIndex;
  }
}

//update price when a different movie is selected
movieSelect.addEventListener("change", function (e) {
  ticketPrice = +e.target.value;
  setMOvieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//Intial Count and total
updateSelectedCount();
