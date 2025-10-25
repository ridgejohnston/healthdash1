
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeightEntry } from '../types';
import Card from '../components/ui/Card';
import GeneralSearch from '../components/ui/GeneralSearch';

const generateMockData = (numDays: number): WeightEntry[] => {
  const data: WeightEntry[] = [];
  const today = new Date();
  let currentWeight = 185;
  for (let i = numDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    currentWeight += (Math.random() - 0.5) * 0.5;
    const heightInMeters = 1.78; // Approx 5'10"
    const weightInKg = currentWeight / 2.20462;
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    data.push({
      date: date.toISOString().split('T')[0],
      weight: parseFloat(currentWeight.toFixed(1)),
      bmi: parseFloat(bmi.toFixed(1)),
    });
  }
  return data;
};

type TimeFrame = '1M' | '1Y' | '2Y';

const MyWeightTracker: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1M');
  const [weightData, setWeightData] = useState<WeightEntry[]>(generateMockData(730));
  const [newWeight, setNewWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const weightInputVal = parseFloat(newWeight);
    if (isNaN(weightInputVal) || weightInputVal <= 0) return;

    // Convert to lbs if necessary, as the system uses lbs internally for consistency
    const weightInLbs = weightUnit === 'kg' ? weightInputVal * 2.20462 : weightInputVal;

    const today = new Date().toISOString().split('T')[0];
    const heightInMeters = 1.78; // Approx 5'10"
    const weightInKgForBmi = weightInLbs / 2.20462;
    const bmi = weightInKgForBmi / (heightInMeters * heightInMeters);
    
    const newEntry: WeightEntry = {
      date: today,
      weight: parseFloat(weightInLbs.toFixed(1)), // Always store as lbs
      bmi: parseFloat(bmi.toFixed(1)),
    };

    // Replace today's entry if it exists, otherwise add it
    const existingIndex = weightData.findIndex(d => d.date === today);
    const newData = [...weightData];
    if (existingIndex !== -1) {
      newData[existingIndex] = newEntry;
    } else {
      newData.push(newEntry);
    }
    
    setWeightData(newData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewWeight('');
  };

  const filteredData = useMemo(() => {
    const days = timeFrame === '1M' ? 30 : timeFrame === '1Y' ? 365 : 730;
    return weightData.slice(-days);
  }, [timeFrame, weightData]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Weight Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Weight & BMI Progress</h2>
              <div className="flex gap-2">
                {(['1M', '1Y', '2Y'] as TimeFrame[]).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setTimeFrame(tf)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                      timeFrame === tf ? 'bg-sky-600 text-white' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" dataKey="weight" stroke="#38bdf8" label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft', fill: '#38bdf8' }} />
                  <YAxis yAxisId="right" dataKey="bmi" orientation="right" stroke="#34d399" label={{ value: 'BMI', angle: 90, position: 'insideRight', fill: '#34d399' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} labelStyle={{ color: '#cbd5e1' }} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#38bdf8" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="bmi" stroke="#34d399" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Log Today's Weight</h2>
            <form onSubmit={handleAddWeight} className="space-y-4">
              <div>
                <label htmlFor="weight-input" className="block text-sm font-medium text-slate-400 mb-1">Enter weight</label>
                <div className="flex items-center gap-2">
                  <input
                    id="weight-input"
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={e => setNewWeight(e.target.value)}
                    placeholder="e.g., 185.5"
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                  <select
                    value={weightUnit}
                    onChange={e => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                    className="bg-slate-600 border border-slate-500 rounded-lg px-3 py-2 text-white appearance-none focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed">
                Log
              </button>
            </form>
          </Card>
          <GeneralSearch context="Weight Management and BMI" />
        </div>
      </div>
    </div>
  );
};

export default MyWeightTracker;
