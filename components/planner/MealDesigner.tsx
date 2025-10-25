
import React, { useState, useCallback } from 'react';
import { Ingredient, Meal } from '../../types';
import { searchIngredients } from '../../services/geminiService';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';
import { ICONS, FOOD_UNITS } from '../../constants';

interface MealDesignerProps {
  onMealSave: (meal: Omit<Meal, 'id'>) => void;
}

const MealDesigner: React.FC<MealDesignerProps> = ({ onMealSave }) => {
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientQuery, setIngredientQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!ingredientQuery.trim()) return;
    setIsLoading(true);
    const results = await searchIngredients(ingredientQuery);
    setSearchResults(results);
    setIsLoading(false);
  }, [ingredientQuery]);

  const addIngredient = (name: string) => {
    setIngredients([...ingredients, { name, amount: '', unit: 'g' }]);
    setIngredientQuery('');
    setSearchResults([]);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (mealName.trim() && ingredients.length > 0) {
      onMealSave({ name: mealName, ingredients });
      setMealName('');
      setIngredients([]);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Design a Meal</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={mealName}
          onChange={e => setMealName(e.target.value)}
          placeholder="Meal Name (e.g., 'Chicken Salad')"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
        
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Ingredients</h3>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={ingredientQuery}
              onChange={e => setIngredientQuery(e.target.value)}
              placeholder="Search for an ingredient..."
              className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <button onClick={handleSearch} disabled={isLoading} className="bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-500 disabled:bg-slate-600">
              {isLoading ? <Spinner size="sm" /> : ICONS.search}
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="max-h-40 overflow-y-auto bg-slate-900 p-2 rounded-lg">
              {searchResults.map((res, i) => (
                <button key={i} onClick={() => addIngredient(res)} className="w-full text-left p-2 rounded-md hover:bg-slate-700">{res}</button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="flex-grow text-white">{ing.name}</span>
              <input type="number" value={ing.amount} onChange={e => updateIngredient(i, 'amount', e.target.value)} className="w-20 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-center" placeholder="Amt" />
              <select
                value={ing.unit}
                onChange={e => updateIngredient(i, 'unit', e.target.value)}
                className="w-24 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-center appearance-none"
              >
                {FOOD_UNITS.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <button onClick={() => removeIngredient(i)} className="text-red-400 hover:text-red-300">{ICONS.trash}</button>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={!mealName.trim() || ingredients.length === 0}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Save Meal
        </button>
      </div>
    </Card>
  );
};

export default MealDesigner;
