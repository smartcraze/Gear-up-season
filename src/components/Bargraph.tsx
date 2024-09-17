'use client'

import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Grid, Card, CardContent, Container } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Bargraph: React.FC = () => {

    // fetching the api
    useEffect(()=>{
        const url = ""
        const fetchdata = async()=>{
            const response = await fetch(url);

        }

    }) 


  // Sample data for the bar chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Daily visits (people)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        data: [300, 450, 500, 600, 700, 650, 400, 350, 500, 600, 700, 750],
      },
      {
        label: 'Daily visits (control)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        data: [200, 300, 400, 550, 600, 500, 450, 400, 550, 650, 600, 700],
      },
    ],
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Analytics Dashboard
          </Typography>
         
        </Toolbar>
      </AppBar>

      <Container>
        {/* Statistics Cards */}
        <Box mt={3}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Card style={{ backgroundColor: '#3f51b5' }}>
                <CardContent>
                  <Typography variant="h5">5.3 MM</Typography>
                  <Typography variant="subtitle1">Hourly</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card style={{ backgroundColor: '#00acc1' }}>
                <CardContent>
                  <Typography variant="h5">58K</Typography>
                  <Typography variant="subtitle1">Weekly</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card style={{ backgroundColor: '#4caf50' }}>
                <CardContent>
                  <Typography variant="h5">1.03%</Typography>
                  <Typography variant="subtitle1">Monthly</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card style={{ backgroundColor: '#ff9800' }}>
                <CardContent>
                  <Typography variant="h5">$0.15</Typography>
                  <Typography variant="subtitle1">yearly</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Bar Chart */}
        <Box mt={5}>
          <Typography variant="h6">Foot Traffic Measurement</Typography>
          <Bar data={chartData} />
        </Box>

        {/* Foot Traffic Lift */}
        <Box mt={3}>
          <Typography variant="h6">Foot Traffic Lift</Typography>
          <Typography variant="h4">5.7%</Typography>
          <Typography variant="body1">95.6% Confidence</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Bargraph;
