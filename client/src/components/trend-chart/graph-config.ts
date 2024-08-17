import { SleepEntry } from '../../schemas/sleep';

export const generateChartOption = (data: SleepEntry[]) => {
  const days = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);      
    days.push(date.toLocaleDateString());
  }
  const aggregatedData = Object.fromEntries(days.map(date => [date, 0]));

  data?.forEach((entry: { date: string; sleepTimeDuration: number }) => {
    const formattedDate = new Date(entry.date).toLocaleDateString();
    aggregatedData[formattedDate] += entry.sleepTimeDuration;
  });
  
  const chartData = days.map(date => ({
    date,
    sleepTimeDuration: aggregatedData[date],
  }));
  
  return {
    title: {
      text: 'Sleep Trend - Previous 7 Days',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: chartData.map(entry => entry.date),
    },
    yAxis: {
      type: 'value',
      name: 'Sleep Time (hours)',
    },
    series: [
      {
        data: chartData.map(entry => entry.sleepTimeDuration),
        type: 'bar',
        smooth: true,
        name: 'Sleep Duration',
        itemStyle: {
          color: '#3b82f6',
        },
      },
    ],
  };
} 