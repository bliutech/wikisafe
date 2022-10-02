const base = "http://localhost:5000";
const showError = true;

async function getCaption(text) {
  const response = await fetch(`${base}/caption`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

  if (!response.ok) {
    // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const object = await response.json();
  return object["captioned"];
}

async function getImage(prompt) {
  const response = await fetch(`${base}/stablediffusion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }),
  });

  if (!response.ok) {
    // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const object = await response.json();
  return object["image_url"];
}

async function getSummary(text) {
  const response = await fetch(`${base}/summarize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });

  if (!response.ok) {
    // server connection error
    const message = `An error has occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  const object = await response.json();
  return object["summary"];
}

export { getCaption, getImage, getSummary };
