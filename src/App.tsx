import React from 'react';
import CostOfInactionCalculator from './components/CostOfInactionCalculator';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Cost of Inaction Calculator for Remodelers
        </h1>
        <CostOfInactionCalculator />
      </div>
    </div>
  );
}

export default App;
