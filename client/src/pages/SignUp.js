import { useState } from "react";

import { Form } from "../components/Form";


function SignUp() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const formEntries = [
    {
      label: "Username",
      placeholder: "Create a unique username for signing in.",
      onChange: setUsername,
      onKeyPress: handleEnter
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Create an un-simple password for signing in.",
      onChange: setPassword,
      onKeyPress: handleEnter
    },
  ]

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
      <h1>Sign Up</h1>
      <Form formEntries={formEntries} buttonText="Sign Up" onClick={handleSignUp} />
    </div>
  );
}


export { SignUp };