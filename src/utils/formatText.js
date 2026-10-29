export const shortenCourseName = name => {
  if (!name) return '';

  const words = name.split(' ');

  // Логика для нескольких слов: сокращаем первое слово, если оно длиннее 6 букв
  if (words.length > 1) {
    const firstWord = words[0];

    if (firstWord.length > 6) {
      // Берем первые 4 буквы и добавляем точку
      const shortenedFirst = firstWord.substring(0, 4) + '.';
      return `${shortenedFirst} ${words.slice(1).join(' ')}`;
    }
  }

  return name;
};
