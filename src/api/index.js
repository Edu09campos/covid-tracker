import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
 
export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const {data : {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);

        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        };

    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyRate = async () => {
    try{

        const {data} = await axios.get(`${url}/daily`);

        const customData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))


        let finalData = [];
        customData.forEach((day) => {
            let date = new Date(day.date)
            if(date.getDay() === 0){
                finalData.push(day)
            }
        })

        return finalData;

    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}