import React from 'react';
import { Button } from '@mui/material';
import './MealFilter.css';

const MealFilter = ({ labels, selectedLabel, onSelect }) => {
  return (
    <div className="meal-filter-container">
      {labels.map((label) => (
        <Button
          className="meals-button"
          key={label.id}
          variant={selectedLabel === label.id ? "contained" : "outlined"}
          onClick={() => onSelect(label.id)}
        >
          {label.label}
        </Button>
      ))}
    </div>
  );
};

export default MealFilter;
