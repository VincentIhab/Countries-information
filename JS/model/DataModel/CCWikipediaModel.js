export default function WikipediaModel(CC) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&titles=${CC}&origin=*`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const extract = pages[pageId].extract;
      console.log(extract); // This is the plain text extract of the Wikipedia article
    })
    .catch((error) =>
      console.error("Error fetching Wikipedia article:", error)
    );
}