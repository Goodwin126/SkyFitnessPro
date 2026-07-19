// Просто импортируем картинки как обычные файлы
import yogaImg from '../assets/big-images/yoga.jpg';
import bodyflexImg from '../assets/big-images/bodyflex.jpg';
import stepAerobicsImg from '../assets/big-images/step-aerobics.jpg';
import stretchingImg from '../assets/big-images/stretching.jpg';
import zumbaImg from '../assets/big-images/zumba.jpg';
import video from '../assets/video-workout.png';

export const LessonList = [
  {
    id: 1,
    name: 'yoga',
    imgLesson: '/yoga.jpg',
    nameLesson: 'Йога',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
  },
  {
    id: 2,
    name: 'stretching',
    imgLesson: '/stretching.jpg',
    nameLesson: 'Стречинг',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
  },
  {
    id: 3,
    name: 'zumba',
    imgLesson: '/zumba.jpg',
    nameLesson: 'Зумба',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
  },
  {
    id: 4,
    name: 'step-aerobics',
    imgLesson: '/step-aerobics.jpg',
    nameLesson: 'Степ-аэробика',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
  },
  {
    id: 5,
    name: 'bodyflex',
    imgLesson: '/bodyflex.jpg',
    nameLesson: 'Бодифлекс',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
  },
];

export const LessonListProfile = [
  {
    id: 1,
    imgLesson: '/yoga.jpg',
    nameLesson: 'Йога',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
    progress: 20,
  },
  {
    id: 2,
    imgLesson: '/stretching.jpg',
    nameLesson: 'Стречинг',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
    progress: 45,
  },
  {
    id: 3,
    imgLesson: '/zumba.jpg',
    nameLesson: 'Зумба',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
    progress: 0,
  },
  {
    id: 4,
    imgLesson: '/step-aerobics.jpg',
    nameLesson: 'Степ-аэробика',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
    progress: 15,
  },
  {
    id: 5,
    imgLesson: '/bodyflex.jpg',
    nameLesson: 'Бодифлекс',
    countDaysLesson: '25 дней',
    timeLesson: '20-50',
    levelLesson: 3,
    progress: 88,
  },
];

export const COURSES = {
  yoga: {
    name: 'Йога',
    src: yogaImg, // Это сразу готовая строка-URL
    color: 'rgba(255, 199, 0, 1)',
    styles: {
      top: '-295px',
      right: '-290px',
      width: '80%',
      height: 'auto',
    },
    directions: [
      'Йога для новичков',
      'Классическая йога',
      'Кундалини-йога',
      'Йогатерапия',
      'Хатха-йога',
      'Аштанга-йога',
    ],
    recommends: [
      { recommen: 'Давно хотели попробовать йогу, но не решались начать' },
      {
        recommen:
          'Хотите укрепить позвоночник, избавиться от болей в спине и суставах',
      },
      { recommen: 'Ищете активность, полезную для тела и души' },
    ],
  },
  bodyflex: {
    name: 'Бодифлекс',
    src: bodyflexImg,
    color: 'rgba(125, 69, 140, 1)',
    styles: {
      top: '-222px',
      right: '-160px',
      width: '62%',
      height: 'auto',
    },
    directions: [
      'Бодифлекс для начинающих',
      'Интенсивный бодифлекс',
      'Бодифлекс для живота и талии',
      'Дыхательная гимнастика в стиле бодифлекс',
      'Бодифлекс + растяжка',
    ],
    recommends: [
      { recommen: 'Мечтаете о плоском животе без изнуряющих кардио-нагрузок' },
      {
        recommen: 'Ищете способ ускорить метаболизм и сжигать жир даже в покое',
      },
      {
        recommen:
          'Хотите научиться правильно дышать и насыщать клетки кислородом',
      },
    ],
  },
  'step-aerobics': {
    name: 'Степ-аэробика',
    src: stepAerobicsImg,
    color: 'rgba(255, 126, 101, 1)',
    styles: {
      top: '-900px',
      right: '30px',
      width: '55%',
      height: 'auto',
    },
    directions: [
      'Степ-аэробика для новичков',
      'Интервальная степ-тренировка',
      'Степ + силовые элементы',
      'Кардио-степ для жиросжигания',
      'Функциональный степ',
    ],
    recommends: [
      {
        recommen:
          'Хочется зарядиться энергией и получить мощный выброс эндорфинов',
      },
      {
        recommen:
          'Нужно эффективное кардио, которое не надоедает благодаря музыке и ритму',
      },
      {
        recommen: 'Хотите укрепить ноги, ягодицы и сердечно-сосудистую систему',
      },
    ],
  },
  stretching: {
    name: 'Стретчинг',
    src: stretchingImg,
    color: 'rgba(36, 145, 210, 1)',
    styles: {
      top: '0',
      right: '0',
      width: '28%',
      height: 'auto',
    },
    directions: [
      'Статический стретчинг',
      'Динамическая растяжка',
      'Стретчинг для спины и шеи',
      'Глубокий стретч для продвинутых',
      'Реабилитационный стретчинг',
      'Утренняя растяжка для бодрости',
    ],
    recommends: [
      {
        recommen:
          'Чувствуете скованность в теле после рабочего дня или сидячей работы',
      },
      {
        recommen:
          'Хотите улучшить гибкость, чтобы движения стали свободнее и легче',
      },
      {
        recommen:
          'Ищете мягкую практику для снятия мышечного напряжения и стресса',
      },
    ],
  },
  zumba: {
    name: 'Зумба',
    src: zumbaImg,
    color: 'rgba(247, 160, 18, 1)',
    styles: {
      top: '-38px',
      right: '-400px',
      width: '90%',
      height: 'auto',
    },
    directions: [
      'Zumba Fitness (классика)',
      'Zumba Toning (с гантелями)',
      'Zumba Gold (для старшего возраста)',
      'Детская Zumba',
      'Zumba Sentao (со стулом)',
    ],
    recommends: [
      {
        recommen:
          'Любите танцевать, но не хотите ходить на скучные групповые занятия',
      },
      {
        recommen:
          'Ищете тренировку, которая ощущается как вечеринка, а не работа',
      },
      {
        recommen:
          'Хотите сжигать калории под зажигательную латиноамериканскую музыку',
      },
    ],
  },
};

export const WorkoutLessons = [
  {
    id: 1,
    NameLesson: 'Упражнения тренировки 2',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: video,
    ListTask: [
      'Наклоны вперед',
      'Наклоны вперед',
      'Наклоны вперед',
      'Наклоны назад',
      'Наклоны назад',
      'Наклоны назад',
      'Поднятие ног, согнутых в коленях',
      'Поднятие ног, согнутых в коленях',
      'Поднятие ног, согнутых в коленях',
    ],
  },
  {
    id: 2,
    NameLesson: 'Упражнения тренировки 3',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: video,
    ListTask: [
      'Выпады вперед',
      'Выпады вперед',
      'Выпады вперед',
      'Выпады назад',
      'Выпады назад',
      'Выпады назад',
      'Скрутка спины',
      'Скрутка спины',
      'Скрутка спины',
    ],
  },
];

export const WorkoutUserProgress = {
  id: 1,
  name: 'Василий',
  surname: 'Васнецов',
  progress: {
    LessonId: 1,
    progress: [20, 30, 0, 67, 23, 2, 45, 89, 3],
  },
};
