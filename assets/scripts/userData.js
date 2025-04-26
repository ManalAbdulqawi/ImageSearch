window.onload = function () {
  def();
  document.body.style.background = "white";
};
function def() {
  const user = JSON.parse(localStorage.getItem("user_login"));
  if (user) {
    document.getElementById("man").innerText = "Welcome " + user.firstName;
    document.getElementById("out").style.display="inline-block";
    document.getElementById("signin").style.display="none";
    document.getElementById("signup").style.display="none";

    console.log(user);
  } else {
    console.log("noooooooo");
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
