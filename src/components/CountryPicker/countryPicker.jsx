import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import {fetchCountries} from '../../api';

import styles from './countryPicker.module.css';

function countryToFlag(isoCode) {
    return isoCode !== undefined
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

const useStyles = makeStyles({
    option: {
      fontSize: 15,
      '& > span': {
        marginRight: 10,
        fontSize: 18,
      },
    },
  });

function CountryPicker({handleCountryChange}) {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchApi = async () => {
            setFetchedCountries(await fetchCountries())
        }

        fetchApi();
    }, [setFetchedCountries])

    return (
        <Autocomplete
            className={styles.formControl}
            options={fetchedCountries}
            classes={{
                option: classes.option,
            }}
            autoComplete
            autoHighlight
            getOptionLabel={(option) => option.name}
            defaultValue="Global"
            onChange={(event, value) => {
                if(value)
                    handleCountryChange(value.name)
            }}
            renderOption={(option) => (
                <>
                    <span>{countryToFlag(option.iso)}</span>
                    {option.name}
                </>
            )}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Choose a country"
                variant="outlined"
                inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password',
                }}
                />
            )}
        />
    )
}

export default CountryPicker;