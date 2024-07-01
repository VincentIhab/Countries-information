export default async function TopCityModel(callBackFunction) {
  const cities = [
    "San Francisco",
    "Amsterdam",
    "London",
    "Cairo",
    "Barcelona",
    "Tokyo",
  ];
  let data = [];
  for (const city of cities) {
    data.push(await callBackFunction(city));
  }
  return data;
}
