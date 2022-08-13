/* eslint-disable no-use-before-define */
/* eslint linebreak-style: ["error", "windows"] */
const input = document.querySelector(".search-input");
const image = document.querySelector(".picture");
const Name = document.querySelector(".name");
const summary = document.querySelector(".summary");
const rating = document.querySelector(".rating");

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
    const para = document.createElement("p");
    para.textContent = element;
    container.appendChild(para);
  });
}

function showDetails() {
  const choices = document.querySelectorAll(".suggestion-container p");

  choices.forEach((element) => {
    element.addEventListener("click", () => {
      const detailsSection = document.querySelector("#details");
      detailsSection.style.display='block'
      const content = element.textContent;
      fetchData(
        `https://api.tvmaze.com/singlesearch/shows?q=${content}`,
        (data) => {
          console.log(data)
          image.src = data.image.original;
          Name.textContent =   data.name;
          summary.innerHTML = `summary: ${data.summary}`;
          rating.textContent = `rating: ${data.rating.average}` 
        }
      );
    });
  });
}
showDetails();
