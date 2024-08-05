'use client';

import { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const weekData = [
  // Add your weekly data here
  { name: 'Mon', Engagement: Math.floor(Math.random() * 100) + 20 },
  { name: 'Tue', Engagement: Math.floor(Math.random() * 100) + 20 },
  { name: 'Wed', Engagement: Math.floor(Math.random() * 100) + 20 },
  { name: 'Thu', Engagement: Math.floor(Math.random() * 100) + 20 },
  { name: 'Fri', Engagement: Math.floor(Math.random() * 100) + 20 },
  { name: 'Sat', Engagement: Math.floor(Math.random() * 100) + 20 },
  { name: 'Sun', Engagement: Math.floor(Math.random() * 100) + 20 }
];

const monthData = [
  // Add your monthly data here
  { name: 'Week 1', Engagement: Math.floor(Math.random() * 1000) + 200 },
  { name: 'Week 2', Engagement: Math.floor(Math.random() * 1000) + 200 },
  { name: 'Week 3', Engagement: Math.floor(Math.random() * 1000) + 200 },
  { name: 'Week 4', Engagement: Math.floor(Math.random() * 1000) + 200 }
];

const yearData = [
  // Add your yearly data here
  { name: 'Jan', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jul', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Aug', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Sep', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Oct', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Nov', Engagement: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Dec', Engagement: Math.floor(Math.random() * 5000) + 1000 }
];

type TabType = 'week' | 'month' | 'year';

export function AreaChartComp() {
  const [data, setData] = useState(yearData);
  const [activeTab, setActiveTab] = useState('year');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'week') {
      setData(weekData);
    } else if (tab === 'month') {
      setData(monthData);
    } else {
      setData(yearData);
    }
  };

  return (
    <div className='w-[100%]'>
      <div className='ms-12' >
        <ul className="mb-5 flex list-none flex-row flex-wrap border-b-0 ps-0" role="tablist" data-twe-nav-ref>
          <button
            className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate dark:text-white/50 dark:hover:bg-neutral-700/60 ${activeTab === 'week' ? 'border-white' : 'border-transparent'}`}
            role="tab"
            aria-selected={activeTab === 'week'}
            onClick={() => handleTabClick('week')}
          >
            Week
          </button>
          <button
            className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate dark:text-white/50 dark:hover:bg-neutral-700/60 ${activeTab === 'month' ? 'border-white' : 'border-transparent'}`}
            role="tab"
            aria-selected={activeTab === 'month'}
            onClick={() => handleTabClick('month')}
          >
            Month
          </button>
          <button
            className={`my-2 block border-x-0 border-b-2 border-t-0 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:bg-neutral-100 focus:isolate dark:text-white/50 dark:hover:bg-neutral-700/60 ${activeTab === 'year' ? 'border-white' : 'border-transparent'}`}
            role="tab"
            aria-selected={activeTab === 'year'}
            onClick={() => handleTabClick('year')}
          >
            Year
          </button>
        </ul>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip formatter={(value) => `${value}`} />
          <Area type="monotone" dataKey="Engagement" stroke="black" fill="rgb(173,250,29)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
