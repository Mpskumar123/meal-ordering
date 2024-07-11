import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Divider } from '@mui/material';

const MealCard = ({ meal, onSelect, selectedDrink, setSelectedDrink, selectedMeal }) => {
  const handleDrinkClick = (drinkId) => {
    if (selectedMeal) {
      setSelectedDrink(drinkId);
    }
  };

  const handleSelectClick = () => {
    onSelect();
  };

  const getSelectedDrinkTitle = () => {
    const drink = meal.drinks.find((drink) => drink.id === selectedDrink);
    return drink ? drink.title : '';
  };

  return (
    <Card style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px', border: '1px solid #ccc' }}>
      <CardMedia
        style={{ width: 250, height: 200  }}
        image={meal.img}
        title={meal.title}
      />
      <Box display="flex" flexDirection="column" justifyContent="space-between" p={0} style={{ flex: '1 0 auto' }}>
        <CardContent>
          <Typography variant="h6">{meal.title}</Typography>
          <Typography variant="body2">Starter: {meal.starter}</Typography>
          <Typography variant="body2">Dessert: {meal.desert}</Typography>
          <Typography variant="body2" style={{ marginTop: '20px' }}>Selected drink: {getSelectedDrinkTitle()}</Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Box display="flex" alignItems="center" marginTop="20px">
            {meal.drinks.map((drink) => (
              <div key={drink.id} style={{ textAlign: 'center', margin: '0 10px' }}>
                <img
                  src={drink.image}
                  alt={drink.title}
                  style={{
                    width: 40,
                    height: 40,
                    border: selectedDrink === drink.id ? '2px solid blue' : '1px solid grey',
                    borderRadius: '4px',
                    cursor: selectedMeal ? 'pointer' : 'not-allowed',
                    opacity: selectedMeal ? 1 : 0.5,
                  }}
                  onClick={() => handleDrinkClick(drink.id)}
                />
                <Typography variant="body2">{drink.title}</Typography>
              </div>
            ))}
            <Box textAlign="center" marginLeft="90px">
              <Typography variant="h6" fontWeight="bold">
                {meal.price}€
              </Typography>
              <Button
                variant="outlined"
                onClick={handleSelectClick}
                sx={{
                  color: 'blue',
                  borderColor: 'blue',
                  backgroundColor: 'white',
                  marginLeft: '0px',
                  marginBottom: '0px',
                  '&:hover': {
                    backgroundColor: 'lightblue',
                  },
                }}
              >
                {selectedMeal ? 'Deselect' : 'Select'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default MealCard;
