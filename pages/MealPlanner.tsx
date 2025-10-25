
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Meal, PlannedMeal, NutritionalInfo, Ingredient } from '../types';
import { calculateNutrition } from '../services/geminiService';
import Calendar from '../components/planner/Calendar';
import DailyMeals from '../components/planner/DailyMeals';
import MealDesigner from '../components/planner/MealDesigner';
import NewsFeed from '../components/planner/NewsFeed';
import DailyNutritionSummary from '../components/planner/DailyNutritionSummary';

// Mock Data
const mockMeals: Meal[] = [
  { id: 'm1', name: 'Grilled Chicken Salad', ingredients: [{ name: 'Chicken Breast', amount: '150', unit: 'g' }, { name: 'Lettuce', amount: '100', unit: 'g' }, { name: 'Tomato', amount: '50', unit: 'g' }] },
  { id: 'm2', name: 'Oatmeal with Berries', ingredients: [{ name: 'Rolled Oats', amount: '50', unit: 'g' }, { name: 'Mixed Berries', amount: '80', unit: 'g' }, { name: 'Almond Milk', amount: '150', unit: 'mL' }] },
  { id: 'm3', name: 'Salmon and Asparagus', ingredients: [{ name: 'Salmon Fillet', amount: '200', unit: 'g' }, { name: 'Asparagus', amount: '150', unit: 'g' }, { name: 'Lemon', amount: '0.5', unit: 'piece(s)' }] },
];

const getTodayString = () => new Date().toISOString().split('T')[0];

const mockPlannedMeals: PlannedMeal[] = [
  { date: getTodayString(), mealType: 'Breakfast', mealId: 'm2' },
  { date: getTodayString(), mealType: 'Lunch', mealId: 'm1' },
  { date: getTodayString(), mealType: 'Dinner', mealId: 'm3' },
];

const MealPlanner: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>(mockPlannedMeals);
  const [mealNutrients, setMealNutrients] = useState<Map<string, NutritionalInfo | 'loading' | null>>(new Map());

  const handleSaveMeal = (newMealData: Omit<Meal, 'id'>) => {
    const newMeal: Meal = {
      id: `m${Date.now()}`,
      ...newMealData,
    };
    setMeals(prev => [...prev, newMeal]);
  };

  const mealsForSelectedDay = useMemo(() => {
    const dateString = selectedDate.toISOString().split('T')[0];
    const mealIds = plannedMeals
      .filter(pm => pm.date === dateString)
      .map(pm => pm.mealId);
    return meals.filter(m => mealIds.includes(m.id));
  }, [selectedDate, plannedMeals, meals]);

  useEffect(() => {
    const fetchMealNutrition = async (meal: Meal) => {
      if (mealNutrients.has(meal.id) || meal.ingredients.length === 0) {
        return;
      }
      setMealNutrients(prev => new Map(prev).set(meal.id, 'loading'));
      try {
        const nutritionData = await calculateNutrition(meal.ingredients);
        setMealNutrients(prev => new Map(prev).set(meal.id, nutritionData));
      } catch (error) {
        console.error(`Failed to fetch nutrition for meal ${meal.id}`, error);
        setMealNutrients(prev => new Map(prev).set(meal.id, null));
      }
    };

    mealsForSelectedDay.forEach(meal => {
      fetchMealNutrition(meal);
    });
  }, [mealsForSelectedDay, mealNutrients]);

  const { dailyNutrition, isNutritionLoading } = useMemo(() => {
    let isLoading = false;
    const total: NutritionalInfo = { protein: 0, fat: 0, carbs: 0, sugar: 0 };
    let hasData = false;

    for (const meal of mealsForSelectedDay) {
      const nutrition = mealNutrients.get(meal.id);
      if (nutrition === 'loading') {
        isLoading = true;
      } else if (nutrition) {
        hasData = true;
        total.protein += nutrition.protein;
        total.fat += nutrition.fat;
        total.carbs += nutrition.carbs;
        total.sugar += nutrition.sugar;
      }
    }
    return { dailyNutrition: hasData ? total : null, isNutritionLoading: isLoading };
  }, [mealsForSelectedDay, mealNutrients]);

  const ingredientsForNewsFeed = useMemo(() => {
    return [...new Set(mealsForSelectedDay.flatMap(m => m.ingredients.map(i => i.name)))];
  }, [mealsForSelectedDay]);

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-2xl -m-4 sm:-m-6 lg:-m-8">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/3845806/3845806-hd_1920_1080_25fps.mp4"
          poster="https://images.pexels.com/videos/3845806/pictures/preview-0.jpg"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
      </div>

      {/* Scrollable Content Area */}
      <div className="relative z-10 h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white text-center tracking-wider">
            Meal Planner
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left side: Calendar and Daily View */}
            <div className="lg:col-span-3 space-y-8">
              <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                plannedMeals={plannedMeals}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
              />
              <DailyNutritionSummary
                nutrition={dailyNutrition}
                isLoading={isNutritionLoading}
              />
              <DailyMeals
                selectedDate={selectedDate}
                plannedMeals={plannedMeals}
                meals={meals}
                mealNutrients={mealNutrients}
              />
            </div>
            {/* Right side: Designer and News */}
            <div className="lg:col-span-2 space-y-8">
              <div className="sticky top-8 space-y-8">
                <MealDesigner onMealSave={handleSaveMeal} />
                <NewsFeed ingredients={ingredientsForNewsFeed} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
