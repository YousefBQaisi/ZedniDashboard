import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const UsersLineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User Count",
        data: [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the users API
    axios
      .get("http://localhost:4003/user/")
      .then((response) => {
        const userData = response.data;

        // Group user data by the created_at month and count users in each month
        const monthCounts = {};
        userData.forEach((user) => {
          const createdAtMonth = new Date(user.createdAt).getMonth();
          if (monthCounts[createdAtMonth]) {
            monthCounts[createdAtMonth]++;
          } else {
            monthCounts[createdAtMonth] = 1;
          }
        });

        // Create arrays for labels (months) and data (user counts)
        const labels = Object.keys(monthCounts).map((month) => {
          const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          return monthNames[parseInt(month)];
        });
        const data = Object.values(monthCounts);

        // Update the chart data
        setChartData({
          ...chartData,
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0], // Keep existing dataset properties
              data: data,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h2 className="text-gray-700 text-2xl text-center mb-8">
        User Registration by Month
      </h2>
      <Line data={chartData} />
    </div>
  );
};

export default UsersLineChart;
