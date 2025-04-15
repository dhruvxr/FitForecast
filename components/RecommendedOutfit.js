// components/RecommendedOutfit.js
import { useState, useEffect } from "react";
import { firestore } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";

export default function RecommendedOutfit({ city }) {
  const [recommended, setRecommended] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeatherAndRecommend = async () => {
      try {
        // Fetch current weather data
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"5e960bde50fecc592861bb88a63ff770"}&units=metric`
        );
        const weatherData = response.data;
        const temperature = weatherData.main.temp;

        // Determine a simple weather condition
        let weatherTag = "";
        if (temperature < 10) weatherTag = "cold";
        else if (temperature > 25) weatherTag = "hot";
        else weatherTag = "rainy"; // as an example condition

        // Query Firestore for an item matching the weather tag.
        const q = query(
          collection(firestore, "clothes"),
          where("tags", "array-contains", weatherTag)
        );
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => doc.data());
        setRecommended(items[0]); // simple demo: pick the first result
      } catch (error) {
        console.error("Error fetching recommendation:", error);
      }
    };

    if (city) fetchWeatherAndRecommend();
  }, [city, API_KEY]);

  if (!recommended) return <div>No recommendation available at this time.</div>;

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-xl font-bold mb-2">Recommended Outfit</h3>
      <img src={recommended.imageUrl} alt={recommended.name} className="h-48 w-full object-cover rounded mb-2" />
      <p>{recommended.name}</p>
    </div>
  );
}
