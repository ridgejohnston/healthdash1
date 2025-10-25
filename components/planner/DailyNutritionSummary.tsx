
import React from 'react';
import { NutritionalInfo } from '../../types';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';

interface DailyNutritionSummaryProps {
  nutrition: NutritionalInfo | null;
  isLoading: boolean;
}

const NutritionItem: React.FC<{ label: string; value: number | undefined; unit: string; color: string }> = ({ label, value, unit, color }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-slate-700/50 rounded-lg text-center">
    <p className="text-sm text-slate-400">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>
      {value !== undefined ? Math.round(value) : '-'}
    </p>
    <p className="text-xs text-slate-500">{unit}</p>
  </div>
);

const DailyNutritionSummary: React.FC<DailyNutritionSummaryProps> = ({ nutrition, isLoading }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Daily Nutrition Summary
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-24">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NutritionItem label="Protein" value={nutrition?.protein} unit="g" color="text-red-400" />
            <NutritionItem label="Carbs" value={nutrition?.carbs} unit="g" color="text-yellow-400" />
            <NutritionItem label="Fat" value={nutrition?.fat} unit="g" color="text-purple-400" />
            <NutritionItem label="Sugar" value={nutrition?.sugar} unit="g" color="text-sky-400" />
          </div>
          {!nutrition && (
            <p className="text-slate-400 text-center text-sm mt-4">Plan meals for this day to calculate nutrition.</p>
          )}
        </>
      )}
    </Card>
  );
};

export default DailyNutritionSummary;
