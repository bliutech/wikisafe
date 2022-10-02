const base = "http://localhost:5000";
const showError = true;

function getCaption(text) {
  return;
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
  console.log(object["image_url"]);
  return object["image_url"];
}

export { getCaption, getImage };
