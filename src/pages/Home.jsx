// import React from "react";
import React, { useEffect, useState } from "react";
import Posts from "../admin/posts";
import PostLoadingComponent from "../posts/postLoading";
// import DetectedImage from "../pages/DetectedImage ";
import DetectedImage from "./DetectedImage";
import Authentication from "./Authentication";
// import axiosInstance from "../axios";
import "../index.css";
import axios from "axios";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const [data, setData] = useState([]);
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });
  const [usernames, setUsernames] = useState({}); // State to store the usernames

  const [userCount, setUserCount] = useState(null);

  // Fetch data from the backend API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/all_diseases/"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Transform backend data to the format expected by the BarChart
  const transformedData = data.map((item) => ({
    severity: (item.severity * 100).toFixed(2),
    name: (item.severity * 100).toFixed(2),
    // diseases: item.diseases,
    diseases: item.diseases_summary,
  }));

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/deseaseDetail/")
      .then((response) => {
        setUserCount(response.data.desease_count);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    // <div className="">
    <main className="main-container mt-24">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner gap-2">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>
            <DetectedImage />
          </h1>
        </div>
        <div className="card">
          <div className="card-inner gap-2">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon " />
          </div>
          <h1>3</h1>
        </div>
        <div className="card">
          <div className="card-inner gap-2">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>
            <Authentication />
          </h1>
        </div>
        <div className="card">
          <div className="card-inner gap-2">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>0</h1>
        </div>
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={transformedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="diseases" fill="#d50000" />
            <Bar dataKey="severity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={transformedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="diseases"
              stroke="#d50000"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="severity"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
