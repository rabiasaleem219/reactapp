import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import { useState } from "react";
import { fetchWithToken } from "helpers/fetch";
import { endPoints } from "const/endPoints";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const label = "$"
const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)"
]
const borderWidth = 0.5

export const data = [{
  labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Sale in $",
      data: [0, 0, 0, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)"
      ],
      borderWidth: 0.5
    },
  ]
}]

const options = {
  plugins: {
    legend: false,
  }
}


const Stats = () => {
  const [chartData, setChartData] = useState([])
  const [lifeTimeSale, setLifeTimeSale] = useState()
  const [year, setYear] = useState(2022)
  useEffect(async () => {
    const body = {
      year
    }
    const res = await fetchWithToken(endPoints.get_all_payments_for_charts, body, 'POST')
    const data = await res.json()
    const newData = []
    for (const course of data.data) {
      if (course.AllCoursesSale || course.AllCoursesSale === 0) {
        setLifeTimeSale(course.AllCoursesSale)
      }
      else {
        newData.push({
          courseTitle: course.CourseTitle,
          courseTotalSale: course.CourseTotalSale,
          totalStudents: course.TotalUser,
          data: {
            labels,
            datasets: [{ label, data: course.MonthsData, backgroundColor, borderWidth }]
          }
        })
      }
    }
    setChartData(newData)
  }, [year])



  const handleChange = (event) => {
    setYear(event.target.value);
  };

  if (chartData.length === 0) {
    return <Typography textAlign={"center"} fontSize='large' variant="h3">Sorry! No course found</Typography>
  }


  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="Year"
          defaultValue="2022"
          onChange={handleChange}
        >
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
        </Select>
      </FormControl>
      <br />
      {chartData.map(course =>
        <Card key={course.courseTitle} className="dib" sx={{ maxWidth: 600, p: 3, m: 3, maxHeight: 600 }}>
          <Doughnut data={course.data} options={options} />
          <Typography margin={3} gutterBottom variant="h5" component="div" textAlign={"center"}>
            {course.courseTitle}
          </Typography>
          <Typography margin={3} gutterBottom variant="h5" component="div" textAlign={"center"}>
            Estudiantes Totales: {course.totalStudents}
          </Typography>
          <Typography margin={3} gutterBottom variant="h5" component="div" textAlign={"center"}>
            Ventas totales: {course.courseTotalSale}$
          </Typography>
        </Card>)}
      <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>Ventas totales de todos los cursos : {lifeTimeSale}$</Typography>
    </>
  );

}
export default Stats;



