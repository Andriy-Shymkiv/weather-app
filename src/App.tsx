import { Box, Button, OutlinedInput, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { WeatherData } from './types/WeatherData';
import { getWeather } from './api/weather';

const StyledInput = styled(OutlinedInput)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(6),
}));

export const App = (): JSX.Element => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [city, setCity] = useState<string>('ternopil');

  useEffect(() => {
    const getAndSetWeather = async (): Promise<void> => {
      const weather = await getWeather(city);
      setWeatherData(weather);
    };

    try {
      getAndSetWeather();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const weather = await getWeather(city.trim());
    setWeatherData(weather);
  };

  return (
    <Box>
      <Typography variant="h3" mb={4}>
        Weather App
      </Typography>

      <StyledForm onSubmit={onSubmit}>
        <StyledInput size="small" fullWidth name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        <Button type="submit" variant="outlined">
          search
        </Button>
      </StyledForm>

      <Box textAlign={'center'} mb={2}>
        <Typography>city: {weatherData?.location.name}</Typography>
        <Typography>region: {weatherData?.location.region}</Typography>
        <Typography>country: {weatherData?.location.country}</Typography>
        <Typography>local time: {weatherData?.location.localtime}</Typography>
      </Box>

      <Box textAlign={'center'}>
        <Typography>celsius temperature: {weatherData?.current.temp_c}</Typography>
        <Typography>fahrenheit temperature: {weatherData?.current.temp_f}</Typography>
        <Typography>description: {weatherData?.current.condition.text}</Typography>
      </Box>
    </Box>
  );
};
