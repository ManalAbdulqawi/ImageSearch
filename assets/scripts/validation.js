const form = document.querySelector("form");
const firstname_input = document.getElementById("firstname_input");
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const repeat_password_input = document.getElementById("repeat_password_input");
const err_msg = document.getElementById("err-msg");
let emailExist;

// saved users information data in array of objects to validate if signp email doesn't exist then push the new signup user in the array
//addtionally we assume this users array as users table in database and compare if the signin data match one of the array's users
let usersArray = [
  { firstName: "Manal", email: "manal@gmail.com", password: "87654321" },
  { firstName: "Majed", email: "Majed@gmail.com", password: "87654321" },
  { firstName: "Maha", email: "maha@gmail.com", password: "87654321" },
  { firstName: "Mustafa", email: "mustafa@gmail.com", password: "87654321" },
];
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
      setTimeout((window.location.href = "welcom.html"), 200);
    }
  } else {
    //if we don't have firstname entered then we are in the login page
   
  }
});
function handleSetUserInfo(userInfo) {
  usersArray.push(userInfo);
  localStorage.setItem("user_info", JSON.stringify(userInfo));
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
  emailExist = usersArray.filter((user) => user.email === email);

  if (emailExist.length > 0) {
    errors.push("Email already exist");
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
