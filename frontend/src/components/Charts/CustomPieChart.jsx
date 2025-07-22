import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import CustomToolTip from './CustomToolTip'
import CustomLegend from './CustomLegend'
const CustomPieChart = ({ colors, data}) => {
  return (
<ResponsiveContainer width="100%" height={325}>
    <PieChart>
        <Pie
        data={data}
        dataKey="count"
        nameKey="status"
        cx="50%"
        cy="50%"
        outerRadius={130}
        innerRadius={100}
        labelLine={false}
        >
         {data.map((entry, index) => {
  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
})}
 
        </Pie>
        <Tooltip  content={<CustomToolTip/>}/>
        <Legend content={<CustomLegend />} />
    </PieChart>
</ResponsiveContainer>  )
}

export default CustomPieChart