import { useQuery } from '@tanstack/react-query'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { generateChartOption } from './graph-config';

function TrendChart() {
  const { name, gender } = useParams<{ name: string; gender: string }>();

  const {isLoading, isError, isSuccess, data, error} = useQuery({
    queryKey: ['getSleepEntryByUser'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5002/api/sleep/${name}/${gender}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });
  
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error instanceof Error ? `Error: ${error.message}` : 'Unknown Error occured'}</div>}
      {isSuccess && (
        <>
          <Link to="/entries">
            <ArrowLeftIcon />Back
          </Link>
          <ul>
            <li>Name: <span>{name}</span></li>
            <li>Gender: <span>{gender}</span></li>
          </ul>
          <ReactECharts option={generateChartOption(data)} style={{ height: 400, width: '100%' }} />
        </>
      )}
    </div>
  );
};

export default TrendChart;