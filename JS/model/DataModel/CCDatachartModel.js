export default async function fetchData(countryCode) {
  // const countryCode = document.getElementById('countryInput').value.toUpperCase();
  const countryInfoUrl = `https://restcountries.com/v3.1/all`;
  const urls = [
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NE.EXP.GNFS.ZS?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NE.IMP.GNFS.ZS?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SL.UEM.TOTL.ZS?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.DYN.LE00.IN?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SI.POV.DDAY?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GNS.ICTR.ZS?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/SE.PRM.ENRR?format=json`,
    `https://api.worldbank.org/v2/country/${countryCode}/indicator/NE.CON.GOVT.ZS?format=json`,
  ];

  try {
    const [countryInfoResponse, ...responses] = await Promise.all([
      fetch(countryInfoUrl),
      ...urls.map((url) => fetch(url)),
    ]);
    const countryInfoData = await countryInfoResponse.json();
    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    const countryInfo = countryInfoData.find(
      (country) => country.cca2 === countryCode
    );
    if (countryInfo && data.every((d) => d[1])) {
      const years = data[0][1].map((entry) => entry.date).reverse();
      const gdpPerCapita = data[0][1].map((entry) => entry.value).reverse();
      const population = data[1][1].map((entry) => entry.value).reverse();
      const gdpGrowthRate = data[2][1].map((entry) => entry.value).reverse();
      const gdp = data[3][1].map((entry) => entry.value).reverse();
      const exports = data[4][1].map((entry) => entry.value).reverse();
      const imports = data[5][1].map((entry) => entry.value).reverse();
      const unemployment = data[6][1].map((entry) => entry.value).reverse();
      const inflation = data[7][1].map((entry) => entry.value).reverse();
      const lifeExpectancy = data[8][1].map((entry) => entry.value).reverse();
      const poverty = data[9][1].map((entry) => entry.value).reverse();
      const grossSavings = data[10][1].map((entry) => entry.value).reverse();
      const schoolEnrollment = data[11][1]
        .map((entry) => entry.value)
        .reverse();
      const governmentExpenditure = data[12][1]
        .map((entry) => entry.value)
        .reverse();

      // displayCountryInfo(countryInfo);
      createChart(
        years,
        gdpPerCapita,
        population,
        gdpGrowthRate,
        gdp,
        exports,
        imports,
        unemployment,
        inflation,
        lifeExpectancy,
        poverty,
        grossSavings,
        schoolEnrollment,
        governmentExpenditure
      );
    } else {
      alert("No data available for the entered country code.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function displayCountryInfo(countryInfo) {
//     const infoDiv = document.getElementById('countryInfo');
//     infoDiv.innerHTML = `
//         <h2>${countryInfo.name.common}</h2>
//         <p>Capital: ${countryInfo.capital[0]}</p>
//         <p>Region: ${countryInfo.region}</p>
//     `;
// }
function createChart(
  years,
  gdpPerCapita,
  population,
  gdpGrowthRate,
  gdp,
  exports,
  imports,
  unemployment,
  inflation,
  lifeExpectancy,
  poverty,
  grossSavings,
  schoolEnrollment,
  governmentExpenditure
) {
  const ctx = document.getElementById("economicChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "GDP per Capita (current US$)",
          data: gdpPerCapita,
          borderColor: "#3e95cd",
          backgroundColor: "rgba(62, 149, 205, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "rectRot",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: false, // Initially show this dataset
        },
        {
          label: "Population",
          data: population,
          borderColor: "#8e5ea2",
          backgroundColor: "rgba(142, 94, 162, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "triangle",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: false, // Initially show this dataset
        },
        {
          label: "GDP Growth Rate (%)",
          data: gdpGrowthRate,
          borderColor: "#3cba9f",
          backgroundColor: "rgba(60, 186, 159, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "GDP (current US$)",
          data: gdp,
          borderColor: "#e8c3b9",
          backgroundColor: "rgba(232, 195, 185, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "cross",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Exports of goods and services (% of GDP)",
          data: exports,
          borderColor: "#c45850",
          backgroundColor: "rgba(196, 88, 80, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "star",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Imports of goods and services (% of GDP)",
          data: imports,
          borderColor: "#ff6384",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "rect",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Unemployment Rate (%)",
          data: unemployment,
          borderColor: "#36a2eb",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "triangle",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Inflation Rate (%)",
          data: inflation,
          borderColor: "#ffce56",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Life Expectancy (years)",
          data: lifeExpectancy,
          borderColor: "#4bc0c0",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "rectRot",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Poverty Headcount Ratio (% of population)",
          data: poverty,
          borderColor: "#9966ff",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "star",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Gross Savings (% of GDP)",
          data: grossSavings,
          borderColor: "#ff9f40",
          backgroundColor: "rgba(255, 159, 64, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "crossRot",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "School Enrollment (%)",
          data: schoolEnrollment,
          borderColor: "#e74c3c",
          backgroundColor: "rgba(231, 76, 60, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "triangle",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
        },
        {
          label: "Government Expenditure (% of GDP)",
          data: governmentExpenditure,
          borderColor: "#27ae60",
          backgroundColor: "rgba(39, 174, 96, 0.2)",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointStyle: "rect",
          pointRadius: 5,
          pointHoverRadius: 8,
          hidden: true, // Initially hide this dataset
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
              size: 16,
            },
            color: "#f0f0f0",
          },
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
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
            color: "rgba(240, 240, 240, 0.2)",
          },
          ticks: {
            font: {
              size: 14,
            },
            color: "#f0f0f0",
          },
        },
        y: {
          grid: {
            display: true,
            color: "rgba(240, 240, 240, 0.2)",
          },
          ticks: {
            font: {
              size: 14,
            },
            color: "#f0f0f0",
          },
        },
      },
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
    },
  });

  // Create UI controls for dataset visibility
  const checkboxes = document.createElement("div");
  checkboxes.classList.add("checkboxes-container");

  chart.data.datasets.forEach((dataset, index) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `dataset-${index}`;
    checkbox.checked = !dataset.hidden; // Reflect dataset visibility
    checkbox.addEventListener("change", function () {
      chart.getDatasetMeta(index).hidden = !this.checked;
      chart.update();
    });

    const label = document.createElement("label");
    label.htmlFor = `dataset-${index}`;
    label.textContent = dataset.label;

    const checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);

    checkboxes.appendChild(checkboxContainer);
  });

  // Add checkboxes container to the chart container
  const chartContainer = document.getElementById("chartContainer");
  chartContainer.appendChild(checkboxes);
}
