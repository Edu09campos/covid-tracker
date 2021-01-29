import axios from "axios";

const url = "https://disease.sh/v3/covid-19";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country !== "Global") {
    changeableUrl = `${url}/countries/${country}`;
  } else {
    changeableUrl = `${url}/all`;
  }

  try {
    const { data } = await axios.get(changeableUrl);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyRate = async () => {
  try {
    const { data } = await axios.get(`${url}/historical/all?lastdays=100`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);

    let countries = data.map((country) => ({
      name: country.country,
      iso: country.countryInfo.iso2,
    }));

    countries.unshift({ name: "Global", iso: null });

    return countries;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountriesData = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);

    return data;
  } catch (error) {
    console.log(error);
  }
};
