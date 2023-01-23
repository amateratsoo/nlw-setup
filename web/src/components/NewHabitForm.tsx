import { FormEvent, useState } from 'react';
import { Check } from "phosphor-react";
import * as CheckBox from './CheckBox';
import { api } from '../libs/axios';

const possibleWeekDays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];

function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) return;

    await api.post('habits', {
      title,
      weekDays
    })

    setTitle('');
    setWeekDays([]);
  }

  function handleToggleWeekDay(index: number) {
    if (weekDays.includes(index)) {
      setWeekDays(prev => prev.filter(weekDay => weekDay != index));
    }

    else {
      setWeekDays(prev => [...prev, index]);
    }
  }

  return (
    <form 
      className='w-full flex flex-col mt-6'
      onSubmit={createNewHabit}
    >
      <label 
        htmlFor='title'
        className='font-semibold leading-tight text-white'
      >
        Qual seu comprometimento?
      </label>
      <input 
        type='text' 
        id='title'
        placeholder='ex.: Exercícios, dormir bem, etc...'
        autoFocus
        className='p-4 rounded mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label 
        htmlFor=''
        className='font-semibold leading-tight mt-4 text-white'  
      >
        Qual a recorrência?
      </label>

      <div className='flex flex-col gap-2 mt-3'>
        {possibleWeekDays.map((weekDay, index) => (
          <CheckBox.Modal 
            title={weekDay} 
            key={weekDay}
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          />
        ))}
      </div>

      <button 
        className='mt-6 rounded text-white p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500'
        type='submit'
      >
        <Check size={20} weight='bold' className='text-white' />
        Confirmar
      </button>
    </form>
  );
}

export { NewHabitForm };
