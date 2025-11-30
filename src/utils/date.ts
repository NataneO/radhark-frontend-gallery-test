function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}

export default formatDate;