import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MealFilter from './components/MealFilter';
import PersonSelector from './components/PersonSelector';
import MealCard from './components/MealCard';
import TotalPrice from './components/TotalPrice';
import { getMeals, getLabels } from './services/dataService';
import './App.css';

const App = () => {
  const [meals, setMeals] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState('All');
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const persons = ['Adult passenger 1', 'Adult passenger 2'];

  useEffect(() => {
    setMeals(getMeals());
    setLabels(getLabels());
  }, []);

  const handleSelectMeal = (mealId) => {
    setSelectedMeals((prevSelectedMeals) => {
      const personMeals = prevSelectedMeals[selectedPerson] || [];
      const isSelected = personMeals.some((meal) => meal.mealId === mealId);
      if (isSelected) {
        return {
          ...prevSelectedMeals,
          [selectedPerson]: personMeals.filter((meal) => meal.mealId !== mealId),
        };
      } else {
        return {
          ...prevSelectedMeals,
          [selectedPerson]: [
            ...personMeals,
            { mealId, drinkId: '' },
          ],
        };
      }
    });
  };

  const handleSelectDrink = (mealId, drinkId) => {
    setSelectedMeals((prevSelectedMeals) => {
      const personMeals = prevSelectedMeals[selectedPerson] || [];
      return {
        ...prevSelectedMeals,
        [selectedPerson]: personMeals.map((meal) =>
          meal.mealId === mealId
            ? { ...meal, drinkId: meal.drinkId === drinkId ? '' : drinkId }
            : meal
        ),
      };
    });
  };

  const filteredMeals = selectedLabel === 'All'
    ? meals
    : meals.filter((meal) => meal.labels.includes(selectedLabel));

  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMeals.length / itemsPerPage);

  const calculateTotalPrice = () => {
    return Object.values(selectedMeals).reduce((total, mealsArray) => {
      return total + mealsArray.reduce((subTotal, { mealId, drinkId }) => {
        const meal = meals.find((meal) => meal.id === mealId);
        const drink = meal?.drinks.find((drink) => drink.id === drinkId);
        return subTotal + (meal?.price || 0) + (drink?.price || 0);
      }, 0);
    }, 0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='app-container'>
      <div className='left-container'>
        <div className='top-container'>
          <MealFilter
            labels={labels}
            selectedLabel={selectedLabel}
            onSelect={setSelectedLabel}
          />
        </div>
        <div className='middle-container'>
          <Box display="flex" flexDirection="column">
            {paginatedMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onSelect={() => handleSelectMeal(meal.id)}
                selectedDrink={
                  (selectedMeals[selectedPerson] || []).find(
                    (selectedMeal) => selectedMeal.mealId === meal.id
                  )?.drinkId || ''
                }
                selectedMeal={
                  (selectedMeals[selectedPerson] || []).some(
                    (selectedMeal) => selectedMeal.mealId === meal.id
                  )
                }
                setSelectedDrink={(drinkId) => handleSelectDrink(meal.id, drinkId)}
              />
            ))}
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={i + 1 === currentPage ? 'contained' : 'outlined'}
                onClick={() => handlePageChange(i + 1)}
                style={{ margin: '0 5px' }}
              >
                {i + 1}
              </Button>
            ))}
          </Box>
        </div>
      </div>
      <div className='right-container'>
        <PersonSelector
          persons={persons}
          selectedPerson={selectedPerson}
          onSelect={setSelectedPerson}
          selectedMeals={selectedMeals}
        />
        <Box mt={2}>
          <Box>
            {(selectedMeals[selectedPerson] || []).map((selectedMeal, index) => {
              const meal = meals.find((meal) => meal.id === selectedMeal.mealId);
              const drink = meal?.drinks.find((drink) => drink.id === selectedMeal.drinkId);
              return (
                <Box key={index} mt={1}>
                  <Typography>{meal?.name}</Typography>
                  <Typography variant="body2">{drink?.name}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <TotalPrice totalPrice={calculateTotalPrice()} />
      </div>
    </div>
  );
};

export default App;
