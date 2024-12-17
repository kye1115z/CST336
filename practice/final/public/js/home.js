let comicArray = [];
document.addEventListener("DOMContentLoaded", () => {
  displayComicSites();
  displayRandomComic();
});

document
  .querySelector("#randomComicBtn")
  .addEventListener("click", displayRandomComic);

document
  .querySelector("#addComicBtn")
  .addEventListener("click", () => (window.location.href = "/addComic"));

async function displayComicSites() {
  comicArray = await fetch(`/api/comic_sites`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error fetching comic sites:", error));

  let comicSiteBox = document.querySelector("#sitesBox");

  comicArray.forEach((comic) => {
    let divEl = document.createElement("div");
    divEl.className = `comic_sites_wrapper`;
    let siteNameEl = document.createElement("a");
    siteNameEl.href = `/comic?comicSiteId=${comic.comicSiteId}`;
    siteNameEl.innerText = comic.comicSiteName;
    siteNameEl.className = `site_name`;
    let linkEl = document.createElement("a");
    linkEl.href = comic.comicSiteUrl;
    linkEl.innerText = comic.comicSiteUrl;
    linkEl.className = `site_link`;

    divEl.append(siteNameEl, linkEl);
    comicSiteBox.appendChild(divEl);
  });
}

async function displayRandomComic() {
  let randomComic = await fetch(`/api/random_comic`)
    .then((response) => response.json())
    .then((data) => {
      return data[0];
    })
    .catch((error) => console.error("Error fetching comic sites:", error));

  let findSiteName = () => {
    let foundComic = comicArray.find(
      (comic) => comic.comicSiteId === randomComic.comicSiteId
    );
    return foundComic ? foundComic.comicSiteName : "Unknown Comic Site";
  };

  let randomComicBox = document.querySelector("#randomComicBox");
  randomComicBox.innerHTML = ``;
  let imgEl = document.createElement("img");
  imgEl.src = randomComic.comicUrl;
  imgEl.alt = `comic_image`;
  imgEl.className = `random_comic_img`;
  let pEl = document.createElement("p");
  pEl.innerText = findSiteName();
  pEl.className = "random_comic_title";
  randomComicBox.append(imgEl, pEl);
}
