import React, { useState, useEffect } from "react"
import "./App.css"

function App() {
	const api = {
		base: `https://api.openweathermap.org/data/2.5/`,
		key: `f3fb0ae008e50865f5b486176509ae99`,
	}
	const [cityName, setCityName] = useState("")
	const [data, setData] = useState("")
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")

	const tempConverter = (temp) => {
		let celsius
		celsius = Math.round(temp - 273.15)

		return celsius
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setCityName(e.target[0].value)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (!cityName) return
			setLoading(true)
			try {
				const response = await fetch(
					`${api.base}weather?q=${cityName}&appid=${api.key}`
				)
				const result = await response.json()
				if (response.ok) {
					setData(result)
					setErrorMessage("")
				} else {
					setErrorMessage(result.message)
				}
			} catch (error) {
				setErrorMessage(error.message)
			}
			setLoading(false)
		}
		fetchData()
		console.log(data)
	}, [cityName])

	return (
		<div className="App">
			<div className="card">
				<form className="info title" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder={data.name ? data.name : "city name"}
					/>
					<button type="submit">Search</button>
				</form>
				{loading ? (
					<div>loading ...</div>
				) : (
					<>
						{errorMessage ? (
							<div className="error">{errorMessage}</div>
						) : (
							data && (
								<div>
									<div className="info">
										<h2>Temp: {tempConverter(data.main.temp)} °C</h2>
										<h2>
											Feels like: {tempConverter(data.main.feels_like)} °C
										</h2>
									</div>
									<div className="info">
										<h2>Weather: {data.weather[0].main}</h2>
										<h2>Humidity: {data.main.humidity}</h2>
									</div>
									<div className="info">
										<h2>Wind Speed: {data.wind.speed}</h2>
										<h2>Wind Degrees: {data.wind.deg}</h2>
									</div>
								</div>
							)
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default App
