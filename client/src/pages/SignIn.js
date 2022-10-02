import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { Form } from "../components/Form";

import { createUser, getUser, changeUser, deleteUser } from "../api/users";

function SignIn() {
  document.title = "Sign In";

  const [cookies, setCookie, removeCookie] = useCookies(["username"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const formEntries = [
    {
      label: "Username",
      placeholder: "Enter your unique username.",
      onChange: setUsername,
      onKeyPress: handleEnter,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter your un-simple password.",
      onChange: setPassword,
      onKeyPress: handleEnter,
    },
  ];

  function handleEnter(key) {
    if (key == "Enter") {
      handleSignIn();
    }
  }

  async function handleSignIn() {
    const user = await getUser(username);

    if (user.password === password) {
      // check that password matches
      setCookie("username", username, { path: "/" });
      navigate("/");
      return;
    }
    // username does not exist OR password does not match
    window.alert(
      "The username or password is incorrect. " +
        "Did you mean to sign up instead?"
    );
  }

  return (
    <div>
      <h1>Sign In</h1>
      <Form
        formEntries={formEntries}
        buttonText="Sign In"
        onClick={handleSignIn}
      />
    </div>
  );
}

export { SignIn };
