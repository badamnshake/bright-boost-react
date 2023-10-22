import { Box } from "@mui/material";
import Header from "../../components/header";
import AnswersChart from "../../components/charts/answersChart";

const AnswersChartPage = () => {
  return (
    <Box m="20px">
      <Header title="Answers Chart" subtitle="How many questions were answered in each session" />
      <Box height="75vh">
        <AnswersChart />
      </Box>
    </Box>
  );
};

export default AnswersChartPage;