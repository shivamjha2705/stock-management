'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const donutData = [
  { name: 'Unassigned', value: 400 },
  { name: 'Shipped', value: 300 },
  { name: 'Delivered', value: 200 },
  { name: 'Canceled', value: 100 }
];

const COLORS = ['#0088FE', '#FFBB28', 'green', 'red'];

export function DonutComp() {
  // Calculate the total number of items
  const totalItems = donutData.reduce((acc, item) => acc + item.value, 0);

  return (
<div className="w-full lg:w-[80%] max-w-2xl mx-auto p-6 rounded-lg relative">
<h5 className='text-center text-2xl font-semibold text-white mb-6'>ORDER TRACKING STATS</h5>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={donutData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {donutData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', borderColor: '#333', borderRadius: '5px' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute top-[55%] left-[41%] transform -translate-x-1/2 -translate-y-1/2 text-center'>
        <div className='text-2xl font-bold tracking-tight'>{totalItems}</div>
        <div className='text-sm font-medium tracking-tight'>Total Orders</div>
      </div>
    </div>
  );
}
