interface ProgressBarProps {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <div 
        role='progressbar'
        aria-label='Progresso de hábitos completados nesse dia'
        aria-valuenow={75}
        className='h-full rounded-xl bg-violet-600'
        style={{ width: `${progress}%` }}
      />
  </div>
  );
}

export { ProgressBar };
