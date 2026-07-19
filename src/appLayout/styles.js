import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    color: #000000;
    background: #ffffff;
    /* Важно: убираем отступы у body, чтобы Wrapper занимал всю высоту */
    margin: 0; 
  }

  a, a:visited {
    text-decoration: none;
    cursor: pointer;
  }
  
  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    /* Хорошая практика: явно указать тип шрифта для кнопок, 
       иначе они могут взять системный шрифт на некоторых ОС */
    font-family: inherit; 
    line-height: normal;
  }
  
  ul li {
    list-style: none;
  }
`;

// Wrapper оставляем почти как есть, он держит высоту и фон
export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

// ВОТ СЮДА МЫ ВНОСИМ ИЗМЕНЕНИЯ
export const MainContent = styled.main`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-left: 140px;
  padding-right: 140px;
  padding-top: 50px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 40px;
  }
`;
