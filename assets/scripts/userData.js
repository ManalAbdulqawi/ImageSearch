const apiKey = "mtIZYaziECzuNmX2v1PS7XVEYQlb9Ws0Q3lLH5IMW9c";
const form = document.querySelector("form");
const inputImage = document.getElementById("image-input");
const searchResults = document.querySelector(".search-results");
const imgWrapper = document.querySelector(".img-wrapper");
const loadButton = document.getElementById("load-more-button");

let keyWord = "";
let page = 1;

async function searchImages() {
    keyWord = inputImage.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyWord}&client_id=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if(results)
    {if (page === 1) {
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
    }}
    else{
        document.getElementById("err-msg").innerText="Invalid Input"
        imgWrapper.innerHTML = "";
        loadButton.style.display = "none"; }
}
form.addEventListener("submit", (e) => {

  e.preventDefault();

  if(inputImage.value.trim().length<=0)
  {document.getElementById("err-msg").innerText="Invalid Input";
    imgWrapper.innerHTML = "";
    loadButton.style.display = "none";

  }
  else{
  page = 1;
  searchImages();}
});

inputImage.addEventListener("keyup",()=>{
    document.getElementById("err-msg").innerText="";
})
loadButton.addEventListener("click", () => {
  searchImages();
});

window.onload = function () {
  def();
};
function def() {
  const user = JSON.parse(localStorage.getItem("user_login"));
  if (user) {
    document.getElementById("welcom").innerText = "Welcome " + user.firstName;
    document.getElementById("out").style.display = "inline-block";
    document.getElementById("signin").style.display = "none";
    document.getElementById("signup").style.display = "none";
  } 
}

function redirectToSignIn() {
  window.location.href = "signin.html"; // Change to your desired page
}

function redirectToSignUp() {
  window.location.href = "signup.html"; // Change to your desired page
}
function redirectToOut() {
  localStorage.removeItem("user_login");
  window.location.href = "index.html"; // Change to your desired page
}
