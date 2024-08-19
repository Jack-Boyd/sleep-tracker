import { useQuery } from '@tanstack/react-query'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link, useParams } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { get } from '../../api/api';
import { generateChartOption } from './graph-config';

function TrendChart() {
  const { name, gender } = useParams<{ name: string; gender: string }>();

  const {isLoading, isError, isSuccess, data, error} = useQuery({
    queryKey: ['getSleepEntryByUser'],
    queryFn: async () => get(`/sleep/${name}/${gender}`)
  });
  
  return (
    <div className="max-w-3xl mx-auto">
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error instanceof Error ? `Error: ${error.message}` : 'Unknown Error occured'}</div>}
      {isSuccess && (
        <>
          <Link className="text-sm text-left text-gray-500 flex" to="/">
            <ArrowLeftIcon className="size-5" />Back
          </Link>
          <ul className="flex flex-col mx-auto text-center mb-4">
            <li className="text-lg">Name: <span className="font-bold">{name}</span></li>
            <li className="text-lg">Gender: <span className="font-bold">{gender}</span></li>
          </ul>
          <ReactECharts option={generateChartOption(data)} style={{ height: 400, width: '100%' }} />
        </>
      )}
    </div>
  );
};

export default TrendChart;