import { useCallback } from "react";

const base = "http://localhost:5000";
const showError = true;

async function createUser(username, password, callback = () => {}) {
  let object = {
    usr: username,
    pwd: password,
  };
  const response = await fetch(`${base}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then(() => callback())
    .catch((error) => {
      if (showError) {
        window.alert(error);
      }
      return;
    });
}

async function getUser(username, callback = () => {}) {
  const response = await fetch(`${base}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usr: username }),
  });

  if (!response.ok) {
    // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const object = await response.json();
  return object;
}

async function changeUser(username, password, callback = () => {}) {
  /* TODO: implement this thing! */
  return;
}

async function deleteUser(username, callback = () => {}) {
  /* TODO: implement this thing! */
  return;
}

export { createUser, getUser, changeUser, deleteUser };
