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
    data.push(await callBackFunction(city, "f7d8f6fc7b4a30ec9ebc224d9f87a91f"));
  }
  return data;
}
