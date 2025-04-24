import React from 'react';
import { Activity } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const ProgressItem = ({ 
  label, 
  value, 
  max, 
  color 
}: { 
  label: string; 
  value: number; 
  max: number; 
  color: string; 
}) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-xs font-medium text-white">{value.toLocaleString()}</span>
      </div>
      <Progress value={percentage} className={`h-1.5 ${color}`} />
    </div>
  );
};

const TrafficCard = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1A1D2A] to-[#232738] p-6 text-white flex flex-col">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-purple-500/20 p-1.5 rounded-full">
            <Activity className="h-3.5 w-3.5 text-purple-400" />
          </div>
          <span className="text-xs font-medium text-purple-400">Traffic</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold">
          Website Besucher
        </h2>

        {/* Summary Stats */}
        <div className="flex items-center gap-4">
          <div>
            <p className="text-2xl font-bold">14,582</p>
            <p className="text-xs text-gray-400">Besucher diesen Monat</p>
          </div>
          <div className="bg-green-500/20 py-0.5 px-2 rounded-full flex items-center">
            <span className="text-xs font-medium text-green-400">+12.5%</span>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="mt-6 space-y-4">
        <ProgressItem 
          label="Direkt" 
          value={6824} 
          max={14582} 
          color="bg-blue-500" 
        />
        
        <ProgressItem 
          label="Social Media" 
          value={4285} 
          max={14582} 
          color="bg-purple-500" 
        />
        
        <ProgressItem 
          label="Suchmaschinen" 
          value={3473} 
          max={14582} 
          color="bg-amber-500" 
        />
      </div>
    </div>
  );
};

export default TrafficCard; 