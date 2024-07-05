export default async function fetchData() {
  //   const countryCode = document
  //     .getElementById("countryInput")
  //     .value.toUpperCase();
  const gdpPerCapitaUrl = `https://api.worldbank.org/v2/country/${"EG"}/indicator/NY.GDP.PCAP.CD?format=json`;
  const populationUrl = `https://api.worldbank.org/v2/country/${"EG"}/indicator/SP.POP.TOTL?format=json`;
  const gdpGrowthRateUrl = `https://api.worldbank.org/v2/country/${"EG"}/indicator/NY.GDP.MKTP.KD.ZG?format=json`;
  const countryInfoUrl = `https://restcountries.com/v3.1/all`;

  try {
    const [
      countryInfoResponse,
      gdpPerCapitaResponse,
      populationResponse,
      gdpGrowthRateResponse,
    ] = await Promise.all([
      fetch(countryInfoUrl),
      fetch(gdpPerCapitaUrl),
      fetch(populationUrl),
      fetch(gdpGrowthRateUrl),
    ]);

    const countryInfoData = await countryInfoResponse.json();
    const gdpPerCapitaData = await gdpPerCapitaResponse.json();
    const populationData = await populationResponse.json();
    const gdpGrowthRateData = await gdpGrowthRateResponse.json();

    const countryInfo = countryInfoData.find(
      (country) => country.cca2 === "EG"
    );

    if (
      countryInfo &&
      gdpPerCapitaData[1] &&
      populationData[1] &&
      gdpGrowthRateData[1]
    ) {
      const years = gdpPerCapitaData[1].map((entry) => entry.date).reverse();
      const gdpPerCapitaValues = gdpPerCapitaData[1]
        .map((entry) => entry.value)
        .reverse();
      const populationValues = populationData[1]
        .map((entry) => entry.value)
        .reverse();
      const gdpGrowthRateValues = gdpGrowthRateData[1]
        .map((entry) => entry.value)
        .reverse();

      //   displayCountryInfo(countryInfo);
      createChart(
        years,
        gdpPerCapitaValues,
        populationValues,
        gdpGrowthRateValues
      );
    } else {
      alert("No data available for the entered country code.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function displayCountryInfo(countryInfo) {
//   const infoDiv = document.getElementById("countryInfo");
//   infoDiv.innerHTML = `
//     <h2>${countryInfo.name.common}</h2>
//     <p>Capital: ${countryInfo.capital[0]}</p>
//     <p>Region: ${countryInfo.region}</p>
// `;
// }

function createChart(years, gdpPerCapita, population, gdpGrowthRate) {
  const ctx = document.getElementById("economicChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "GDP per Capita (current US$)",
          data: gdpPerCapita,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "rectRot",
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: "Population",
          data: population,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "triangle",
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          label: "GDP Growth Rate (%)",
          data: gdpGrowthRate,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 14,
            },
            color: "#eee",
            padding: 25,
          },
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 15,
          paddingTop: 105,
          titleFont: {
            size: 16,
          },
          bodyFont: {
            size: 14,
          },
          footerFont: {
            size: 12,
          },
          callbacks: {
            label: function (tooltipItem) {
              return `${
                tooltipItem.dataset.label
              }: ${tooltipItem.raw.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: true,
            color: "rgba(200, 200, 200, 0.2)",
          },
          ticks: {
            font: {
              size: 14,
            },
            color: "#ccc",
          },
        },
        y: {
          grid: {
            display: true,
            color: "rgba(200, 200, 200, 0.2)",
          },
          ticks: {
            font: {
              size: 14,
            },
            color: "#ccc",
          },
        },
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
    },
  });
}
fetchData();
