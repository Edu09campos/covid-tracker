import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import CardComponent from './Card/card';
import styles from './cards.module.css';

function Cards({data: {confirmed, recovered, deaths, lastUpdate}, country}) {
    if(!confirmed) {
        return 'Loading...'
    }

    const title = (
        country
        ? <Typography gutterBottom variant="h4">Covid-19 status in <span style={{fontWeight:  "bold"}}>{country}</span></Typography> 
        : <Typography gutterBottom variant="h4">Covid-19 status <span style={{fontWeight: 'bold'}}>globally</span></Typography>
    )

    return (
        <div className={styles.container}>
            {title}
            <Grid container spacing={3} justify="center">
                <CardComponent
                    className={styles.infected}
                    cardTitle="Infected"
                    value={confirmed.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of active cases from COVID-19."
                />
                <CardComponent
                    className={styles.recovered}
                    cardTitle="Recovered"
                    value={recovered.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of recoveries from COVID-19."
                />
                <CardComponent
                    className={styles.deaths}
                    cardTitle="Deaths"
                    value={deaths.value}
                    lastUpdate={lastUpdate}
                    cardSubtitle="Number of deaths caused by COVID-19."
                />
            </Grid>
        </div>
    )
}

export default Cards;
