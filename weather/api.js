const API_KEY = "8abcc05e965105a7df55aa272c5030bf";
export async function fetch_coords(area) {
    let response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${area}&appid=${API_KEY}`,
        { mode: "cors" }
    );

    let data = await response.json();
    return { lat: data[0].lat, lon: data[0].lon };
}

export async function fetch_weather(area) {
    let coords = await fetch_coords(area);
    let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`,
        { mode: "cors" }
    );
    let data = await response.json();

    return data;
}

fetch_weather("avadi").then((r) => {
    console.log(r);
});
