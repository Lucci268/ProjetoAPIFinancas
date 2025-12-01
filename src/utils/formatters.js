export const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return new Date(year, month - 1, day);
  }
  const [day, month, year] = dateStr.split('/');
  return new Date(year, month - 1, day);
};

export const formatDate = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() + userTimezoneOffset);
    return correctedDate.toLocaleDateString('pt-BR');
};