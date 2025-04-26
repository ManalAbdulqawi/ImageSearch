window.onload = function () {
  def();
};
function def() {
  const user = JSON.parse(localStorage.getItem("user_login"));
  if (user) {
    document.getElementById("man").innerText = user.firstName;
    console.log(user);
  } else {
    console.log("noooooooo");
  }
}
