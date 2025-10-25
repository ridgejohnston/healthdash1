
import React, { useState, useCallback } from 'react';
import { Medication } from '../types';
import { searchMedications } from '../services/geminiService';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { ICONS, MEDICATION_UNITS } from '../constants';
import GeneralSearch from '../components/ui/GeneralSearch';

const initialMedications: Medication[] = [
  { id: '1', name: 'Metformin', dosage: '500', measurement: 'mg', route: 'oral' },
  { id: '2', name: 'Lisinopril', dosage: '10', measurement: 'mg', route: 'oral' },
  { id: '3', name: 'Vitamin D3', dosage: '5000', measurement: 'IU', route: 'oral' },
  { id: '4', name: 'Testosterone Cypionate', dosage: '100', measurement: 'mg', route: 'injection' },
];

const MyMedications: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>(initialMedications);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const results = await searchMedications(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        setError('No results found. Try a different search term.');
      }
    } catch (err) {
      setError('An error occurred during the search.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const addMedication = (med: any) => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name: med.name,
      dosage: '',
      measurement: 'mg',
      route: 'oral',
      description: med.description,
      category: med.category,
    };
    setMedications(prev => [...prev, newMed]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeMedication = (id: string) => {
    setMedications(meds => meds.filter(m => m.id !== id));
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    setMedications(meds => meds.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Medications</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Medication</h2>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a medication..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <button onClick={handleSearch} disabled={isLoading} className="bg-sky-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-500 disabled:bg-slate-600">
                {isLoading ? <Spinner size="sm" /> : 'Search'}
              </button>
            </div>
            {error && <p className="text-red-400 mt-2">{error}</p>}
            {searchResults.length > 0 && (
              <div className="mt-4 max-h-60 overflow-y-auto bg-slate-900 p-2 rounded-lg">
                <ul className="space-y-2">
                  {searchResults.map((res, i) => (
                    <li key={i} className="flex justify-between items-center p-3 bg-slate-700 rounded-md">
                      <div>
                        <p className="font-semibold text-white">{res.name} <span className="text-xs text-slate-400 font-normal">({res.category})</span></p>
                        <p className="text-sm text-slate-300">{res.description}</p>
                      </div>
                      <button onClick={() => addMedication(res)} className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-green-500">+</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Current Medication List</h2>
            <div className="space-y-4">
              {medications.map(med => (
                <div key={med.id} className="p-4 bg-slate-700/50 rounded-lg flex flex-wrap items-center justify-between gap-4">
                  <div className="flex-grow min-w-[200px]">
                    <p className="font-bold text-white text-lg">{med.name}</p>
                    <p className="text-sm text-slate-400">{med.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" value={med.dosage} onChange={e => updateMedication(med.id, 'dosage', e.target.value)} className="w-20 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-center" placeholder="Dosage" />
                    <select
                      value={med.measurement}
                      onChange={e => updateMedication(med.id, 'measurement', e.target.value)}
                      className="w-24 bg-slate-600 border border-slate-500 rounded px-2 py-1 text-center appearance-none"
                    >
                      {MEDICATION_UNITS.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                    <select value={med.route} onChange={e => updateMedication(med.id, 'route', e.target.value)} className="bg-slate-600 border border-slate-500 rounded px-2 py-1 appearance-none">
                      <option value="oral">Oral</option>
                      <option value="injection">Injection</option>
                      <option value="topical">Topical</option>
                      <option value="inhalation">Inhalation</option>
                    </select>
                    <span className="text-slate-300">{ICONS[med.route]}</span>
                  </div>
                  <button onClick={() => removeMedication(med.id)} className="text-red-400 hover:text-red-300">{ICONS.trash}</button>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <GeneralSearch context="Medications and Pharmacology" />
        </div>
      </div>
    </div>
  );
};

export default MyMedications;
