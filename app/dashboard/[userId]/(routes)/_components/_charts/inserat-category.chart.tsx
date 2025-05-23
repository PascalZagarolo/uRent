import { inserat } from '@/db/schema';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip, TooltipProps } from 'recharts';
import { FileText, Truck, AlertCircle } from 'lucide-react';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface InseratCategoriesChartProps {
    foundInserate: typeof inserat.$inferSelect[] | any[];
}

// Define custom tooltip props type
interface ChartDataItem {
    name: string;
    value: number;
    color: string;
    icon: string;
}

const InseratCategoriesChart = ({ foundInserate }: InseratCategoriesChartProps) => {
    // Process data for the chart
    const data = [
        { 
            name: 'PKW', 
            value: foundInserate.filter((inserat: any) => inserat.category === "PKW").length,
            color: '#4f46e5',
            icon: '🚗'
        },
        { 
            name: 'LKW', 
            value: foundInserate.filter((inserat: any) => inserat.category === "LKW").length,
            color: '#06b6d4',
            icon: '🚚'
        },
        { 
            name: 'Transporter', 
            value: foundInserate.filter((inserat: any) => inserat.category === "TRANSPORT").length,
            color: '#10b981',
            icon: '🚐'
        },
        { 
            name: 'Anhänger', 
            value: foundInserate.filter((inserat: any) => inserat.category === "TRAILER").length,
            color: '#f59e0b',
            icon: '🚛'
        },
    ];

    // Filter out categories with zero values
    const filteredData = data.filter(item => item.value > 0);
    
    // Calculate total count of inserate
    const totalInserate = filteredData.reduce((sum, item) => sum + item.value, 0);
    
    // Custom tooltip for the pie chart
    const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload as ChartDataItem;
            return (
                <div className="bg-white dark:bg-[#222] p-2 border border-gray-200 dark:border-gray-700 rounded-md shadow-md text-xs">
                    <div className="font-semibold flex items-center">
                        <span className="mr-1">{data.icon}</span>
                        {data.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 mt-1">
                        Anzahl: {data.value} ({Math.round((data.value / totalInserate) * 100)}%)
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom legend that's more visually appealing
    const renderCustomLegend = () => {
        return (
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                {filteredData.map((entry, index) => (
                    <div 
                        key={`legend-item-${index}`} 
                        className="flex items-center bg-white/50 dark:bg-[#2a2a2a] px-2.5 py-1 rounded-full shadow-sm"
                    >
                        <div 
                            className="w-2.5 h-2.5 rounded-full mr-1.5"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-xs font-medium dark:text-gray-200">
                            {entry.icon} {entry.name} ({entry.value})
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className='w-full h-full flex flex-col'>
            {foundInserate?.length > 0 ? (
                <>
                    <div className="h-[220px] mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={filteredData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={800}
                                    animationBegin={200}
                                >
                                    {filteredData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color} 
                                            opacity={0.9}
                                            className="hover:opacity-100 transition-opacity"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {renderCustomLegend()}
                    
                    <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-md">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800/30 flex items-center justify-center mr-2">
                                <Truck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <div className="text-xs font-medium dark:text-gray-200">
                                    {totalInserate} insgesamt
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Alle Kategorien
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-md">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-800/30 flex items-center justify-center mr-2">
                                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <div className="text-xs font-medium dark:text-gray-200">
                                    {filteredData.length} von 4
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Kategorien verwendet
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center">
                    <AlertCircle className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Keine Inserate vorhanden
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-md">
                        Erstelle Inserate in verschiedenen Kategorien, um die Verteilung zu sehen
                    </span>
                </div>
            )}
        </div>
    );
};

export default InseratCategoriesChart;