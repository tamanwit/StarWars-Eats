//for the animated cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;

});

function animateCircles() {

  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();

//sticky nav
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

function toggleMenu() {
  const menuToggle = document.querySelector(".menuToggle");
  const navlinks = document.querySelector(".navlinks");
  menuToggle.classList.toggle("active");
  navlinks.classList.toggle("active");
}

function validate() {
  emailadress = prompt('Enter email');
  console.log(emailadress);

  api_key = '631433ec88174c67aabf77861b6c9051';
  const url =
    'https://emailvalidation.abstractapi.com/v1/?api_key=' +
    api_key +
    '&email=' +
    emailadress;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let deliverable = false;
      if (data.deliverability == 'DELIVERABLE') {
        deliverable = true;
      }

      if (data && deliverable) {
        alert('Email is valid!');
        window.location.href = "./success.html";
      } else {
        // Fail steps
        alert('Request failed:', data);
        // Perform actions for failure
        alert(
          'Email address not deliverable. Check the address and try again!'
        );
        window.location.href = "./wrong.html";
      }
    })
    .catch((error) => {
      alert('Error during request:', error);
      // Perform actions for error
    });

}