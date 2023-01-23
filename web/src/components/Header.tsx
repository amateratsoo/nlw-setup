import { Plus, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import logo from '../assets/logo.svg';
import { NewHabitForm } from '../components/NewHabitForm';

function Header() {
  return (
    <header className='w-full max-w-3xl mx-auto flex items-end justify-between'>
      <img src={logo} alt='habits logo image' />
      
      <Dialog.Root>
        <Dialog.Trigger 
          className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:bg-violet-600 hover:border-violet-600 transition-colors group'
        >
          <Plus size={20} className='text-violet-500 group-hover:text-white transition-colors' />
          Novo hábito
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-lg w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
              <X size={24} aria-label='Fechar modal' />
            </Dialog.Close>

            <Dialog.Title className='text-3xl leading-tight text-white font-bold'>
              Criar hábito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}

export { Header };
