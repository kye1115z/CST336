document.addEventListener("DOMContentLoaded", () => {
  displayWebsite();
});

async function displayWebsite() {
  comicArray = await fetch(`/api/comic_sites`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error fetching comic sites:", error));

  console.log(comicArray);
  let websiteSelect = document.querySelector("#websiteSelect");
  comicArray.forEach((comic) => {
    let optionEl = document.createElement("option");
    optionEl.value = comic.comicSiteId;
    optionEl.innerText = comic.comicSiteName;
    websiteSelect.appendChild(optionEl);
  });
}
