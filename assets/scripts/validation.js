const form = document.querySelector("form");
const firstname_input = document.getElementById("firstname_input");
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const repeat_password_input = document.getElementById("repeat_password_input");
const err_msg = document.getElementById("err-msg");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;// the regex from https://tecadmin.net/validate-email-address-in-javascript/

window.onload = function () {
  document.body.style.backgroundImage = 'url("assets/images/p1.jpg")';
};
form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    //if we have a firstname entered then we are in the signup page
    errors = getSignupFormErrorrs(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
    if (errors.length > 0) {
      //if there are any errors
      e.preventDefault();
      err_msg.innerText = errors.join(".  ");
    } else {
      e.preventDefault();
      let userInfo = {
        firstName: firstname_input.value,
        email: email_input.value,
        password: password_input.value,
      };
      setTimeout(handleSetUserInfo(userInfo), 400);
      setTimeout((window.location.href = "index.html"), 600);
    }
  } else {
    //if we don't have firstname entered then we are in the login page
    errors = getLoginFormErrors(email_input.value, password_input.value);
    if (errors.length > 0) {
      //if there are any errors
      e.preventDefault();
      err_msg.innerText = errors.join(".  ");
    } else {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user_info"));

      userLogin = {
        firstName: user.firstName,
      };

      setTimeout(handleSetUserLogin(userLogin), 400);
      setTimeout((window.location.href = "index.html"), 600);
    }
  }
});
/**
 * This method save the user sign up data in localstorage with two keys 1- user_info to compare it with new signup data 2- user_login to display welcome message in index.html page
 * @param {object} userInfo
 */
function handleSetUserInfo(userInfo) {
  localStorage.setItem("user_info", JSON.stringify(userInfo));
  const login = { firstName: userInfo.firstName };
  localStorage.setItem("user_login", JSON.stringify(login));
}
/**
 * This method save user_login key in localstorage when the user signin to display welcome message in index.html page
 * @param {object} userLogin
 */
function handleSetUserLogin(userLogin) {
  localStorage.setItem("user_login", JSON.stringify(userLogin));
}
/**
 * This method to check if the entered data in signup.html are valid
 * @param {string} firstname
 * @param {string} email
 * @param {string} password
 * @param {string} repeatPassword
 * @returns {Array}  array of error strings
 */
function getSignupFormErrorrs(firstname, email, password, repeatPassword) {
  let errors = [];
  if (firstname.trim().length <= 1 || firstname.length < 2) {
    errors.push("Firstname has to be more than 2 letters");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (!emailRegex.test(email)) {
    errors.push("Email syntax is not valid");
    email_input.parentElement.classList.add("incorrect");
  }
  const user = JSON.parse(localStorage.getItem("user_info"));
  if (user && user.email === email) {
    errors.push("Email already exist");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must be 8 characters or longer");
    password_input.parentElement.classList.add("incorrect");
  }
  if (password !== repeatPassword || repeatPassword.length < 8) {
    errors.push(
      "Repeat Password isn't matching Password or isn't 8 characters or longer"
    );
    repeat_password_input.parentElement.classList.add("incorrect");
  }
  return errors;
}

/**
 * This method to check if the entered data in signin.html are valid
 * @param {string} firstname
 * @param {string} email
 * @returns {Array}  array of error strings
 */

function getLoginFormErrors(email, password) {
  let errors = [];

  if (!emailRegex.test(email)) {
    errors.push("Email syntax is not valid");
    email_input.parentElement.classList.add("incorrect");
  }
  if (password.length < 8) {
    errors.push("Password must be 8 characters or longer");
    password_input.parentElement.classList.add("incorrect");
  }
  const user = JSON.parse(localStorage.getItem("user_info"));

  if (user) {
    if (user.email !== email) {
      errors.push("Email is not exist");
      email_input.parentElement.classList.add("incorrect");
    } else if (user.password !== password) {
      errors.push("Password is wrong");
      password_input.parentElement.classList.add("incorrect");
    }
  } else {
    errors.push("Email is not exist");
    email_input.parentElement.classList.add("incorrect");
  }

  return errors;
}
// this code delete the error message when the user keying in input textbox
const inputs_list = [
  firstname_input,
  email_input,
  password_input,
  repeat_password_input,
].filter((input) => input != null);
inputs_list.forEach((input) => {
  input.addEventListener("keyup", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      err_msg.innerText = "";
    }
  });
});
