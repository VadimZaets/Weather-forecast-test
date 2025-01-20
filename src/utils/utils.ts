export const formattedDay = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', { weekday: 'long' });
};

export const formattedTemp = (temp: number) => {
  return Math.round(temp) === 0
    ? ` ${Math.round(temp)}`
    : temp > 0
    ? `+ ${Math.round(temp)}`
    : `- ${Math.abs(Math.round(temp))}`;
};
