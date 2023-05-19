class Api {
  constructor(dataUrl) {
    this.dataUrl = dataUrl;
  }

  async fetchData() {
    return fetch(this.dataUrl)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

class PortfolioItem {
  constructor(data) {
    this.title = data.title;
    this.projectURL = data.projectURL;
    this.imageUrl = data.imageUrl;
    this.languages = data.languages;
  }

  generateHTML() {
    const portfolioItem = document.createElement("a");
    portfolioItem.href = this.projectURL;
    portfolioItem.classList.add("main__portfolioItem");

    const portfolioWrapper = document.createElement("div");
    portfolioWrapper.classList.add("main__portfolioWrapper");
    portfolioItem.appendChild(portfolioWrapper);

    const portfolioTitle = document.createElement("p");
    portfolioTitle.classList.add("main__portfolioTitle");
    portfolioTitle.innerText = this.title;
    portfolioWrapper.appendChild(portfolioTitle);

    const portfolioImage = document.createElement("img");
    portfolioImage.classList.add("main__portfolioImage");
    portfolioImage.alt = `An image preview of the GitHub project ${this.title}, this projects source files can be found at ${this.projectURL}`;
    portfolioImage.src = this.imageUrl;
    portfolioWrapper.appendChild(portfolioImage);
    console.log(this.projectURL);
    const portfolioLanguages = document.createElement("ul");
    portfolioLanguages.classList.add("main__portfolioLanguages");
    portfolioWrapper.appendChild(portfolioLanguages);

    this.languages.forEach((language) => {
      const languageItem = document.createElement("li");
      languageItem.classList.add("main__portfolioLanguage");
      languageItem.innerText = `${language.percentage} ${language.name}`;
      portfolioLanguages.appendChild(languageItem);
    });

    const mainContainer = document.querySelector(".main__portfolio");
    mainContainer.appendChild(portfolioItem);
  }
}

// Usage example:
const dataUrl = "../data/data.json";
const api = new Api(dataUrl);

api.fetchData().then((jsonData) => {
  jsonData.forEach((data) => {
    const portfolioItem = new PortfolioItem(data);
    portfolioItem.generateHTML();
  });
});
