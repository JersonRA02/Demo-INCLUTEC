export type Question = { text: string; options: string[]; answer: number };
export type Culture = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  body: string;
  fact: string;
  questions: Question[];
};
export const cultures: Culture[] = [
  {
    id: "lenguas",
    title: "Palabras que nos conectan",
    subtitle: "Quechua y aimara",
    icon: "languages",
    color: "mint",
    body: "Las lenguas originarias transmiten maneras de conocer el mundo. El quechua tiene distintas variedades, entre ellas las de Áncash. El aimara se habla principalmente en el altiplano. Ninguna lengua es superior a otra: todas merecen respeto y espacios para ser escuchadas.",
    fact: "Mini-vocabulario orientativo: en quechua, yaku = agua e inti = sol; en aimara, uma = agua e inti = sol. La escritura y la pronunciación pueden variar según la comunidad.",
    questions: [
      {
        text: "¿Qué palabra significa agua en aimara?",
        options: ["Uma", "Inti", "Yaku"],
        answer: 0,
      },
      {
        text: "¿Qué significa inti?",
        options: ["Montaña", "Sol", "Luna"],
        answer: 1,
      },
      {
        text: "¿Cómo podemos valorar una lengua originaria?",
        options: [
          "Burlándonos del acento",
          "Imponiendo una sola lengua",
          "Escuchando y aprendiendo con respeto",
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "danzas",
    title: "Historias en movimiento",
    subtitle: "Danzas del Perú",
    icon: "sparkles",
    color: "peach",
    body: "Las danzas expresan historias, encuentros e identidades. La marinera, el huayno y las danzas de las comunidades de Áncash muestran la diversidad del Perú. Sus significados cambian según el lugar y las personas que las practican.",
    fact: "Una actividad inclusiva: investigar una danza y compartir su historia mediante movimiento, dibujo o relato, según las preferencias de cada estudiante.",
    questions: [
      {
        text: "¿Qué pueden expresar las danzas?",
        options: [
          "Solo competencia",
          "Historias e identidades",
          "Una única cultura",
        ],
        answer: 1,
      },
      {
        text: "¿Cómo participar de manera inclusiva?",
        options: [
          "Elegir distintas formas de expresión",
          "Obligar a bailar",
          "Excluir a quien no baile",
        ],
        answer: 0,
      },
      {
        text: "¿Cómo conocer el significado de una danza?",
        options: [
          "Suponerlo por el traje",
          "Consultar a sus portadores",
          "Copiar estereotipos",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "gastronomia",
    title: "Sabores con historia",
    subtitle: "Gastronomía y encuentro",
    icon: "utensils",
    color: "yellow",
    body: "La gastronomía peruana reúne ingredientes, técnicas y saberes de muchas comunidades. En Áncash encontramos preparaciones como el picante de cuy y el llunca cashqui. La alimentación también refleja historias familiares, recursos disponibles y decisiones personales.",
    fact: "En un encuentro gastronómico, preguntemos por alergias, preferencias y necesidades alimentarias. Participar no debe depender de comprar o llevar comida.",
    questions: [
      {
        text: "¿Qué expresa la gastronomía?",
        options: [
          "Historias y saberes",
          "El valor de una persona",
          "Una única tradición",
        ],
        answer: 0,
      },
      {
        text: "¿Qué debemos considerar al compartir alimentos?",
        options: [
          "Solo el precio",
          "Alergias y preferencias",
          "Solo la presentación",
        ],
        answer: 1,
      },
      {
        text: "¿Qué hace inclusiva una actividad?",
        options: [
          "Exigir una compra",
          "Comparar familias",
          "Ofrecer participación sin gastos",
        ],
        answer: 2,
      },
    ],
  },
  {
    id: "tradiciones",
    title: "Celebrar lo que somos",
    subtitle: "Tradiciones y festividades",
    icon: "flag",
    color: "lavender",
    body: "Las festividades reúnen memorias, creencias y formas de convivir. En Áncash, las celebraciones locales muestran vínculos entre comunidades y territorio. Cada persona puede vivir una tradición de manera distinta, o no practicarla.",
    fact: "Respetar una celebración también implica respetar a quien decide no participar. Preguntar sin juzgar abre una conversación.",
    questions: [
      {
        text: "¿Todas las personas viven igual una tradición?",
        options: [
          "Sí, siempre",
          "No, hay experiencias diversas",
          "Solo en la escuela",
        ],
        answer: 1,
      },
      {
        text: "¿Cómo actuar si alguien no participa?",
        options: ["Respetar su decisión", "Presionarlo", "Excluirlo del grupo"],
        answer: 0,
      },
      {
        text: "¿Cómo aprender sobre una festividad?",
        options: [
          "Repetir prejuicios",
          "Escuchar a la comunidad",
          "Suponer su significado",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "musica",
    title: "Un país, muchas voces",
    subtitle: "Música e identidad",
    icon: "music",
    color: "blue",
    body: "La música conecta generaciones y territorios. Instrumentos como la quena, el cajón y el arpa forman parte de diversas expresiones del Perú. Escuchar diferentes músicas permite conocer historias sin reducir a una comunidad a un solo sonido.",
    fact: "Podemos explorar la música con audios, letras escritas, imágenes de instrumentos y vibraciones. No todas las personas perciben el sonido de la misma forma.",
    questions: [
      {
        text: "¿Qué instrumento se asocia a expresiones afroperuanas?",
        options: ["Cajón", "Piano únicamente", "Violín únicamente"],
        answer: 0,
      },
      {
        text: "¿Cómo hacer accesible una actividad musical?",
        options: [
          "Usar solo audio",
          "Ofrecer letras e imágenes también",
          "Subir siempre el volumen",
        ],
        answer: 1,
      },
      {
        text: "¿Qué favorece escuchar músicas diversas?",
        options: [
          "Jerarquizar culturas",
          "Conocer otras historias",
          "Rechazar lo diferente",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "saberes",
    title: "Aprender de nuestras raíces",
    subtitle: "Saberes ancestrales",
    icon: "sprout",
    color: "mint",
    body: "Los saberes de las comunidades incluyen conocimientos sobre cultivos, tejidos, agua y cuidado del territorio. En los Andes, prácticas como los andenes muestran relaciones entre las personas y el entorno. Estos conocimientos siguen vivos y se transforman.",
    fact: "Invitemos a una persona de la comunidad a compartir sus conocimientos, con su consentimiento y reconociendo su autoría. Los saberes locales dialogan con la ciencia.",
    questions: [
      {
        text: "¿Qué son los saberes comunitarios?",
        options: [
          "Conocimientos vivos",
          "Ideas sin valor",
          "Solo relatos del pasado",
        ],
        answer: 0,
      },
      {
        text: "¿Qué debemos hacer al compartir un saber ajeno?",
        options: [
          "Ocultar su origen",
          "Reconocer a quien lo comparte",
          "Presentarlo como propio",
        ],
        answer: 1,
      },
      {
        text: "¿Con qué se relacionan los andenes?",
        options: [
          "El cultivo y el territorio",
          "La navegación marítima",
          "La escritura digital",
        ],
        answer: 0,
      },
    ],
  },
];
export const surveyItems = [
  "Escucho con respeto las costumbres diferentes a las mías.",
  "Valoro las lenguas y culturas de mis compañeros.",
  "Me siento parte de mi comunidad escolar.",
  "Invito a participar a quienes hablan menos.",
  "Respeto que cada persona aprenda a su propio ritmo.",
  "Apoyo el uso de distintos recursos para aprender.",
  "Dialogo para resolver desacuerdos.",
  "Actúo cuando observo una situación de exclusión.",
];
export const sampleResponses = [
  [4, 4, 3, 3, 4, 5, 4, 3],
  [5, 4, 4, 4, 5, 4, 4, 4],
  [3, 4, 4, 3, 4, 4, 3, 4],
  [4, 5, 4, 4, 4, 5, 4, 4],
  [4, 3, 5, 4, 5, 4, 4, 3],
  [5, 4, 4, 5, 4, 4, 5, 4],
];
export type Post = {
  id: string;
  author: string;
  studentId: string;
  text: string;
  likes: number;
  contributes: number;
  reactions: string[];
  date: string;
};
export const samplePosts: Post[] = [
  {
    id: "1",
    author: "Valeria M.",
    studentId: "sample-1",
    text: "Mi abuela me enseñó algunas palabras en quechua. ¿Y si hacemos un mural con palabras de las lenguas que se hablan en nuestras familias?",
    likes: 8,
    contributes: 4,
    reactions: [],
    date: "Ejemplo",
  },
  {
    id: "2",
    author: "Mateo R.",
    studentId: "sample-2",
    text: "Propongo que en los trabajos en equipo podamos elegir entre escribir, dibujar o grabar un audio. Todos tenemos algo que aportar.",
    likes: 6,
    contributes: 5,
    reactions: [],
    date: "Ejemplo",
  },
  {
    id: "3",
    author: "Estudiante anónimo",
    studentId: "sample-3",
    text: "Me gustaría conocer las tradiciones de mis compañeros. Podemos organizar un día para compartir nuestras historias.",
    likes: 5,
    contributes: 3,
    reactions: [],
    date: "Ejemplo",
  },
];
