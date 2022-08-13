const input = document.querySelector(".search-input");

function fetchData(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        cb(data);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

input.addEventListener("input", () => {
  if (input.value === "") {
    const container = document.getElementsByClassName(
      "suggestion-container"
    )[0];
    container.textContent = "";
  } else {
    fetchData(`/displaymovies/${input.value}`, (data) => {
      renderAutoComplite(data);
    });
  }
});

function renderAutoComplite(data) {
  const container = document.getElementsByClassName("suggestion-container")[0];
  container.textContent = "";
  data.forEach((element) => {
    let para = document.createElement("p");
    para.textContent = element;
    container.appendChild(para);
  });
}