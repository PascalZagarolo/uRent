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
    <ResponsiveContainer width={400} height={200} className="mt-2">
      <PieChart>
        <Pie
        stroke='none'
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel} // Custom labels for "PKW", "LKW", etc.
          outerRadius={100} // Increased the size of the pie
          
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} style={{outline: 'none'}} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);
}

export default InseratCategoriesChart;