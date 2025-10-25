
import React from 'react';
import { PlannedMeal, Meal, NutritionalInfo } from '../../types';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';

interface DailyMealsProps {
  selectedDate: Date;
  plannedMeals: PlannedMeal[];
  meals: Meal[];
  mealNutrients: Map<string, NutritionalInfo | 'loading' | null>;
}

const MealNutritionDisplay: React.FC<{ nutrition: NutritionalInfo }> = ({ nutrition }) => (
  <div className="grid grid-cols-4 gap-2 mt-3 text-xs text-center">
    <div className="bg-red-500/20 p-1 rounded">
      <p className="font-bold text-red-300">{Math.round(nutrition.protein)}g</p>
      <p className="block text-slate-400 text-[10px] leading-tight">Protein</p>
    </div>
    <div className="bg-yellow-500/20 p-1 rounded">
      <p className="font-bold text-yellow-300">{Math.round(nutrition.carbs)}g</p>
      <p className="block text-slate-400 text-[10px] leading-tight">Carbs</p>
    </div>
    <div className="bg-purple-500/20 p-1 rounded">
      <p className="font-bold text-purple-300">{Math.round(nutrition.fat)}g</p>
      <p className="block text-slate-400 text-[10px] leading-tight">Fat</p>
    </div>
    <div className="bg-sky-500/20 p-1 rounded">
      <p className="font-bold text-sky-300">{Math.round(nutrition.sugar)}g</p>
      <p className="block text-slate-400 text-[10px] leading-tight">Sugar</p>
    </div>
  </div>
);

const DailyMeals: React.FC<DailyMealsProps> = ({ selectedDate, plannedMeals, meals, mealNutrients }) => {
  const dateString = selectedDate.toISOString().split('T')[0];
  const mealsForDay = plannedMeals.filter(pm => pm.date === dateString);

  const getMealById = (id: string) => meals.find(m => m.id === id);

  const mealTypes: ('Breakfast' | 'Lunch' | 'Dinner' | 'Snack')[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Meals for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </h2>
      {mealsForDay.length === 0 ? (
        <p className="text-slate-400">No meals planned for this day.</p>
      ) : (
        <div className="space-y-4">
          {mealTypes.map(type => {
            const planned = mealsForDay.find(pm => pm.mealType === type);
            if (!planned) return null;
            const meal = getMealById(planned.mealId);
            if (!meal) return null;

            const nutrition = mealNutrients.get(meal.id);

            return (
              <div key={type} className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-sky-400">{type}</h3>
                <p className="font-semibold text-white mt-1">{meal.name}</p>
                <ul className="list-disc list-inside text-sm text-slate-300 mt-2">
                  {meal.ingredients.map((ing, i) => (
                    <li key={i}>{ing.name} ({ing.amount} {ing.unit})</li>
                  ))}
                </ul>
                {nutrition === 'loading' && <div className="flex justify-center mt-3"><Spinner size="sm" /></div>}
                {nutrition && typeof nutrition === 'object' && <MealNutritionDisplay nutrition={nutrition} />}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default DailyMeals;
