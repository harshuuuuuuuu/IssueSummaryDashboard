import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis
} from 'recharts';

const EditableValue = ({ value, onChange, type = "number" }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  if (isEditing) {
    return (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        onBlur={() => setIsEditing(false)}
        className="w-20 px-2 py-1 border rounded"
        autoFocus
      />
    );
  }
  
  return (
    <span 
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
    >
      {value}
    </span>
  );
};

const DashboardCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

const IssueDashboard = () => {
  const [channelData, setChannelData] = useState([
    { name: 'Messaging App', weekly: 3, mtd: 10, percentage: 100 },
    { name: 'Ticketing Tool', weekly: 0, mtd: 0, percentage: 0 },
    { name: 'Email', weekly: 0, mtd: 0, percentage: 0 },
    { name: 'Tollfree', weekly: 0, mtd: 0, percentage: 0 }
  ]);

  const [categoryData, setCategoryData] = useState([
    { name: 'Client Data Issue', value: 6, fill: '#FF6B6B' },
    { name: 'User Understanding', value: 2, fill: '#4ECDC4' },
    { name: 'Request', value: 0, fill: '#45B7D1' }
  ]);

  const [bugData, setBugData] = useState([
    { name: 'S1', value: 0, fill: '#FF4858' },
    { name: 'S2', value: 2, fill: '#FFA400' },
    { name: 'S3', value: 0, fill: '#4CAF50' },
    { name: 'S4', value: 0, fill: '#2196F3' }
  ]);

  const [timeData, setTimeData] = useState([
    { name: 'Week 1', response: 2.67, resolution: 0.49 },
    { name: 'MTD', response: 2.10, resolution: 3.89 }
  ]);

  const updateChannelData = (index, field, value) => {
    const newData = [...channelData];
    newData[index] = { ...newData[index], [field]: value };
    setChannelData(newData);
  };

  const updateCategoryData = (index, value) => {
    const newData = [...categoryData];
    newData[index] = { ...newData[index], value };
    setCategoryData(newData);
  };

  const updateBugData = (index, value) => {
    const newData = [...bugData];
    newData[index] = { ...newData[index], value };
    setBugData(newData);
  };

  const updateTimeData = (index, field, value) => {
    const newData = [...timeData];
    newData[index] = { ...newData[index], [field]: value };
    setTimeData(newData);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">Issue Summary Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardCard title="Channel Distribution">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={channelData}>
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="weekly" name="Weekly" fill="#8884d8" />
                <Bar dataKey="mtd" name="MTD" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {channelData.map((item, index) => (
              <div key={item.name} className="flex space-x-4">
                <span className="w-32">{item.name}:</span>
                <span>Weekly: <EditableValue 
                  value={item.weekly} 
                  onChange={(v) => updateChannelData(index, 'weekly', v)} 
                /></span>
                <span>MTD: <EditableValue 
                  value={item.mtd} 
                  onChange={(v) => updateChannelData(index, 'mtd', v)} 
                /></span>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Category Distribution (MTD)">
          <div className="h-64">
            <ResponsiveContainer>
              <RadialBarChart 
                innerRadius="30%" 
                outerRadius="100%" 
                data={categoryData} 
                startAngle={180} 
                endAngle={0}
              >
                <RadialBar
                  minAngle={15}
                  background
                  clockWise={true}
                  dataKey="value"
                  label={{ fill: '#666', position: 'insideStart' }}
                />
                <Legend />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, index) => (
              <div key={item.name} className="flex space-x-4">
                <span className="w-32">{item.name}:</span>
                <EditableValue 
                  value={item.value} 
                  onChange={(v) => updateCategoryData(index, v)} 
                />
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Bug Severity Distribution">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={bugData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bugData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {bugData.map((item, index) => (
              <div key={item.name} className="flex space-x-4">
                <span className="w-32">Severity {item.name}:</span>
                <EditableValue 
                  value={item.value} 
                  onChange={(v) => updateBugData(index, v)} 
                />
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Response & Resolution Time Trends">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={timeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="response" 
                  name="Response Time (Min)"
                  stroke="#8884d8" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="resolution" 
                  name="Resolution Time (Hrs)"
                  stroke="#82ca9d" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {timeData.map((item, index) => (
              <div key={item.name} className="flex space-x-4">
                <span className="w-32">{item.name}:</span>
                <span>Response: <EditableValue 
                  value={item.response} 
                  onChange={(v) => updateTimeData(index, 'response', v)} 
                /></span>
                <span>Resolution: <EditableValue 
                  value={item.resolution} 
                  onChange={(v) => updateTimeData(index, 'resolution', v)} 
                /></span>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total Issues">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">
              {channelData.reduce((sum, item) => sum + item.mtd, 0)}
            </div>
            <div className="text-sm text-gray-500">MTD</div>
          </div>
        </DashboardCard>

        <DashboardCard title="Resolution Rate">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-500">All Issues Resolved</div>
          </div>
        </DashboardCard>

        <DashboardCard title="Avg Response Time">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {timeData[1].response.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Minutes (MTD)</div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default IssueDashboard;
