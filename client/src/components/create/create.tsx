import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { post } from '../../api/api';
import { sleepEntrySchema, SleepEntry } from '../../schemas/sleep';

function Create() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm<SleepEntry>({
    resolver: zodResolver(sleepEntrySchema.omit({ id: true })),
  });
  
  const mutation = useMutation({
    mutationFn: async (data: SleepEntry) => post<SleepEntry>(data, '/sleep/create'),
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit: SubmitHandler<SleepEntry> = (data) => {    
    mutation.mutate(data);
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
        <input id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register('name')}
        />
        {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
      </div>      
      <div className="mb-5">
        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
        <select
          id="gender"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register('gender')}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span className="text-red-500 text-sm mt-1">{errors.gender.message}</span>}
      </div> 
      <div className="mb-5">
        <label htmlFor="sleepTimeDuration" className="block mb-2 text-sm font-medium text-gray-900">Sleep time duration</label>
        <input id="sleepTimeDuration" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register('sleepTimeDuration', { valueAsNumber: true })}
        />
        {errors.sleepTimeDuration && <span className="text-red-500 text-sm mt-1">{errors.sleepTimeDuration.message}</span>}
      </div>
      <div className="mb-5">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
        <input id="date" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          {...register('date')}
        />
        {errors.date && <span className="text-red-500 text-sm mt-1">{errors.date.message}</span>}
      </div>

      {mutation.isLoading && <p className="text-blue-500">Submitting...</p>}
      {mutation.isError && <p className="text-red-500">Submission failed: {(mutation.error as Error).message}</p>}
      {mutation.isSuccess && <p className="text-green-500">Form submitted successfully!</p>}

      <button type="submit" disabled={isSubmitting || mutation.isLoading} className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
  );
};

export default Create;