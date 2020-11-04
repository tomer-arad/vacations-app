import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

const classes = {
    title: {
        fontWeight: 500,
        textAlign: 'center',
        fontSize: 50,
        color: 'white',
    },
}

const Stats = ({ data }) => {

    const sortVacations = _.sortBy(data, 'country');
    const countries = _.map(sortVacations, 'country');
    const sortedCountries = _.sortedUniq(countries);
    const chartData = sortedCountries.map((country) => {
        const findVacations = data.filter((vacation) => vacation.country === country);
        const vacationData = findVacations.map((vac) => {
            return {
                name: vac.destination,
                value: vac.likes
            }
        })
        return {
            name: country,
            data: vacationData
        }
    })

    const options = {
        colors: ['#00abf5', '#48ee16', '#ED561B', '#DDDF00', '#1df77f', '#ff74e8',   
             '#FF9655', '#FFF263', '#6AF9C4'],
        chart: {
            type: 'packedbubble',
            height: '65%',
            backgroundColor: '#2b0028',
            spacingTop: 80,
            spacingBottom: 50,
            spacingLeft: 50,
            spacingRight: 50,
            marginTop: -40,
            marginBottom: -40
        },
        title: {
            text: '',
        },
        tooltip: {
            useHTML: true,
            pointFormat: '<b>{point.name}:</b> {point.value} Followers',
        },
        plotOptions: {
            packedbubble: {
                minSize: '30%',
                maxSize: '150%',
                zMin: 0,
                zMax: 1000,
                layoutAlgorithm: {
                    splitSeries: false,
                    gravitationalConstant: 0.02
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    filter: {
                        property: 'y',
                        operator: '>',
                        value: 0
                    },
                    style: {
                        color: 'black',
                        textOutline: 'black',
                        fontWeight: 300,
                        fontSize: '16px'
                    }
                },
            }
        },
        legend: {
            itemStyle: {
                font: '20px Trebuchet MS, Verdana, sans-serif',
                color: '#cbffca'
            },
            itemHoverStyle:{
                color: '#009c34'
            },
        },
        series: chartData,
      }

    return (
        <Grid container >
            <h1 style={classes.title}>Comparing Vacations by Followers</h1>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Grid>
        </Grid>
    )
}

export default Stats;