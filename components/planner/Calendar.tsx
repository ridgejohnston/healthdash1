
import React from 'react';
import { PlannedMeal } from '../../types';

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  plannedMeals: PlannedMeal[];
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange, plannedMeals, currentMonth, onMonthChange }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startingDay = firstDayOfMonth.getDay();

  const calendarDays = [];
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="w-full h-16"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateString = date.toISOString().split('T')[0];
    const isSelected = selectedDate.toDateString() === date.toDateString();
    const hasMeals = plannedMeals.some(pm => pm.date === dateString);

    calendarDays.push(
      <div
        key={day}
        onClick={() => onDateChange(date)}
        className={`w-full h-16 p-2 border border-slate-700/50 cursor-pointer transition-colors ${
          isSelected ? 'bg-sky-500/30' : 'hover:bg-slate-700'
        }`}
      >
        <div className="flex justify-between items-center">
          <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{day}</span>
          {hasMeals && <div className="w-2 h-2 rounded-full bg-green-400"></div>}
        </div>
      </div>
    );
  }

  const handlePrevMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-700">&lt;</button>
        <h3 className="text-lg font-bold text-white">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-700">&gt;</button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-slate-400 mb-2">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays}
      </div>
    </div>
  );
};

export default Calendar;
