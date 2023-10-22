import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

const AnswersChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Step 1: Create state for selected date range and subject
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState("Math");

  // Step 2: Fetch data from an API using useEffect
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Replace the following with your API fetch logic
    // You should pass selectedStartDate, selectedEndDate, and selectedSubject as query parameters
    const startDate = selectedStartDate;
    const endDate = selectedEndDate;
    getChartData(startDate, endDate, selectedSubject);
  }, [selectedStartDate, selectedEndDate, selectedSubject]);

  const getChartData = async (startDate, endDate, subjectId) => {
    let cData = await axios.get("/items/Question", {
      params: {
        "filter[answered_time][_null]": "false",
        "deep[session_id][_filter][subject_id][_eq]": "1",
        // "deep[session_id][_filter][start_time][_between]": "",
        "aggregate[count]": "*",
        "groupBy[]": "session_id",
      },
    });
    setChartData(cData.data.data);
    console.log(cData.data.data);
  };

  return (
    <>
      {chartData && (
        <ResponsiveBar
          data={chartData}
          theme={{
            // added
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          keys={["count"]}
          indexBy="session_id"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          borderColor={{
            from: "color",
            modifiers: [["darker", "1.6"]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "session id", // changed
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "attendance", // changed
            legendPosition: "middle",
            legendOffset: -40,
          }}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: "color",
            modifiers: [["darker", 1.6]],
          }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          role="application"
          // barAriaLabel={function (e) {
          //   return (
          //     e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          //   );
          // }}
        />
      )}
    </>
  );
};

export default AnswersChart;


      // <input
      //   type="date"
      //   value={selectedStartDate}
      //   onChange={(e) => setSelectedStartDate(e.target.value)}
      // />

      // {/* Use browser's built-in date picker for end date selection */}
      // <input
      //   type="date"
      //   value={selectedEndDate}
      //   onChange={(e) => setSelectedEndDate(e.target.value)}
      // />

      // {/* Use Material-UI Select for subject selection */}
      // <select
      //   value={selectedSubject}
      //   onChange={(e) => setSelectedSubject(e.target.value)}
      // >
      //   <option value="1" label="Math">
      //     Math
      //   </option>
      //   <option value="2" label="Science">
      //     Science
      //   </option>
      //   {/* Add more subject options as needed */}
      // </select>