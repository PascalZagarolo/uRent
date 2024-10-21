import { inserat } from '@/db/schema';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


interface InseratCategoriesChartProps {
    foundInserate : typeof inserat.$inferSelect[] | any[];
}

const InseratCategoriesChart = ({ foundInserate } : InseratCategoriesChartProps) => {

    const data = [
        { name: 'PKW', value: foundInserate.filter((inserat : any) => inserat.category === "PKW").length },
        { name: 'LKW', value: foundInserate.filter((inserat : any) => inserat.category === "LKW").length },
        { name: 'Transporter', value: foundInserate.filter((inserat : any) => inserat.category === "TRANSPORT").length },
        { name: 'Anhänger', value: foundInserate.filter((inserat : any) => inserat.category === "TRAILER").length },
    ];

    const COLORS = ['#2563eb',  '#e11d48', '#10b981', '#d97706'];

    const RADIAN = Math.PI / 180;
    

const renderCustomizedLabel = ({ name }) => {
  return name; // This will render the name (e.g., "PKW", "LKW", etc.)
};

return (
  <div className='w-full h-full'>
    <div>
      <h2 className='font-semibold text-lg'>Inserate nach Kategorien</h2>
    </div>
    {foundInserate?.length > 0 ? (
      <ResponsiveContainer  className="mt-2">
      <PieChart>
        <Pie
        stroke='none'
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          //label={renderCustomizedLabel}// Custom labels for "PKW", "LKW", etc.
          outerRadius={100} // Increased the size of the pie
          
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} style={{outline: 'none'}} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      
    </ResponsiveContainer>
    ) : (
      <span className='text-sm text-gray-200/60'>
        Keine Daten zum Abbilden gefunden..
      </span>
    )}
    {foundInserate?.length > 0 && (
    <div className='flex flex-row items-center space-x-4'>
      {data.map((entry, index) => (
        <div className='flex flex-row items-center gap-x-2' key={index}>
          <div className={`w-4 h-4 rounded-md shadow-lg`} style={{ backgroundColor: COLORS[index] }} key={index}/>
          {entry.name}  ({entry.value}) 
        </div>
      ))}
    </div>
    )}
  </div>
);
}

export default InseratCategoriesChart;