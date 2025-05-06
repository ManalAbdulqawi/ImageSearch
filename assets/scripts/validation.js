const form = document.querySelector("form");
const firstname_input = document.getElementById("firstname_input");
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const repeat_password_input = document.getElementById("repeat_password_input");
const err_msg = document.getElementById("err-msg");

window.onload = function () {
  console.log("Window loaded. Setting background image...");
  document.body.style.backgroundImage = 'url("assets/images/p1.jpg")';

  // Check if the style has been applied
  console.log(
    "Background image applied: ",
    document.body.style.backgroundImage
  );
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
      setTimeout(handleSetUserInfo(userInfo), 100);
      setTimeout((window.location.href = "index.html"), 200);
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

      setTimeout(handleSetUserLogin(userLogin), 100);
      setTimeout((window.location.href = "index.html"), 200);
    }
  }
});
function handleSetUserInfo(userInfo) {
  localStorage.setItem("user_info", JSON.stringify(userInfo));
  const login = { firstName: userInfo.firstName };
  localStorage.setItem("user_login", JSON.stringify(login));
}
function handleSetUserLogin(userLogin) {
  localStorage.setItem("user_login", JSON.stringify(userLogin));
}

function getSignupFormErrorrs(firstname, email, password, repeatPassword) {
  let errors = [];
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (firstname.trim().length <= 1 || firstname.length < 2) {
    errors.push("Firstname has to be more than 2 letters");
    firstname_input.parentElement.classList.add("incorrect");
  }
  if (!emailRegex.test(email)) {
    errors.push("Email syntax is not valid");
    email_input.parentElement.classList.add("incorrect");
  }
  const user = JSON.parse(localStorage.getItem("user_info"));
  if (user.email === email) {
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

function getLoginFormErrors(email, password) {
  let errors = [];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

//module.exports= { user_data };
