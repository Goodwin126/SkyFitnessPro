/**
 * Разбивает строку на две части: до первой открывающей скобки и саму скобку с содержимым.
 * @param {string} text - Исходная строка.
 * @returns {{ main: string, bracket: string | null }}
 */
export const splitByBracket = text => {
  if (!text) return { main: '', bracket: null };

  const index = text.indexOf('(');

  // Если скобки нет, возвращаем весь текст как основную часть
  if (index === -1) {
    return { main: text, bracket: null };
  }

  return {
    main: text.substring(0, index).trim(), // Часть до скобки (убираем лишние пробелы)
    bracket: text.substring(index), // Часть со скобкой и всем, что внутри/после неё
  };
};
