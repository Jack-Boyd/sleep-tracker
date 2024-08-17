import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
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
    mutationFn: async (data: SleepEntry) => {
      const response = await fetch(`http://localhost:5002/api/sleep/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
      return response.json();
    },
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit: SubmitHandler<SleepEntry> = (data) => {    
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name"
          {...register('name')}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>      
      <div>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
         
          {...register('gender')}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div> 
      <div>
        <label htmlFor="sleepTimeDuration">Sleep time duration</label>
        <input id="sleepTimeDuration" type="number"
          {...register('sleepTimeDuration', { valueAsNumber: true })}
        />
        {errors.sleepTimeDuration && <span>{errors.sleepTimeDuration.message}</span>}
      </div>
      <div>
        <label htmlFor="date">Date</label>
        <input id="date" type="date"
          {...register('date')}
        />
        {errors.date && <span>{errors.date.message}</span>}
      </div>

      {mutation.isLoading && <p>Submitting...</p>}
      {mutation.isError && <p>Submission failed: {(mutation.error as Error).message}</p>}
      {mutation.isSuccess && <p>Form submitted successfully!</p>}

      <button type="submit" disabled={isSubmitting || mutation.isLoading}>Submit</button>
    </form>
  );
};

export default Create;