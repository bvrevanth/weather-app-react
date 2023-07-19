import axios from "axios";
import React, { useEffect, useState } from "react";
import { WiHumidity } from "react-icons/wi";
import { TiWeatherWindy, TiWeatherSunny } from "react-icons/ti";

const App = () => {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");

  const search = async () => {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=16c471eea1873622c8dd2db38721a249`
      )
      .then((res) => setData(res.data))
      .catch((err) => err);
  };

  const change = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div
        className="container d-flex justify-content-center my-3 align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="p-3"
          style={{
            borderRadius: "10px",
            boxShadow: "2px 2px 10px silver",
          }}
        >
          <h2>Weather API project</h2>
          <input
            className="my-2"
            type="search"
            placeholder="Search City"
            onChange={change}
            value={input}
            style={{ outline: "none", width: "100%" }}
          />
          <div className="d-flex justify-content-end">
            <button
              style={{ border: "none", backgroundColor: "lightblue" }}
              onClick={search}
            >
              Search
            </button>
          </div>
          <hr />
          <div className="d-flex justify-content-center align-items-center flex-column">
            {data ? (
              <>
                <h3>
                  {Math.round(data.main.temp - 273.15)} &nbsp;
                  <sup>o</sup>C
                </h3>
                <div className="row">
                  <div className="d-flex col-lg-4 col-12 justify-content-center flex-column">
                    <div className="d-flex">
                      Pressure <TiWeatherSunny style={{ fontSize: "30px" }} />
                    </div>
                    {data.main.pressure}
                  </div>
                  <div className="d-flex col-lg-4 col-12 justify-content-center flex-column">
                    <div className="d-flex">
                      Humidity <WiHumidity style={{ fontSize: "30px" }} />
                    </div>
                    {data.main.humidity}
                  </div>
                  <div className="d-flex col-lg-4 col-12 justify-content-center flex-column">
                    <div className="d-flex">
                      Wind <TiWeatherWindy style={{ fontSize: "30px" }} />
                    </div>
                    {data.wind.speed} km/h
                  </div>
                  <div className="mt-5 mb-2 d-flex justify-content-center">
                    <h2>{data.name}</h2>
                  </div>
                </div>
              </>
            ) : (
              "Search Any City"
            )}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default App;
