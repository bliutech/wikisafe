import { useState } from "react";

import { Form } from "../components/Form";

function SignIn() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

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
      handleSignUp();
    }
  }

  async function handleSignUp() {
    console.log("username:", username, "password:", password);
    return;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <Form
        formEntries={formEntries}
        buttonText="Sign Up"
        onClick={handleSignUp}
      />
    </div>
  );
}

export { SignIn };
