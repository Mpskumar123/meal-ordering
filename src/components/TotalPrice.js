import React from 'react';
import { Typography } from '@mui/material';

const TotalPrice = ({ totalPrice }) => {
  return (
    <Typography variant="h6">
      Total Price: €{totalPrice.toFixed(2)}
    </Typography>
  );
};

export default TotalPrice;
