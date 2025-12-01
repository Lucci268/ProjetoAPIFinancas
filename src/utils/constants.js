export const DEFAULT_CATEGORIES = [
  { nome: 'Alimentação', color: '#FFB74D' },
  { nome: 'Transporte', color: '#4FC3F7' },
  { nome: 'Moradia', color: '#EF5350' },
  { nome: 'Lazer', color: '#BA68C8' },
  { nome: 'Saúde', color: '#4DB6AC' },
  { nome: 'Outros', color: '#90A4AE' }
];

export const CUSTOM_COLORS = [
  '#FF8A65', '#AED581', '#4DD0E1', '#9575CD', '#F06292', 
  '#E57373', '#FFF176', '#81C784', '#64B5F6', '#7986CB',
  '#BA68C8', '#FFB74D', '#4DB6AC'
];

export const getColorByName = (name) => {
  if (!name) return '#90A4AE';
  const defaultCat = DEFAULT_CATEGORIES.find(c => c.nome === name);
  if (defaultCat) return defaultCat.color;

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % CUSTOM_COLORS.length;
  return CUSTOM_COLORS[index];
};