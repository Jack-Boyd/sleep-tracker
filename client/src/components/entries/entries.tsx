import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';
import { get } from '../../api/api';

function Entries() {
  const {isLoading, isError, isSuccess, data, error} = useQuery({
    queryKey: ['getSleepEntries'],
    queryFn: async () => get('/sleep'),
  });

  return (
    <div className="max-w-xl mx-auto">
      {isLoading && <div>Loading...</div>}
      {isError && <div>{error instanceof Error ? `Error: ${error.message}` : 'Unknown Error occured'}</div>}
      {isSuccess && <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Gender</th>
            <th scope="col" className="px-6 py-3">Entries</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((entry: { 
            id: number; 
            name: string; 
            gender: string; 
            entryCount: number;
          }) => (
            <tr className="bg-white border-b" key={entry.id}>
              <td scope="row" className="px-6 py-2 font-medium text-blue-500 hover:underline whitespace-nowrap">
                <Link to={`/${entry.name}/${entry.gender}`}>{entry.name}</Link>
              </td>
              <td className="px-6 py-2">{entry.gender}</td>
              <td className="px-6 py-2">{entry.entryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
export default Entries;