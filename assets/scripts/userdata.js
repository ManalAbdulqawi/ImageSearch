const apiKey = "mtIZYaziECzuNmX2v1PS7XVEYQlb9Ws0Q3lLH5IMW9c";
const form = document.querySelector("form");
const inputImage = document.getElementById("image-input");
const searchResults = document.querySelector(".search-results");
const imgWrapper = document.querySelector(".img-wrapper");
const loadButton = document.getElementById("load-more-button");

let keyWord = "";
let page = 1;
let unAcceptedWord = [
  "sex",
  "kill",
  "porn",
  "abuse",
  "suicide",
  "terrorism",
  "crime",
  "died",
  "violence",
  "death",
  "rape",
];

/**
 * This method fetch the images according the user input from unsplash api
 */
async function searchImages() {
  // Some parts of this function code I have learned them from the youtube video in readme file

  keyWord = inputImage.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      if (results && results.length > 0) {
        if (page === 1) {
          imgWrapper.innerHTML = "";
        }

        results.map((result) => {
          const imgDiv = document.createElement("div");
          imgDiv.classList.add("result-image");
          const img = document.createElement("img");
          img.src = result.urls.small;
          img.alt = result.alt_description;
          const imgLink = document.createElement("a");
          imgLink.href = result.links.html;
          imgLink.target = "_blank";
          imgLink.textContent = result.alt_description;
          imgDiv.appendChild(img);
          imgDiv.appendChild(imgLink);
          imgWrapper.appendChild(imgDiv);
        });

        page++;
        if (page > 1) {
          loadButton.style.display = "block";
        }
      } else {
        noSearchResult();
      }
    } else {
      console.error("Error response:", response.status, response.statusText);
      noSearchResult();
    }
  } catch (err) {
    noSearchResult();
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputImage.value.trim().length <= 0) {
    noSearchResult();
  } else {
    // Get the trimmed and lowercased input value
    const inputValue = inputImage.value.trim().toLowerCase();

    // Variable to store the found unaccepted word (optional, but useful for feedback)
    let foundUnacceptedWord = null;

    // Iterate through the unAcceptedWord array
    for (const word of unAcceptedWord) {
      // Check if the input value contains the current unaccepted word
      if (inputValue.includes(word)) {
        foundUnacceptedWord = word;
        break; // Stop searching once a match is found
      }
    }

    if (foundUnacceptedWord) {
      noSearchResult();
    } else {
      page = 1;
      searchImages();
    }
  }
});

inputImage.addEventListener("keyup", () => {
  document.getElementById("err-msg").innerText = "";
});
loadButton.addEventListener("click", () => {
  searchImages();
});

window.onload = function () {
  loadIntial();
};

/**
 * This function show the welcome message and signout button if the user signin or signup
 */
function loadIntial() {
  const user = JSON.parse(localStorage.getItem("user_login"));
  if (user) {
    document.getElementById("welcom").innerText = "Welcome " + user.firstName;
    document.getElementById("out").style.display = "inline-block";
    document.getElementById("signin").style.display = "none";
    document.getElementById("signup").style.display = "none";
  }
}

/**
 * This method redirects the person to the signin page
 */
function redirectToSignIn() {
  window.location.href = "signin.html";
}
/**
 * This method redirects the person to the signup page
 */
function redirectToSignUp() {
  window.location.href = "signup.html";
}
/**
 * This method remove the localstorage of "user_login" key and redirect the user to index page
 */
function redirectToOut() {
  localStorage.removeItem("user_login");
  window.location.href = "index.html";
}
/**
 * This method show error message when the user enter unaccepted or invalid input
 */
function noSearchResult() {
  document.getElementById("err-msg").innerText = "Invalid Input";
  imgWrapper.innerHTML = "";
  loadButton.style.display = "none";
}
