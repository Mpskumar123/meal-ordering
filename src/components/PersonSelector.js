import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import './PersonSelector.css'; // Ensure this is the path to your CSS file

const PersonSelector = ({ persons, selectedPerson, onSelect, selectedMeals }) => {
  return (
    <Box className="flight-container">
      <Box display="flex" alignItems="center" className="flight-header">
        <FlightIcon className="rotate-icon" style={{ marginRight: '8px' }} />
        <Typography variant="h6">Select meal</Typography>
      </Box>
      <Box className="selector" p={2} mt={2}>
        <Typography variant="body2">Riga – St Petersburg</Typography>
        <Typography variant="caption">Flight duration: 1h 40m</Typography>
        {persons.map((person, index) => {
          const hasSelectedMeal = (selectedMeals[index] || []).length > 0;

          return (
            <Box key={index} className="person-row">
              <Button
                variant={selectedPerson === index ? "contained" : "outlined"}
                color="primary"
                onClick={() => onSelect(index)}
                className="person-button"
              >
                {person}
              </Button>
              <Typography
                variant="caption"
                className={`meal-status ${hasSelectedMeal ? 'selected' : ''}`}
              >
                {hasSelectedMeal ? "Meal selected" : "Meal not selected"}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default PersonSelector;
