import { CheckboxProps } from '@radix-ui/react-checkbox';
import * as CheckBox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface CheckBoxProps extends CheckboxProps {
  title: string;
}

function Popover({ title, ...rest }: CheckBoxProps) {
  return (
    <CheckBox.Root 
      className='flex items-center gap-3 group'
      {...rest}
    >
      <div className='h-8 w-8 rounded-md flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
        <CheckBox.Indicator>
          <Check size={20} className='text-white' />
        </CheckBox.Indicator>
      </div>

      <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
        {title}
      </span>
    </CheckBox.Root>
  );
}

function Modal({ title, ...rest }: CheckBoxProps) {
  return (
    <CheckBox.Root 
      className='flex items-center gap-3 group'
      {...rest}
    >
      <div className='h-8 w-8 rounded-md flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'>
        <CheckBox.Indicator>
          <Check size={20} className='text-white' />
        </CheckBox.Indicator>
      </div>

      <span className='text-white leading-tight'>
        {title}
      </span>
    </CheckBox.Root>
  );
}

export { Popover, Modal };
