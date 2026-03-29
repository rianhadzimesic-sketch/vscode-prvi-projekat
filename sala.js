var films = [
  {
    naziv: "Mission: Impossible – Final Reckoning",
    vrijeme: "20:30",
    sala: "Sala 1",
    sjedista: [
      ["free","free","free","taken","taken","taken","taken","taken","reserved","reserved"],
      ["free","free","free","free","taken","taken","taken","taken","taken","reserved"],
      ["free","free","free","free","taken","taken","taken","reserved","reserved","reserved"],
      ["free","taken","taken","taken","taken","taken","taken","taken","reserved","reserved"],
      ["free","free","taken","taken","taken","taken","taken","free","reserved","reserved"],
      ["free","free","free","free","taken","free","free","free","reserved","reserved"],
      ["free","free","taken","taken","taken","taken","free","free","reserved","free"],
      ["free","free","free","taken","taken","taken","free","free","free","free"]
    ]
  },
  {
    naziv: "Thunderbolts*",
    vrijeme: "18:00",
    sala: "Sala 2",
    sjedista: [
      ["taken","taken","taken","taken","free","free","free","free","free","free"],
      ["taken","taken","free","free","free","free","free","free","reserved","reserved"],
      ["free","free","free","taken","taken","free","free","free","free","free"],
      ["free","free","free","free","free","free","taken","taken","reserved","reserved"],
      ["taken","free","free","free","free","taken","taken","free","free","free"],
      ["free","free","taken","taken","free","free","free","free","free","free"],
      ["free","free","free","free","free","taken","free","reserved","reserved","free"],
      ["free","free","free","free","taken","taken","taken","free","free","free"]
    ]
  },
  {
    naziv: "The Brutalist",
    vrijeme: "15:00",
    sala: "Sala 3",
    sjedista: [
      ["free","free","free","free","free","free","free","free","free","free"],
      ["taken","taken","taken","taken","taken","taken","taken","taken","taken","taken"],
      ["taken","taken","taken","taken","taken","taken","taken","taken","taken","taken"],
      ["reserved","reserved","reserved","free","free","free","free","free","free","free"],
      ["free","free","free","free","free","taken","taken","taken","taken","taken"],
      ["free","free","free","free","free","free","free","free","free","free"],
      ["taken","free","free","taken","free","free","taken","free","free","taken"],
      ["free","free","free","free","free","free","free","free","free","free"]
    ]
  },
  {
    naziv: "The Wild Robot",
    vrijeme: "11:00",
    sala: "Sala 1",
    sjedista: [
      ["free","free","free","free","free","free","free","free","free","free"],
      ["free","free","free","free","free","free","free","free","free","free"],
      ["taken","taken","free","free","free","free","free","free","reserved","reserved"],
      ["taken","taken","taken","free","free","free","reserved","reserved","reserved","reserved"],
      ["free","free","free","free","free","free","free","free","free","free"],
      ["taken","taken","taken","taken","taken","free","free","free","free","free"],
      ["free","free","free","free","free","free","free","free","free","free"],
      ["free","free","free","taken","taken","taken","taken","free","free","free"]
    ]
  }
];

var rows = ["A","B","C","D","E","F","G","H"];

function renderFilm(index) {
  var film = films[index];
  document.getElementById("info-naziv").textContent = film.naziv;
  document.getElementById("info-vrijeme").textContent = film.vrijeme;
  document.getElementById("info-sala").textContent = film.sala;

  var grid = document.getElementById("hall-grid");
  grid.innerHTML = "";

  film.sjedista.forEach(function (row, ri) {
    var rowEl = document.createElement("div");
    rowEl.className = "seat-row";

    var label = document.createElement("div");
    label.className = "row-label";
    label.textContent = rows[ri];
    rowEl.appendChild(label);

    row.forEach(function (status) {
      var seat = document.createElement("div");
      seat.className = "seat " + status;
      rowEl.appendChild(seat);
    });

    grid.appendChild(rowEl);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var select = document.getElementById("film-select");

  films.forEach(function (film, i) {
    var option = document.createElement("option");
    option.value = i;
    option.textContent = film.naziv + " – " + film.vrijeme;
    select.appendChild(option);
  });

  renderFilm(0);

  select.addEventListener("change", function () {
    renderFilm(parseInt(this.value));
  });

  var links = document.querySelectorAll("nav ul li a");
  links.forEach(function (link) {
    if (link.getAttribute("href") === window.location.pathname.split("/").pop()) {
      link.classList.add("active");
    }
  });
});