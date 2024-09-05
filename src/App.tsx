import { useEffect, useState } from "react";
import "./index.css";
import Card from "./components/card/Card";

export interface Countries {
  flags: {
    svg: string;
  };
  translations: {
    fra: {
      common: string;
    };
  };
  capital: string;
  population: number;
}
function App() {
  const [data, setData] = useState<Countries[]>([]);
  const [rangeValue, setRangeValue] = useState<string | number>(40);
  const getCountries = async () => {
    const rest = await fetch("https://restcountries.com/v3.1/all");
    const countries = (await rest.json()) as Countries[];
    setData(countries);
  };
  useEffect(() => {
    getCountries();
  }, []);
  function changeCountries(e: React.ChangeEvent<HTMLInputElement>) {
    setRangeValue(e.target.value);
  }
  return (
    <>
      <div className="mt-10 container">
        <div className="container mb-4 text-center">
          <input
            className="translate-y-1 w-full"
            type="range"
            min="1"
            max="250"
            defaultValue={rangeValue}
            onChange={changeCountries}
          />
        </div>
        <div className="flex justify-center flex-wrap items-center gap-4">
          {data
            .sort((a, b) => b.population - a.population)
            .slice(0, rangeValue)
            .map((country, index) => (
              <Card key={index} country={country} />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
