
import React from 'react';
import Card from '../components/ui/Card';
import { ICONS } from '../constants';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Reminders */}
        <Card className="p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Today's Medication Reminders</h2>
          <ul className="space-y-3">
            <li className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Metformin</p>
                <p className="text-sm text-slate-400">500mg</p>
              </div>
              <p className="font-mono text-sky-400">8:00 AM</p>
            </li>
            <li className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Vitamin D3</p>
                <p className="text-sm text-slate-400">5000 IU</p>
              </div>
              <p className="font-mono text-sky-400">9:00 AM</p>
            </li>
             <li className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div>
                <p className="font-medium text-white">Lisinopril</p>
                <p className="text-sm text-slate-400">10mg</p>
              </div>
              <p className="font-mono text-sky-400">8:00 PM</p>
            </li>
          </ul>
        </Card>

        {/* Current Med List */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">My Current Medications</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-sky-400">{ICONS.oral}</span>
              <span>Metformin 500mg</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sky-400">{ICONS.oral}</span>
              <span>Lisinopril 10mg</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sky-400">{ICONS.oral}</span>
              <span>Vitamin D3 5000 IU</span>
            </li>
             <li className="flex items-center gap-3">
              <span className="text-sky-400">{ICONS.injection}</span>
              <span>Testosterone Cypionate 100mg</span>
            </li>
          </ul>
        </Card>

        {/* Weight Tracker Preview */}
        <Card className="p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold text-white mb-4">Weight & BMI Trend</h2>
          <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Weight chart will be displayed here.</p>
          </div>
        </Card>

        {/* Caloric Intake Preview */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Weekly Caloric Intake</h2>
          <div className="h-64 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <p className="text-slate-400">Calorie chart will be displayed here.</p>
          </div>
        </Card>
        
        {/* Meal Plan */}
        <Card className="p-6 col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold text-white mb-4">Today's Meal Plan</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white">Breakfast</h3>
                <p className="text-sm text-slate-300 mt-2">Oatmeal with berries</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white">Lunch</h3>
                <p className="text-sm text-slate-300 mt-2">Grilled Chicken Salad</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-white">Dinner</h3>
                <p className="text-sm text-slate-300 mt-2">Salmon with Asparagus</p>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
