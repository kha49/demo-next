'use client';
// ... existing imports ...
import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, AreaChart , Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, Area, ReferenceLine } from 'recharts';

const data = [
    { month: 'Jan', percentage: 65 },
    { month: 'Feb', percentage: 75 },
    { month: 'Mar', percentage: 15 },
    { month: 'Apr', percentage: 90 },
    { month: 'May', percentage: 90 },
    { month: 'Jun', percentage: 30 },
    { month: 'Jul', percentage: 60 },
    { month: 'Aug', percentage: 85 },
    { month: 'Sep', percentage: 88 },
    { month: 'Oct', percentage: 30 },
    { month: 'Nov', percentage: 30 },
    { month: 'Dec', percentage: 98 },
  ];

const SalesGraph: FC = () => {

  return (
    <Paper 
      sx={{ 
        p: 0.5, 
        height: '100%', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" gutterBottom > 
        Monthly Sales Percentage
      </Typography>
      <Box sx={{ 
        width: '100%', 
        height: 'calc(100% - 24px)', // Subtract the approximate height of Typography
        minHeight: 100,
        flex: 1 
      }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, left: 20, bottom: 10 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis 
              dataKey="month"
              tick={{ fontSize: 12 }}
            >
              <Label value="Months" position="bottom" offset={-5} />
            </XAxis>
            <YAxis
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tickFormatter={(value:any) => `${value}%`}
              tick={{ fontSize: 12 }}
            >
              <Label
                value="Sales Percentage"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle', fontSize: 12 }}
              />
            </YAxis>
            <Tooltip formatter={(value:any) => `${value}%`} />

            <ReferenceLine
            x={data[3].month} // Target month 7 (July)
            stroke="#888"
            strokeDasharray="3 3"
            />
            <ReferenceLine
            x={data[6].month} // Target month 7 (July)
            stroke="#888"
            strokeDasharray="3 3"
            />
            <ReferenceLine
            x={data[10].month} // Target month 10 (October)
            stroke="#888"
            strokeDasharray="3 3"
            />

            <Area
              type="monotone"
              dataKey="percentage"
              stroke="#2196f3"
              fill="#2196f3"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ r: 4 }}
              label={{
                position: 'top',
                formatter: (value:any) => `${value}%`,
                fontSize: 11,
                dy: -4
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default SalesGraph; 