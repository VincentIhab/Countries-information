export default function NewsModel(country) {
    const apiKey = "e44e2e87863b4f50b4c8de75b7ac1422";
  const url2 = `https://newsapi.org/v2/everything?q=${country}&apiKey=${apiKey}`;

  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.articles);
      data.articles.forEach((article) => {
        console.log(`Title: ${article.title}`);
        console.log(`Description: ${article.description}`);
        console.log(`URL: ${article.url}`);
        console.log("---");
      });
    })
    .catch((error) => console.error("Error:", error));
}