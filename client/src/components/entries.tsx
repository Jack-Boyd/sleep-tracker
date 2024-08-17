import { useQuery } from '@tanstack/react-query'

function Entries() {
  const {isLoading, isError, isSuccess, data, error} = useQuery({
    queryKey: ['getSleepEntries'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5002/api/sleep`);
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
      {isSuccess && <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Entries</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry: any) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.gender}</td>
              <td>{entry.entryCount}</td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
export default Entries;