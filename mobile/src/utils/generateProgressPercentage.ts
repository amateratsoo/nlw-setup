interface Props {
  amount: number;
  completed: number;
}

function generateProgressPercentage({ amount, completed }: Props) {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  return completedPercentage;
}

export { generateProgressPercentage };
