import { useState, useEffect } from "react";
import axios from "axios";
import CountryDetail from "./components/CountryDetail";
import countryService from "./services/countries";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [weather, setWeather] = useState(null);

	const countriesToShow = countries.filter(country =>
		country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		countryService.getAll().then(allCountries => {
			setCountries(allCountries);
		});
	}, []);

	useEffect(() => {
		if (countriesToShow.length === 1) {
			const capital = countriesToShow[0].capital[0];
			const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

			axios
				.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
				.then(response => {
					setWeather(response.data);
				});
		} else {
			setWeather(null);
		}
	}, [searchTerm]);

	const renderCountries = () => {
		if (countriesToShow.length > 10) {
			return <p>Too many matches, specify another filter</p>;
		}

		if (countriesToShow.length > 1) {
			return (
				<div>
					<ul>
						{countriesToShow.map(country => (
							<li key={country.cca3}>
								{country.name.common}
								<button onClick={() => setSelectedCountry(country)}>show</button>
							</li>
						))}
					</ul>
					{selectedCountry && <CountryDetail country={selectedCountry} weather={null} />}
				</div>
			);
		}

		if (countriesToShow.length === 1) {
			const country = countriesToShow[0];

			return (
				<CountryDetail country={country} weather={weather} />
			);
		}

		return null;
	};

	return (
		<>
			<div>
				find countries <input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setSelectedCountry(null) }} />
			</div>
			{renderCountries()}
		</>
	);
};

export default App;
