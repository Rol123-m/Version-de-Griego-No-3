import { GroupConfig, GroupKey, Student, Teacher, WeekData, GreekLetter, VocabWord } from '../types';

export const COURSE_CONFIG = {
  PASSWORD_UNICA: "griego2026",
  CODIGO_ADMIN: "ADMIN2026",
  TOTAL_SEMANAS: 30,
  DIAS_DESBLOQUEO: 7,
  FECHA_INICIO_GLOBAL: "2026-05-26T00:00:00-05:00",
  MINISTERIO: 'Ministerio "Vivos para Servir"',
  EMAIL: "vivosparaservir@gmail.com",
  TELEFONO: "+53 58169444",
  TITULO_CURSO: "Curso de Griego Koiné Elemental"
};

export const GRUPOS_CONFIG: Record<GroupKey, GroupConfig> = {
  ALFA: {
    id: "alfa",
    nombre: "Grupo Alfa (α)",
    profesorTitular: "Rolando Y. Desdín García",
    profesorAsistente: "Raidel Ramón Toranzo",
    facilitadores: ["Leonard Luis Carrera Castillo", "Alexei Sánchez"]
  },
  BETA: {
    id: "beta",
    nombre: "Grupo Beta (β)",
    profesorTitular: "Yordanka Álvarez Pérez",
    profesorAsistente: "Rolando Desdín García",
    facilitadores: ["Daniel Ramírez"]
  },
  GAMMA: {
    id: "gamma",
    nombre: "Grupo Gamma (γ)",
    profesorTitular: "Yurleidy Domínguez Vega",
    asistentes: ["Marcos González", "Mario L. Mondeja Leyva"]
  }
};

export const EXAMENES_POR_GRUPO: Record<GroupKey, Record<number, string>> = {
  ALFA: {
    1: "https://forms.gle/1qbXukGfPFFJ8LAY8",
    2: "https://forms.gle/v1A2yX11SwFC6rX88",
    3: "https://docs.google.com/forms/d/e/1FAIpQLSc28ZWsV9bI-pLzNxdL_MRrdap4D5Wvn4Gj8rR_coOmEDVqxA/viewform?usp=sharing",
    4: "https://forms.gle/HQEwHsA93RdK7QU47",
    5: "https://forms.gle/fwYdW4aq8Js3ZzzY6",
    6: "https://forms.gle/UdS4v6H9z4wSR4bX7",
    7: "https://forms.gle/SAsw5QsWkxdL6pDo9",
    8: "https://forms.gle/TcbvQaEUAwTpYrFu8",
    9: "https://forms.gle/bxYg1PCnerC3QE5r8",
    10: "https://forms.gle/MmWjD83B8y6S14Mh6",
    11: "https://forms.gle/1QyFTcs2myoghcXb8",
    12: "https://forms.gle/GfYiaCLBqWeJgSRb7",
    13: "https://forms.gle/jYtS4n5eSKmgWcMA8",
    14: "https://forms.gle/JJfPTugEPc8QzUqv6",
    15: "https://forms.gle/LmmvUYWAt3KJ73Za8",
    16: "https://forms.gle/Zm3t6dU32KbFqx1f6",
    17: "https://forms.gle/Fzv8j2bnMhsG5rUcA",
    18: "https://forms.gle/qhkP4U2gRSkLnzaV8",
    19: "https://forms.gle/FUJySz78g633Yec19",
    20: "https://forms.gle/1bAZVhs99oTMkCyZA",
    21: "https://forms.gle/tuybY36NqY4jfRfA8",
    22: "https://forms.gle/S96rWrc6nee6rCSQ6",
    23: "https://forms.gle/t6u5UX2uZtwnh8K78",
    24: "https://forms.gle/MvuLjVuHxtVx58jR9",
    25: "https://forms.gle/65CDNig8EU2VVUxq6",
    26: "https://forms.gle/NyZ7yC2L7jN36NEt6",
    27: "https://forms.gle/YQ4o5XAtR9eKMn7W8",
    28: "https://forms.gle/Tx6ToQtrbVcz9hE47",
    29: "https://forms.gle/EJEMPLO_ALFA_29",
    30: "https://forms.gle/EJEMPLO_ALFA_30"
  },
  BETA: {
    1: "https://forms.gle/ijdg5b22frXGrfKa9",
    2: "https://forms.gle/owx242yd5Qedi6gj7",
    3: "https://docs.google.com/forms/d/e/1FAIpQLSfLTOwPyaKAk73mFGrwXUvJM8-Z0APIM5VODvHGmqJUFRahmQ/viewform?usp=sharing",
    4: "https://forms.gle/aWb5PxeAgfVr1yx26",
    5: "https://forms.gle/hfCj72pQHUZKmQY39",
    6: "https://forms.gle/dExT59gcr8gUa38ZA",
    7: "https://forms.gle/akKepTXFGET71ckm6",
    8: "https://forms.gle/C1iK3JFmdLnoaJcG9",
    9: "https://forms.gle/zYqfzWJM68zrdSNu8",
    10: "https://forms.gle/irWyHbX5SRHVi9rm8",
    11: "https://forms.gle/7p8Bppsas4vXAHFw8",
    12: "https://forms.gle/gEboRE3gnMT36vhk9",
    13: "https://forms.gle/qWw4JzEzYqC7A6aT8",
    14: "https://forms.gle/kJb34w5MSmD99MrR8",
    15: "https://forms.gle/xFWhJLJfUSAGbE5o6",
    16: "https://forms.gle/XS4G56L6qRgakmyj8",
    17: "https://forms.gle/ASeX8oufcjCxbSLfA",
    18: "https://forms.gle/x7Pj9h1w8aKxuxxS7",
    19: "https://forms.gle/FAdAQPPDmMKKHPek8",
    20: "https://forms.gle/sXVtMHzDinBdgbYF6",
    21: "https://forms.gle/vc1J5CbkGYNSxD9ZA",
    22: "https://forms.gle/EiuNy4k119ucJC9u5",
    23: "https://forms.gle/XLNw1bdRvGkCbkEN7",
    24: "https://forms.gle/wsEz75iH3i9fXJaT6",
    25: "https://forms.gle/QjbqoVNnhsGgNKVx5",
    26: "https://forms.gle/fgK9L6Cxy5wsbfqf8",
    27: "https://forms.gle/QJZpy6GDUgAzwo3t5",
    28: "https://forms.gle/Tx6ToQtrbVcz9hE47",
    29: "https://forms.gle/EJEMPLO_BETA_29",
    30: "https://forms.gle/EJEMPLO_BETA_30"
  },
  GAMMA: {
    1: "https://forms.gle/GZc8Yh3AN3aXR8DbA",
    2: "https://forms.gle/NPx8cvtMykYdXjYH7",
    3: "https://docs.google.com/forms/d/e/1FAIpQLSdrJmddVWBESK5E1V7_b-yZR1qkoq5IumTtIq8aA8x85HSBnA/viewform?usp=sharing",
    4: "https://forms.gle/me2wfCmcKbPLLbDF9",
    5: "https://forms.gle/2edbVKbTq41LeP4e9",
    6: "https://forms.gle/uZSeyoAwrBsrYo237",
    7: "https://forms.gle/AASBTn2cjqtrCZbT6",
    8: "https://forms.gle/DRj5dJM14xrWhEGd6",
    9: "https://forms.gle/RFjELj9rxnY1pT3z7",
    10: "https://forms.gle/ef3DjvPVkxJdLqSe8",
    11: "https://forms.gle/yTzwXf8WZHpfixM38",
    12: "https://forms.gle/SCNYKQK8LsBRoNkM8",
    13: "https://forms.gle/rAwtzGKHKjEHSrbT6",
    14: "https://forms.gle/r1mQArTkQm3EUS4cA",
    15: "https://forms.gle/fjsgDetgFE5MZLZB6",
    16: "https://forms.gle/cq4qZE86wKiEPiS8A",
    17: "https://forms.gle/iogyUZxrACW3Enem6",
    18: "https://forms.gle/WQV7AbpSuB1r7v1S6",
    19: "https://forms.gle/GutA5kMCyMjHocH67",
    20: "https://forms.gle/4LZnUZopF7LAzGRk9",
    21: "https://forms.gle/xwU449p3a1AMBMY88",
    22: "https://forms.gle/ERsU6aBT3GUF48656",
    23: "https://forms.gle/zuD8nYBFZrkqPZUQ7",
    24: "https://forms.gle/kaWpdJDjEqw9QBJa9",
    25: "https://forms.gle/c9qqjnAXndeEXmG68",
    26: "https://forms.gle/gysgtrGqZ7ajG4ja8",
    27: "https://forms.gle/JQjn3MK9sM5PHvAF9",
    28: "https://forms.gle/Tx6ToQtrbVcz9hE47",
    29: "https://forms.gle/EJEMPLO_GAMMA_29",
    30: "https://forms.gle/EJEMPLO_GAMMA_30"
  }
};

export const ESTUDIANTES_POR_GRUPO: Record<GroupKey, Student[]> = {
  ALFA: [
    { id: 1, nombre: "Orlando Aguilar Fonseca", email: "orlandoaguilarfonseca@gmail.com", telefono: "56171023", nacionalidad: "Cuba" },
    { id: 2, nombre: "Dannier Aldana Rivero", email: "aldanadannier@gmail.com", telefono: "54944913", nacionalidad: "Cuba" },
    { id: 3, nombre: "Yusnel Argote Pérez", email: "yusnelargote@gmail.com", telefono: "5354522889", nacionalidad: "Cuba" },
    { id: 4, nombre: "Carlos Rodolfo Avila Peña", email: "97noelere@gmail.com", telefono: "+5358603602", nacionalidad: "Cuba" },
    { id: 5, nombre: "Dariel Brunet Urquia", email: "darielbrunet063@gmail.com", telefono: "51101729", nacionalidad: "Cuba" },
    { id: 6, nombre: "Eudis Daniel Cardozo Heredia", email: "eudisdanielcardozoheredia@gmail.com", telefono: "50727668", nacionalidad: "Cuba" },
    { id: 7, nombre: "Jeremías Miguel Cifuentes Lastre", email: "cifuenteslastre@gmail.com", telefono: "+5351317304", nacionalidad: "Cuba" },
    { id: 8, nombre: "Abel Angel Checca Perez", email: "abelcpz@gmail.com", telefono: "966541324", nacionalidad: "Perú" },
    { id: 9, nombre: "Saul Abner Flores Alcocer", email: "saulpay2@gmail.com", telefono: "72462615", nacionalidad: "Bolivia" },
    { id: 10, nombre: "Yailin Fonseca Pérez", email: "yailin45@gmail.com", telefono: "55079500", nacionalidad: "Cuba" },
    { id: 11, nombre: "Emanuel Fumero Núñez", email: "emanuelfumero253@gmail.com", telefono: "+53 58726216", nacionalidad: "Cuba" },
    { id: 12, nombre: "César Grabiel García Duaniz", email: "gaceniga2008@gmail.com", telefono: "+53 51118890", nacionalidad: "Cuba" },
    { id: 13, nombre: "Abimael Enrique García Paniagua", email: "kikesito199620@gmail.com", telefono: "+59177113363", nacionalidad: "Bolivia" },
    { id: 14, nombre: "Humberto Gómez Pérez", email: "tommydos084@gmail.com", telefono: "9191163202", nacionalidad: "México" },
    { id: 15, nombre: "Laynis Milagros Hernández Mir", email: "laynishernandez@gmail.com", telefono: "+5358242651", nacionalidad: "Cuba" },
    { id: 16, nombre: "Mariano Hernández Nápoles", email: "mariano8619@gmail.com", telefono: "51724493", nacionalidad: "Cuba" },
    { id: 17, nombre: "Geysi Marten Cruzata", email: "gmartencruzata@gmail.com", telefono: "7179841787", nacionalidad: "EE.UU." },
    { id: 18, nombre: "José Manuel Morales Torres", email: "josedecristo2007@gmail.com", telefono: "56394810", nacionalidad: "Cuba" },
    { id: 19, nombre: "David Mosquera Cedeño", email: "mosqueracedenodavid@gmail.com", telefono: "53687380", nacionalidad: "Cuba" },
    { id: 20, nombre: "Usiel Navarro Rodríguez", email: "navarrousiel2@gmail.com", telefono: "50069374", nacionalidad: "Cuba" },
    { id: 21, nombre: "Ezequiel Osorio Bulté", email: "ezequielosorio0711@gmail.com", telefono: "+53 51203750", nacionalidad: "Cuba" },
    { id: 22, nombre: "Ángel Antonio Osorio Noda", email: "angelosorionoda@gmail.com", telefono: "53922184", nacionalidad: "Cuba" },
    { id: 23, nombre: "Josué Pereira Arias", email: "josuepereiraa56@gmail.com", telefono: "+5351092988", nacionalidad: "Cuba" },
    { id: 24, nombre: "Nolberto Zaldivar", email: "nolbertozaldivar57@gmail.com", telefono: "54194656", nacionalidad: "Cuba" }
  ],
  BETA: [
    { id: 25, nombre: "Dianelis Corrales Martínez", email: "dianeliscorralesmartinez0@gmail.com", telefono: "59571348", nacionalidad: "Cuba" },
    { id: 26, nombre: "Enrique Jonathan del Castillo Gonzalez", email: "delcastillojonathan257@gmail.com", telefono: "54948063", nacionalidad: "Cuba" },
    { id: 27, nombre: "Yusnan Despaigne Cabrera", email: "despaigneyusnan@gmail.com", telefono: "56115169", nacionalidad: "Cuba" },
    { id: 28, nombre: "Carlos Alberto Dixon Magaña", email: "cdixonmagana@gmail.com", telefono: "52491097", nacionalidad: "Cuba" },
    { id: 29, nombre: "Juan Miguel Gongora Téllez", email: "juansigongora797@gmail.com", telefono: "58248023", nacionalidad: "Cuba" },
    { id: 30, nombre: "Juan Carlos Hernández Oro", email: "jh4281813@gmail.com", telefono: "52067985", nacionalidad: "Cuba" },
    { id: 31, nombre: "Rene Hernández Yirat", email: "renehernandezyirat@gmail.com", telefono: "58147112", nacionalidad: "Cuba" },
    { id: 32, nombre: "Yuraime Lache Laviada", email: "yuralache@yahoo.com", telefono: "+5352820346", nacionalidad: "Cuba" },
    { id: 33, nombre: "José Antonio Leyva Rigñack", email: "joserinack1988@gmail.com", telefono: "54951048", nacionalidad: "Cuba" },
    { id: 34, nombre: "Osiel Matos Piñon", email: "olmusic0102@gmail.com", telefono: "53490353", nacionalidad: "Cuba" },
    { id: 35, nombre: "Enrique Merma", email: "enriquemer79@gmail.com", telefono: "938535488", nacionalidad: "Perú" },
    { id: 36, nombre: "Yanetsy Nuñez Dominico", email: "yanetsy.nd@gmail.com", telefono: "54722199", nacionalidad: "Cuba" },
    { id: 37, nombre: "Joel David Plutin Seara", email: "davidjoelplutinseara@gmail.com", telefono: "63640405", nacionalidad: "Cuba" },
    { id: 38, nombre: "Mirseidis Pita Hinojosa", email: "mirseidis.pita@nauta.com.cu", telefono: "59791606", nacionalidad: "Cuba" },
    { id: 39, nombre: "Nebaith Ramos Pujay", email: "nramospujay@gmail.com", telefono: "929892376", nacionalidad: "Perú" },
    { id: 40, nombre: "Elianis Gehovanna Rodríguez Almaguer", email: "elyonelegida@gmail.com", telefono: "56511294", nacionalidad: "Cuba" },
    { id: 41, nombre: "Luis Miguel Rodríguez Hernández", email: "luismirh07@gmail.com", telefono: "58024666", nacionalidad: "Cuba" },
    { id: 42, nombre: "Orley Rodríguez Navarro", email: "orleyr84@gmail.com", telefono: "58827531", nacionalidad: "Cuba" },
    { id: 43, nombre: "Kevin Rodríguez Romero", email: "rodrigyezkevin13@gmail.com", telefono: "59351339", nacionalidad: "Cuba" },
    { id: 44, nombre: "Isabel Adjany Sánchez Ramírez", email: "isabeladjanysanchez@gmail.com", telefono: "+5355076443", nacionalidad: "Cuba" },
    { id: 45, nombre: "Neftalis Sosa coello", email: "neftalisosa40@gmail.com", telefono: "59727809", nacionalidad: "Cuba" },
    { id: 46, nombre: "Emanuel Tito Guerrero", email: "titoemanuel03@gmail.com", telefono: "51464558", nacionalidad: "Cuba" },
    { id: 47, nombre: "Janet Vargas Cuevas", email: "janetvargascuevas155@gmail.com", telefono: "52998335", nacionalidad: "Cuba" },
    { id: 71, nombre: "Yaquelín Ramírez", email: "ramirezcuadradoyaqulin@gmail.com", telefono: "56511185", nacionalidad: "Cuba" },
    { id: 74, nombre: "Ernesto Jiménez del Risco", email: "ernestjr16499@gmail.com", telefono: "58917573", nacionalidad: "Cuba" },
    { id: 75, nombre: "Melba Gainza", email: "melba@gmail.com", telefono: "99765544", nacionalidad: "Cuba" },
    { id: 76, nombre: "Agustín Nicot", email: "nicot.llorente9@gmail.com", telefono: "53783797", nacionalidad: "Cuba" },
    { id: 77, nombre: "Maikel Molina", email: "maikel@gmail.com", telefono: "53783795", nacionalidad: "Cuba" },
    { id: 78, nombre: "Reidel Verdecia", email: "reidel@gmail.com", telefono: "54087652", nacionalidad: "Cuba" }
  ],
  GAMMA: [
    { id: 48, nombre: "Eliú Arias Rasúa", email: "eliuarias@nauta.cu", telefono: "56771742", nacionalidad: "Cuba" },
    { id: 49, nombre: "Aldo Benitez Suárez", email: "benitezaldo881@gmail.com", telefono: "55526727", nacionalidad: "Cuba" },
    { id: 50, nombre: "Caleb Comes Díaz", email: "calebcomesdiaz@gmail.com", telefono: "53867721", nacionalidad: "Cuba" },
    { id: 51, nombre: "Saraí Coira Rodríguez", email: "saraicoira@gmail.com", telefono: "+53 55077548", nacionalidad: "Cuba" },
    { id: 52, nombre: "Antonio Cruz Cruz", email: "krus.antonio@gmail.com", telefono: "+5352974066", nacionalidad: "Cuba" },
    { id: 53, nombre: "Yoander Cutiño Martín", email: "yoander8910@gmail.com", telefono: "54252762", nacionalidad: "Cuba" },
    { id: 54, nombre: "Luis Gerardo Escalante", email: "gerluis12345@gmail.com", telefono: "1125194390", nacionalidad: "Argentina" },
    { id: 55, nombre: "Eilen Ochoa", email: "eilenochoatabares@gmail.com", telefono: "58458529", nacionalidad: "Cuba" },
    { id: 56, nombre: "Ernesto Miguel Fernández Oliva", email: "ernestom.fernandez123@gmail.com", telefono: "+5358107514", nacionalidad: "Cuba" },
    { id: 57, nombre: "María Claudia Grave de Peralta", email: "mariaclgpc05@gmail.com", telefono: "51704889", nacionalidad: "Cuba" },
    { id: 58, nombre: "Alessandro Guillén García", email: "guillengarciaalessandro7@gmail.com", telefono: "54913901", nacionalidad: "Cuba" },
    { id: 59, nombre: "Jesús Hernández Reina", email: "jesushernandezreina400@gmail.com", telefono: "+53 63655980", nacionalidad: "Cuba" },
    { id: 60, nombre: "Ruliseidis Legra Tamayo", email: "ruliseidisl@gmail.com", telefono: "54403040", nacionalidad: "Cuba" },
    { id: 61, nombre: "Reynier Limonta Domínguez", email: "limontareynier50@gmail.com", telefono: "+53 58145138", nacionalidad: "Cuba" },
    { id: 62, nombre: "Yanisleydi Martinez Lafita", email: "martinezlafitayanisleydi@gmail.com", telefono: "51464558", nacionalidad: "Cuba" },
    { id: 63, nombre: "Ledian Medina Isaac", email: "juventud3xcristo@gmail.com", telefono: "58092690", nacionalidad: "Cuba" },
    { id: 64, nombre: "Justo Pila Reinoso", email: "justo.sarita1976@gmail.com", telefono: "+5354127358", nacionalidad: "Cuba" },
    { id: 65, nombre: "Santiago Joaquin Romero Fernández", email: "santirf2802@hotmail.com", telefono: "3624226037", nacionalidad: "Argentina" },
    { id: 66, nombre: "Wilfrido Sánchez Ramírez", email: "wsanchezramirez83@gmail.com", telefono: "52400256", nacionalidad: "Cuba" },
    { id: 67, nombre: "Ana Iris Varona González", email: "ana.iris.varona88@gmail.com", telefono: "53027626", nacionalidad: "Cuba" },
    { id: 68, nombre: "Luis Ramón Verdecia Peramo", email: "verdeciaperamo@gmail.com", telefono: "58026276", nacionalidad: "Cuba" },
    { id: 69, nombre: "Juan Gabriel Villahermosa", email: "pastorgabrielv.na@gmail.com", telefono: "+584265589474", nacionalidad: "Venezuela" },
    { id: 70, nombre: "Lazara Salet Vera Gomez", email: "veragomezlazarasslet@gmail.com", telefono: "50334200", nacionalidad: "Cuba" },
    { id: 72, nombre: "Frank Rodríguez Díaz", email: "dyamila964@gmail.com", telefono: "52998335", nacionalidad: "Cuba" },
    { id: 73, nombre: "José Daniel Arias Alvarez", email: "eliuarias@nauta.cu", telefono: "56535853", nacionalidad: "Cuba" }
  ]
};

export const PROFESORES: Teacher[] = [
  { id: 100, nombre: "Rolando Y. Desdín García", grupos: ["ALFA", "BETA"], rol: "profesor_titular" },
  { id: 101, nombre: "Raidel Ramón Toranzo", grupos: ["ALFA"], rol: "profesor_asistente" },
  { id: 102, nombre: "Leonard Luis Carrera Castillo", grupos: ["ALFA"], rol: "facilitador" },
  { id: 103, nombre: "Alexei Sánchez", grupos: ["ALFA"], rol: "facilitador" },
  { id: 104, nombre: "Yordanka Álvarez Pérez", grupos: ["BETA"], rol: "profesor_titular" },
  { id: 105, nombre: "Daniel Ramírez", grupos: ["BETA"], rol: "facilitador" },
  { id: 106, nombre: "Joel Gutiérrez", grupos: ["GAMMA"], rol: "profesor_titular" },
  { id: 107, nombre: "Yurleidy Domínguez Vega", grupos: ["GAMMA"], rol: "profesor_titular" },
  { id: 108, nombre: "Marcos González", grupos: ["GAMMA"], rol: "asistente" },
  { id: 109, nombre: "Mario L. Mondeja Leyva", grupos: ["GAMMA"], rol: "asistente" }
];

export const GREEK_ALPHABET: GreekLetter[] = [
  { upper: "Α", lower: "α", name: "Alfa", transliteration: "a", pronunciation: "a como en padre", example: "ἀγάπη (amor)" },
  { upper: "Β", lower: "β", name: "Beta", transliteration: "b", pronunciation: "b como en barco", example: "βασιλεία (reino)" },
  { upper: "Γ", lower: "γ", name: "Gamma", transliteration: "g / n", pronunciation: "g suave como en gato", example: "γραφή (escritura)" },
  { upper: "Δ", lower: "δ", name: "Delta", transliteration: "d", pronunciation: "d como en dedo", example: "δόξα (gloria)" },
  { upper: "Ε", lower: "ε", name: "Épsilon", transliteration: "e", pronunciation: "e corta como en métrico", example: "ἐγώ (yo)" },
  { upper: "Ζ", lower: "ζ", name: "Zeta", transliteration: "z", pronunciation: "ds o z sonora suave", example: "ζωή (vida)" },
  { upper: "Η", lower: "η", name: "Eta", transliteration: "ē", pronunciation: "e larga y abierta", example: "ἡμέρα (día)" },
  { upper: "Θ", lower: "θ", name: "Theta", transliteration: "th", pronunciation: "z castellana como en zapato", example: "θεός (Dios)" },
  { upper: "Ι", lower: "ι", name: "Iota", transliteration: "i", pronunciation: "i como en iglesia", example: "Ἰησοῦς (Jesús)" },
  { upper: "Κ", lower: "κ", name: "Kappa", transliteration: "k", pronunciation: "k como en kilo", example: "κύριος (Señor)" },
  { upper: "Λ", lower: "λ", name: "Lambda", transliteration: "l", pronunciation: "l como en luz", example: "λόγος (Palabra / Verbo)" },
  { upper: "Μ", lower: "μ", name: "Mi", transliteration: "m", pronunciation: "m como en madre", example: "μαθητής (discípulo)" },
  { upper: "Ν", lower: "ν", name: "Ni", transliteration: "n", pronunciation: "n como en nube", example: "νόμος (ley)" },
  { upper: "Ξ", lower: "ξ", name: "Xi", transliteration: "x", pronunciation: "cs / x como en éxito", example: "ξένος (extranjero)" },
  { upper: "Ο", lower: "ο", name: "Ómicron", transliteration: "o", pronunciation: "o breve", example: "οἶκος (casa)" },
  { upper: "Π", lower: "π", name: "Pi", transliteration: "p", pronunciation: "p como en paz", example: "πνεῦμα (Espíritu)" },
  { upper: "Ρ", lower: "ρ", name: "Rho", transliteration: "r / rh", pronunciation: "r suave o vibrante", example: "ῥῆμα (dicho/palabra)" },
  { upper: "Σ", lower: "σ, ς", name: "Sigma", transliteration: "s", pronunciation: "s (ς solo al final)", example: "σταυρός (cruz)" },
  { upper: "Τ", lower: "τ", name: "Tau", transliteration: "t", pronunciation: "t como en tierra", example: "τέκνον (hijo)" },
  { upper: "Υ", lower: "υ", name: "Ípsilon", transliteration: "u / y", pronunciation: "u francesa o i redondeada", example: "υἱός (hijo)" },
  { upper: "Φ", lower: "φ", name: "Fi", transliteration: "ph / f", pronunciation: "f como en fe", example: "φῶς (luz)" },
  { upper: "Χ", lower: "χ", name: "Ji", transliteration: "ch / j", pronunciation: "j áspera como en jamón", example: "χάρις (gracia)" },
  { upper: "Ψ", lower: "ψ", name: "Psi", transliteration: "ps", pronunciation: "ps como en psicología", example: "ψυχή (alma)" },
  { upper: "Ω", lower: "ω", name: "Omega", transliteration: "ō", pronunciation: "o larga y plena", example: "ὥρα (hora)" }
];

export const CORE_VOCABULARY: VocabWord[] = [
  { greek: "ἄγγελος", spanish: "Ángel, mensajero", transliteration: "ángelos", week: 1 },
  { greek: "ἀμήν", spanish: "En verdad, amén, así sea", transliteration: "amén", week: 1 },
  { greek: "ἄνθρωπος", spanish: "Hombre, ser humano", transliteration: "ánthropos", week: 1 },
  { greek: "ἀπόστολος", spanish: "Apóstol, enviado", transliteration: "apóstolos", week: 1 },
  { greek: "Γαλιλαία", spanish: "Galilea", transliteration: "Galilaía", week: 1 },
  { greek: "γραφή", spanish: "Escritura, Escrituras", transliteration: "grafē", week: 1 },
  { greek: "δόξα", spanish: "Gloria, majestad, alabanza", transliteration: "dóxa", week: 1 },
  { greek: "ἐγώ", spanish: "Yo", transliteration: "egō", week: 1 },
  { greek: "ἔσχατος", spanish: "Último, postrero", transliteration: "éschatos", week: 1 },
  { greek: "ζωή", spanish: "Vida", transliteration: "zōē", week: 1 },
  { greek: "θεός", spanish: "Dios", transliteration: "theós", week: 1 },
  { greek: "καί", spanish: "Y, también, incluso", transliteration: "kaí", week: 1 },
  { greek: "καρδία", spanish: "Corazón, ser interior", transliteration: "kardía", week: 1 },
  { greek: "κόσμος", spanish: "Mundo, universo, orden", transliteration: "kósmos", week: 1 },
  { greek: "λόγος", spanish: "Palabra, Verbo, mensaje", transliteration: "lógos", week: 1 },
  { greek: "πνεῦμα", spanish: "Espíritu, viento, aliento", transliteration: "pneûma", week: 1 },
  { greek: "προφήτης", spanish: "Profeta", transliteration: "profētēs", week: 1 },
  { greek: "σάββατον", spanish: "Sábado, día de reposo", transliteration: "sábbaton", week: 1 },
  { greek: "φωνή", spanish: "Voz, sonido", transliteration: "fōnē", week: 1 },
  { greek: "Χριστός", spanish: "Cristo, Mesías, Ungido", transliteration: "Christós", week: 1 },
  
  // Semana 2 - Sustantivos
  { greek: "ἀδελφός", spanish: "Hermano", transliteration: "adelfós", week: 2 },
  { greek: "ἀρχή", spanish: "Principio, comienzo", transliteration: "archē", week: 2 },
  { greek: "γῆ", spanish: "Tierra, suelo", transliteration: "gē", week: 2 },
  { greek: "ἡμέρα", spanish: "Día", transliteration: "hēmera", week: 2 },
  { greek: "θάνατος", spanish: "Muerte", transliteration: "thánatos", week: 2 },
  { greek: "μαθητής", spanish: "Discípulo, aprendiz", transliteration: "mathētēs", week: 2 },
  { greek: "νόμος", spanish: "Ley", transliteration: "nómos", week: 2 },
  { greek: "οἶκος", spanish: "Casa, hogar, familia", transliteration: "oíkos", week: 2 },
  { greek: "υἱός", spanish: "Hijo", transliteration: "hyiós", week: 2 },

  // Semana 3 - Artículos y traducción
  { greek: "ὁ, ἡ, τό", spanish: "El, la, lo (artículo definido)", transliteration: "ho, hē, to", week: 3 },
  { greek: "ἀγάπη", spanish: "Amor generoso e incondicional", transliteration: "agápē", week: 3 },
  { greek: "ἁμαρτία", spanish: "Pecado", transliteration: "hamartía", week: 3 },
  { greek: "βασιλεία", spanish: "Reino, reinado", transliteration: "basileía", week: 3 },
  { greek: "ἔργον", spanish: "Obra, trabajo", transliteration: "érgon", week: 3 },
  { greek: "εὐαγγέλιον", spanish: "Evangelio, buenas noticias", transliteration: "euangélion", week: 3 },

  // Semana 4 - Preposiciones y eimi
  { greek: "εἰμί", spanish: "Yo soy, yo estoy", transliteration: "eimí", week: 4 },
  { greek: "ἐν", spanish: "En, dentro de (+ Dativo)", transliteration: "en", week: 4 },
  { greek: "εἰς", spanish: "Hacia, para (+ Acusativo)", transliteration: "eis", week: 4 },
  { greek: "ἐκ / ἐξ", spanish: "De, desde, fuera de (+ Genitivo)", transliteration: "ek / ex", week: 4 },
  { greek: "διά", spanish: "A través de (+ Gen) / Por causa de (+ Acus)", transliteration: "diá", week: 4 },
  { greek: "μετά", spanish: "Con (+ Gen) / Después de (+ Acus)", transliteration: "metá", week: 4 },
  { greek: "περί", spanish: "Acerca de (+ Gen) / Alrededor de (+ Acus)", transliteration: "perí", week: 4 },
  { greek: "πρός", spanish: "Hacia, con (+ Acusativo)", transliteration: "prós", week: 4 },

  // Semana 5 - Adjetivos
  { greek: "ἀγαθός", spanish: "Bueno, noble", transliteration: "agathós", week: 5 },
  { greek: "ἅγιος", spanish: "Santo, apartado para Dios", transliteration: "hágios", week: 5 },
  { greek: "δίκαιος", spanish: "Justo, recto", transliteration: "díkaios", week: 5 },
  { greek: "ἕτερος", spanish: "Otro, diferente", transliteration: "héteros", week: 5 },
  { greek: "Ἰουδαῖος", spanish: "Judío", transliteration: "Ioudaíos", week: 5 },
  { greek: "μέγας", spanish: "Grande", transliteration: "mégas", week: 5 },
  { greek: "πολύς", spanish: "Mucho, numeroso", transliteration: "polýs", week: 5 },
  { greek: "πιστός", spanish: "Fiel, creyente", transliteration: "pistós", week: 5 },

  // Semana 10 - Verbos presentes
  { greek: "ἀκούω", spanish: "Oigo, escucho, obedezco", transliteration: "akoúō", week: 10 },
  { greek: "βλέπω", spanish: "Veo, miro", transliteration: "blépō", week: 10 },
  { greek: "γινώσκω", spanish: "Conozco, sé, entiendo", transliteration: "ginṓskō", week: 10 },
  { greek: "γράφω", spanish: "Escribo", transliteration: "gráfō", week: 10 },
  { greek: "διδάσκω", spanish: "Enseño", transliteration: "didáskō", week: 10 },
  { greek: "ἔχω", spanish: "Tengo, poseo", transliteration: "échō", week: 10 },
  { greek: "λέγω", spanish: "Digo, hablo", transliteration: "légō", week: 10 },
  { greek: "λύω", spanish: "Desato, destruyo, libero", transliteration: "lýō", week: 10 },
  { greek: "πιστεύω", spanish: "Creo, confío en", transliteration: "pisteúō", week: 10 }
];

export const SEMANAS_DATA: Record<number, WeekData> = {
  1: {
    numero: 1,
    titulo: "Alfabeto Griego",
    tema: "Introducción al alfabeto, pronunciación y escritura",
    recursos: [
      { tipo: 'video', titulo: 'Canción del alfabeto (Video interactivo)', url: 'https://drive.google.com/file/d/1lR8TBKFytimWZ4bl5PdICqnfIHYGX6qt/view?usp=sharing', icono: '▶️' },
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 1', url: 'https://drive.google.com/file/d/1Ty84WkqECgJ8emq8LVGZE5y2pXCL5E6-/preview', icono: '📄' },
      { tipo: 'html', titulo: 'Alfabeto griego completo', url: '/semanas/semana1/alfabeto.html', icono: '🔤' },
      { tipo: 'html', titulo: 'Otras reglas de pronunciación y diptongos', url: '/semanas/semana1/diptongos.html', icono: '🔤' },
      { tipo: 'html', titulo: 'Guía de acentos griegos', url: '/semanas/semana1/acentos.html', icono: '´' },
      { tipo: 'html', titulo: 'División de sílabas', url: '/semanas/semana1/silabas.html', icono: '✂️' },
      { tipo: 'html', titulo: 'Vocabulario básico', url: '/semanas/semana1/vocabulario1.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Juego de cartas del vocabulario 1', url: '/semanas/semana1/Juegos/cartas solo en la computadora.html', icono: '🃏', nota: 'Tarjetas de memorización' },
      { titulo: 'Juego de palabras griegas', url: '/semanas/semana1/Juegos/juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la opción correcta' },
      { titulo: 'Simulador de escritura 2.0', url: '/semanas/semana1/Juegos/simulador.html', icono: '🎲', nota: 'Práctica interactiva de trazo' }
    ]
  },
  2: {
    numero: 2,
    titulo: "Sustantivos y Casos Gramaticales",
    tema: "Primera y segunda declinación, casos nominativo y acusativo",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 2', url: 'https://drive.google.com/file/d/1G7s2yZnMTxURIBQxhRD-bvdHxDdSUz_H/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Introducción a los sustantivos', url: '/semanas/semana2/HTML/1. Introducción a  sustantivos.html', icono: '📖' },
      { tipo: 'html', titulo: 'Casos gramaticales', url: '/semanas/semana2/HTML/3. casos gramaticales.html', icono: '🔠' },
      { tipo: 'html', titulo: 'Introducción a las declinaciones', url: '/semanas/semana2/HTML/4. Introducción a las declinaciones.html', icono: '🔄' },
      { tipo: 'html', titulo: 'Curiosidad Exegética', url: '/semanas/semana2/HTML/2. curiosidad exegética.html', icono: '💡' },
      { tipo: 'html', titulo: 'Repaso de Nominativo y Acusativo', url: '/semanas/semana2/HTML/5. Repaso de Nominativo y acusativo.html', icono: '📝' },
      { tipo: 'html', titulo: 'Resumen de la semana 2', url: '/semanas/semana2/HTML/6. Resumen de la semana 2.html', icono: '📑' },
      { tipo: 'html', titulo: 'Vocabulario semana 2', url: '/semanas/semana2/HTML/7. Vocabulario semana 2.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana2/Juegos/Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega hasta su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana2/Juegos/Juego de palabras.html', icono: '❓', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Contra reloj (recomendado)', url: '/semanas/semana2/Juegos/contrareloj.html', icono: '⏱️', nota: 'Responde correctamente antes de que se acabe el tiempo' },
      { titulo: 'Rompecabezas de terminaciones', url: '/semanas/semana2/Juegos/rompecabezas 2.0.html', icono: '🧩', nota: 'Combina las terminaciones con los casos correctos' }
    ]
  },
  3: {
    numero: 3,
    titulo: "Artículo Definido y Traducción",
    tema: "Uso del artículo, orden de palabras y primeras traducciones bíblicas",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 3', url: 'https://drive.google.com/file/d/1ITz2D3-wgePstGiEiDz12ZF_adq_vZOl/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Artículo Definido', url: '/semanas/semana3/HTML/1. Artículo Definido.html', icono: '🔤' },
      { tipo: 'html', titulo: 'Artículo Definido, continuación', url: '/semanas/semana3/HTML/2. Aticulo Definido, continuación.html', icono: '📖' },
      { tipo: 'html', titulo: 'Más sobre sustantivos', url: '/semanas/semana3/HTML/3. Mas sobre sustantivos.html', icono: '✏️' },
      { tipo: 'html', titulo: 'Práctica de Traducción', url: '/semanas/semana3/HTML/4. Traducción.html', icono: '🌍' },
      { tipo: 'html', titulo: 'Información Avanzada (Opcional)', url: '/semanas/semana3/HTML/5. Información avanzada.html', icono: '💡' },
      { tipo: 'html', titulo: 'Vocabulario semana 3', url: '/semanas/semana3/HTML/6. vocabulario3.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana3/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega hasta su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana3/Juegos/4.juego de palabras, solo en la computadora.html', icono: '❓', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Completa el artículo (recomendado)', url: '/semanas/semana3/Juegos/1. Completa el articulo.html', icono: '🖊️', nota: 'Selecciona entre las opciones para llenar los espacios' },
      { titulo: 'Lectura de Juan 1', url: '/semanas/semana3/juan 1/JN1.html', icono: '🌍', nota: 'Practica traduciendo frases simples' },
      { titulo: 'Contrarreloj', url: '/semanas/semana3/Juegos/contrareloj.html', icono: '⏱️', nota: 'Responde antes de que se acabe el tiempo' }
    ]
  },
  4: {
    numero: 4,
    titulo: "Preposiciones y Verbo Eimi",
    tema: "Preposiciones básicas con diferentes casos y el verbo 'ser'",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 4', url: 'https://drive.google.com/file/d/1EKnBMo4vbzAcsUWUXeUotp6ca7hcz0sP/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Introducción a preposiciones', url: '/semanas/semana4/HTML/1. Introducción a Preposiciones .html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Más sobre preposiciones', url: '/semanas/semana4/HTML/2. Más sobre preposiciones .html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Frase preposicional', url: '/semanas/semana4/HTML/3. Frase preposicional.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Ejemplos y cláusulas', url: '/semanas/semana4/HTML/4. Ejemplos y cláusulas .html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Verbo εἰμί', url: '/semanas/semana4/HTML/5. verbo eimi.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Nominativo Predicativo', url: '/semanas/semana4/HTML/6. Nominativo Predicativo .html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Resumen final', url: '/semanas/semana4/HTML/7. resumen final.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Tabla de preposiciones completas', url: '/semanas/semana4/HTML/tabla de preposiciones.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Vocabulario solo de preposiciones', url: '/semanas/semana4/HTML/preposiciones completas.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 4', url: '/semanas/semana4/HTML/9. Vocabulario semana 4.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana4/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana4/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Practica las preposiciones', url: '/semanas/semana4/Juegos/juego.html', icono: '⭐', nota: 'Llena los espacios en blanco' },
      { titulo: 'Verbo εἰμί', url: '/semanas/semana4/Juegos/eimi.html', icono: '5️⃣', nota: 'Practica las formas del verbo ser' },
      { titulo: 'Ejercicio de traducción', url: '/semanas/semana4/Juegos/traducción .html', icono: '✍️', nota: 'Traduce el prólogo de Juan' },
      { titulo: 'Lectura de Juan 2', url: '/semanas/semana4/juan 2/JN2.html', icono: '🌍', nota: 'Practica traduciendo frases' }
    ]
  },
  5: {
    numero: 5,
    titulo: "Adjetivos",
    tema: "Concordancia de adjetivos, posición atributiva y predicativa",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 5', url: 'https://drive.google.com/file/d/1YwZ6aYQwslg4QAsrwXj70g4xbKIKPoxf/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Introducción a Adjetivos', url: '/semanas/semana 5/HTML/1. Introducción a adjetivos.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Forma de los adjetivos', url: '/semanas/semana 5/HTML/2. Ajetivos 2.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Funciones de los adjetivos', url: '/semanas/semana 5/HTML/3. Funciones de los adjetivos .html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Frases preposicionales', url: '/semanas/semana 5/HTML/4. otros detalles adj.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Otros asuntos', url: '/semanas/semana 5/HTML/5. Otras ideas.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 5', url: '/semanas/semana 5/HTML/6. vocabulario5.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 5/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 5/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Tablero', url: '/semanas/semana 5/Juegos/tablero.html', icono: '⭐', nota: 'Práctica general interactiva' },
      { titulo: 'Ejercicio de traducción', url: '/semanas/semana 5/Juegos/traducción .html', icono: '✍️', nota: 'Traduce pasajes con adjetivos' },
      { titulo: 'Lectura de Juan 3', url: '/semanas/semana 5/juan 3/JN3.html', icono: '🌍', nota: 'Practica traduciendo frases' }
    ]
  },
  6: {
    numero: 6,
    titulo: "Tercera Declinación",
    tema: "Sustantivos de la tercera declinación y temas consonánticos",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 6', url: 'https://drive.google.com/file/d/1o_adyh9XWYhzSgGN1NaRMx5hQtvi9vZy/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Introducción a la tercera declinación', url: '/semanas/semana 6/HTML/1. Introducción a la tercera declinación.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Paradigma de la tercera declinación', url: '/semanas/semana 6/HTML/2. paradigma de la tercera declinación.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Clasificaciones de sustantivos', url: '/semanas/semana 6/HTML/3. Clasificaciones en la tercera declinación.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Paradigma Maestro', url: '/semanas/semana 6/HTML/4. tabla maestra de la tercera declinación.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Otros temas', url: '/semanas/semana 6/HTML/5. otos temas.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Resumen de la semana 6', url: '/semanas/semana 6/HTML/6.resumen.html', icono: '📖' },
      { tipo: 'html', titulo: 'Vocabulario semana 6', url: '/semanas/semana 6/HTML/7. vocabulario6.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 6/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 6/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Lluvia de terminaciones', url: '/semanas/semana 6/Juegos/lluvia de terminaciones.html', icono: '⭐', nota: 'Atrapa las terminaciones correctas' },
      { titulo: 'Ejercicio de traducción', url: '/semanas/semana 6/Juegos/traducción .html', icono: '✍️', nota: 'Traduce pasajes bíblicos' },
      { titulo: 'Lectura de Juan 4', url: '/semanas/semana 6/juan 4/JN4.html', icono: '🌍', nota: 'Práctica de lectura' }
    ]
  },
  7: {
    numero: 7,
    titulo: "Pronombres Personales (1ª y 2ª Persona)",
    tema: "ἐγώ, σύ, ἡμεῖς, ὑμεῖς y proceso de traducción",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 7', url: 'https://drive.google.com/file/d/1E2Ttu4E1ZkcN25gQ_H8T1rDC2j9NolaL/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Introducción a los pronombres personales', url: '/semanas/semana 7/HTML/1. Introducción a los pronombres.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Pronombres en Griego Koiné', url: '/semanas/semana 7/HTML/2. pronombres en griego.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Traduciendo los pronombres', url: '/semanas/semana 7/HTML/3. Proceso de traducción.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Más sobre la tercera declinación', url: '/semanas/semana 7/HTML/4. Más sobre tercera declinación.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Otros patrones de la tercera declinación', url: '/semanas/semana 7/HTML/5. Otros patrones.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Reglas de los sustantivos', url: '/semanas/semana 7/HTML/6. Las reglas de los sustantivos.html', icono: '📖' },
      { tipo: 'html', titulo: 'Vocabulario semana 7', url: '/semanas/semana 7/HTML/7. vocabulario7.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 7/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 7/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Aprende los pronombres', url: '/semanas/semana 7/Juegos/Pronombres.html', icono: '⭐', nota: 'Práctica interactiva' },
      { titulo: 'Ejercicio de traducción', url: '/semanas/semana 7/Juegos/traducción .html', icono: '✍️', nota: 'Traducción guiada' },
      { titulo: 'Lectura de Juan 5', url: '/semanas/semana 7/juan 5/JN5.html', icono: '🌍', nota: 'Práctica de lectura' }
    ]
  },
  8: {
    numero: 8,
    titulo: "Pronombres Personales de Tercera Persona",
    tema: "αὐτός, αὐτή, αὐτό y sus diferentes usos",
    recursos: [
      { tipo: 'pdf', titulo: 'PDF Contenido de la semana 8', url: 'https://drive.google.com/file/d/1ZbuuI2rMXgI-TxKRXFKsTuFnCedkmwcl/view?usp=sharing', icono: '📄' },
      { tipo: 'html', titulo: 'Introducción al pronombre de tercera persona', url: '/semanas/Semana 8/HTML/1. Introducción al pronombre de tercera persona.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Forma del pronombre', url: '/semanas/Semana 8/HTML/2.Forma del pronombre de tercera persona.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Funciones del pronombre', url: '/semanas/Semana 8/HTML/3. Funciones del pronombre.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Resumen de la semana', url: '/semanas/Semana 8/HTML/resumen.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 8', url: '/semanas/Semana 8/HTML/4. vocabulario8.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/Semana 8/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/Semana 8/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Aprende los pronombres', url: '/semanas/Semana 8/Juegos/Pronombres.html', icono: '⭐', nota: 'Práctica de formas de αὐτός' },
      { titulo: 'Lectura de Juan 6', url: '/semanas/Semana 8/juan 6/JN6.html', icono: '🌍', nota: 'Práctica de lectura' }
    ]
  },
  9: {
    numero: 9,
    titulo: "Pronombres Demostrativos y Vocativo",
    tema: "οὗτος, ἐκεῖνος, pronombres relativos y el caso vocativo",
    recursos: [
      { tipo: 'html', titulo: 'Pronombres demostrativos en español', url: '/semanas/semana 9/HTML/1. Pronombres demostrativos en español.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Pronombres demostrativos griegos', url: '/semanas/semana 9/HTML/2. Pronombres demostrativos griegos.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Más sobre demostrativos', url: '/semanas/semana 9/HTML/3. Más sobre pronombres demostrativos.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'El caso Vocativo', url: '/semanas/semana 9/HTML/4. Vocativo.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Grados del adjetivo y resumen', url: '/semanas/semana 9/HTML/5. Grados del adjetivo y resumen.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Pronombres relativos en español', url: '/semanas/semana 9/HTML/6. Pronombres relativos en español.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Pronombres relativos en griego', url: '/semanas/semana 9/HTML/7. pronombres relativos en griego.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Final sobre pronombres relativos', url: '/semanas/semana 9/HTML/8. final sobre pronombres relativos.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 9', url: '/semanas/semana 9/HTML/9. Vocabulario9.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 9/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 9/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Aprende los pronombres demostrativos', url: '/semanas/semana 9/Juegos/Pronombres.html', icono: '⭐', nota: 'Practica el conocimiento' },
      { titulo: 'Lectura de 1 Juan 1:1-9', url: '/semanas/semana 9/Juegos/lectura de juan.html', icono: '✍️', nota: 'Lee el NT Griego' }
    ]
  },
  10: {
    numero: 10,
    titulo: "Introducción a los Verbos: Presente Activo Indicativo",
    tema: "Componentes del verbo griego, tema, desinencias primarias y paradigma",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al verbo desde el español', url: '/semanas/semana 10/HTML/1. Introducción al verbo desde el español.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Verbos en griego, breve resumen', url: '/semanas/semana 10/HTML/2. Verbos en griego,breve resumen.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Componentes básicos del verbo griego', url: '/semanas/semana 10/HTML/3. Componentes básicos del verbo griego.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Presente Activo Indicativo (PAI)', url: '/semanas/semana 10/HTML/4. Presente Activo Indicativo.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Más sobre verbos', url: '/semanas/semana 10/HTML/5.Más sobre verbos.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Verbos y pronombres personales. Tabla maestra', url: '/semanas/semana 10/HTML/6. verbos y pronombres personales.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 10', url: '/semanas/semana 10/HTML/7. Vocabulario10.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 10/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 10/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Presente Activo Indicativo - Paradigma', url: '/semanas/semana 10/Juegos/Presente Activo Indicativo.html', icono: '⭐', nota: 'Practica el paradigma verbal' },
      { titulo: 'Juego de verbos', url: '/semanas/semana 10/Juegos/juego.html', icono: '🎮', nota: 'Refuerza las desinencias verbales' }
    ]
  },
  11: {
    numero: 11,
    titulo: "Verbos Contractos, Voz Pasiva y Voz Media",
    tema: "Reglas de contracción (α, ε, o), voz pasiva y voz media en presente",
    recursos: [
      { tipo: 'html', titulo: 'Introducción a los contractos', url: '/semanas/semana 11/HTML/1. introducción a los contractos.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Reglas de contracción', url: '/semanas/semana 11/HTML/2.reglas de contracción.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Paradigma de los contractos y resumen', url: '/semanas/semana 11/HTML/3. paradigma de los contractos y resumen.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Verbos pasivos', url: '/semanas/semana 11/HTML/4. verbos pasivos.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Voz media', url: '/semanas/semana 11/HTML/5.voz media.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 11', url: '/semanas/semana 11/HTML/6. Vocabulario11.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 11/Juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 11/Juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Lectura de Juan', url: '/semanas/semana 11/Juegos/lectura de juan.html', icono: '📖', nota: 'Practica lectura bíblica' },
      { titulo: 'Presente Activo Indicativo', url: '/semanas/semana 11/Juegos/Presente Activo Indicativo.html', icono: '⭐', nota: 'Practica el paradigma' }
    ]
  },
  12: {
    numero: 12,
    titulo: "El Futuro Activo y Medio",
    tema: "Formación del futuro con sigma (σ), raíces verbales y verbos líquidos",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Futuro', url: '/semanas/semana12/html/1. introducción al futuro.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Raíz verbal', url: '/semanas/semana12/html/2. Raíz verbal..html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Más sobre futuro', url: '/semanas/semana12/html/3. más sobre futuro. .html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Futuro medio indicativo', url: '/semanas/semana12/html/4. futuro medio indicativo.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Futuro de εἰμί', url: '/semanas/semana12/html/5. Futuro de eimi.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Raíces', url: '/semanas/semana12/html/6. raíces .html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Más patrones', url: '/semanas/semana12/html/7. Más patrones.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Futuro líquido', url: '/semanas/semana12/html/8. futuro liquido.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Futuro medio indicativo', url: '/semanas/semana12/html/9. Futuro medio indicativo .html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Vocabulario semana 12', url: '/semanas/semana12/html/10. Vocabulario12.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana12/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana12/juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Juego 1 - Futuro', url: '/semanas/semana12/juegos/juego1.html', icono: '🎮', nota: 'Practica el futuro griego' },
      { titulo: 'Juego 2 - Futuro Medio', url: '/semanas/semana12/juegos/juego2.html', icono: '🎯', nota: 'Refuerza el futuro medio' }
    ]
  },
  13: {
    numero: 13,
    titulo: "El Imperfecto Indicativo",
    tema: "Aumento temporal y silábico, desinencias secundarias e imperfecto",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Imperfecto', url: '/semanas/semana 13/html/1. introducción al imperfecto .html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Imperfecto Activo Indicativo', url: '/semanas/semana 13/html/2. imperfecto activo indicativo.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Imperfecto Pasivo Indicativo', url: '/semanas/semana 13/html/3. imperfecto Pasivo Indicativo .html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Carácter del Imperfecto', url: '/semanas/semana 13/html/4. carácter del imperfecto. .html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Resumen del Imperfecto', url: '/semanas/semana 13/html/5. Resumen.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 13', url: '/semanas/semana 13/html/vocabulario semana13.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 13/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 13/juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Juego 1 - Imperfecto', url: '/semanas/semana 13/juegos/juego1.html', icono: '🎮', nota: 'Practica el imperfecto' },
      { titulo: 'Juego 2 - Desinencias', url: '/semanas/semana 13/juegos/juego2.html', icono: '🎯', nota: 'Refuerza el imperfecto medio/pasivo' }
    ]
  },
  14: {
    numero: 14,
    titulo: "El Aoristo Segundo",
    tema: "Aoristo Segundo Activo y Medio: Raíz verbal modificada",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Aoristo', url: '/semanas/semana 14/html/1. Introducción al aoristo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Segundo Aoristo Activo', url: '/semanas/semana 14/html/2. Segundo aoristo activo.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Segundo Aoristo Activo (Continuación)', url: '/semanas/semana 14/html/3. Segundo Aoristo Activo, continuación.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Segundo Aoristo Medio', url: '/semanas/semana 14/html/4.segundo aoristo pasivo.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Resumen del Aoristo Segundo', url: '/semanas/semana 14/html/5. Resumen.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 14', url: '/semanas/semana 14/html/vocabulario semana14.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana 14/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Juego de palabras', url: '/semanas/semana 14/juegos/4.juego de palabras, solo en la computadora.html', icono: '🔠', nota: 'Selecciona la respuesta correcta' },
      { titulo: 'Juego 1 - Aoristo', url: '/semanas/semana 14/juegos/juego1.html', icono: '🎮', nota: 'Practica el aoristo segundo' },
      { titulo: 'Juego 2 - Formas verbales', url: '/semanas/semana 14/juegos/juego2.html', icono: '🎯', nota: 'Refuerza el aoristo medio' }
    ]
  },
  15: {
    numero: 15,
    titulo: "Consolidación I: Repaso General",
    tema: "Repaso integral de sustantivos, casos, preposiciones, adjetivos y verbos básicos",
    recursos: [
      { tipo: 'html', titulo: 'Resumen de contenido semana 15', url: '/semanas/semana 15/resumenDeContenido.html', icono: '📚' }
    ],
    juegos: [
      { titulo: 'Repaso integrador', url: '/semanas/semana1/Juegos/cartas solo en la computadora.html', icono: '🏆', nota: 'Consolidación de vocabulario y formas' }
    ]
  },
  16: {
    numero: 16,
    titulo: "Primer Aoristo y Aoristo Medio",
    tema: "Primer Aoristo (sigma), particularidades y verbos deponentes",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Primer Aoristo', url: '/semanas/semana16/html/1. Introducción al primer aoristo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Particularidades del Primer Aoristo', url: '/semanas/semana16/html/2. Particularidades del primer aoristo.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Primer Aoristo Medio', url: '/semanas/semana16/html/3. Aoristo medio.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Consolidación del Primer Aoristo', url: '/semanas/semana16/html/contenido semana 17.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Examen de práctica del Primer Aoristo', url: '/semanas/semana16/html/examen semana 15.html', icono: '📝' },
      { tipo: 'html', titulo: 'Vocabulario Semana 16', url: '/semanas/semana16/html/vocabulario semana15.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana16/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Arrastra la palabra griega a su traducción' },
      { titulo: 'Completa el Aoristo', url: '/semanas/semana16/juegos/Completa el Aoristo.html', icono: '✏️', nota: 'Completa la forma correcta del aoristo' }
    ]
  },
  17: {
    numero: 17,
    titulo: "Aoristo y Futuro Pasivo",
    tema: "La sexta forma principal, sufijo theta-eta (θη) y pasivo divino",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Aoristo y Futuro Pasivo', url: '/semanas/semana17/html/1. Introduccion al aoristo y futuro pasivo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Curiosidad Exegética: El Pasivo Divino', url: '/semanas/semana17/html/2. Curiosidad exegetica.html', icono: '💡' },
      { tipo: 'html', titulo: 'Objetivos de Aprendizaje', url: '/semanas/semana17/html/3. Objetivos de aprendizaje.html', icono: '🎯' },
      { tipo: 'html', titulo: 'Comparación con el Español', url: '/semanas/semana17/html/4. Comparacion con el espanol.html', icono: '🔄' },
      { tipo: 'html', titulo: 'Aoristo Pasivo 1ª Conjugación', url: '/semanas/semana17/html/5. Aoristo pasivo primera conjugacion.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Aoristo Pasivo 2ª Conjugación', url: '/semanas/semana17/html/6. Aoristo pasivo segunda conjugacion.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Futuro Pasivo 1ª Conjugación', url: '/semanas/semana17/html/7. Futuro pasivo primera conjugacion.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Diferencias entre Futuro y Aoristo Pasivo', url: '/semanas/semana17/html/8. Diferencias entre futuro y aoristo pasivo.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Futuros Deponentes', url: '/semanas/semana17/html/9. Futuros deponentes.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Futuro Pasivo 2ª Conjugación', url: '/semanas/semana17/html/10. Futuro pasivo segunda conjugacion.html', icono: '🔟' },
      { tipo: 'html', titulo: 'Resumen Final', url: '/semanas/semana17/html/11. Resumen final.html', icono: '📋' },
      { tipo: 'html', titulo: 'Vocabulario Semana 17', url: '/semanas/semana17/html/vocabulario semana17.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana17/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Práctica de Aoristo', url: '/semanas/semana17/juegos/practicaaoristos.html', icono: '🎯', nota: 'Practica la conjugación del aoristo' },
      { titulo: 'Completa el Aoristo Pasivo', url: '/semanas/semana17/juegos/Completa el Aoristo Pasivo.html', icono: '✏️', nota: 'Completa la forma correcta' }
    ]
  },
  18: {
    numero: 18,
    titulo: "El Tiempo Perfecto",
    tema: "Reduplicación, sufijo kappa (κ) y el grito de victoria: Τετέλεσται",
    recursos: [
      { tipo: 'html', titulo: 'Introducción Teológica: Τετέλεσται', url: '/semanas/semana18/html/1. Introduccion teologica.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Concepto del Perfecto', url: '/semanas/semana18/html/2. Concepto perfecto.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Formación del Perfecto Activo', url: '/semanas/semana18/html/3. Formacion activo.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Formación del Perfecto Medio/Pasivo', url: '/semanas/semana18/html/4. Formacion pasivo.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Reglas de Reduplicación', url: '/semanas/semana18/html/5. Reduplicacion.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Segundo Perfecto', url: '/semanas/semana18/html/6. Segundo perfecto.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Voz Media del Perfecto', url: '/semanas/semana18/html/7. Voz media.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Ejemplos Bíblicos', url: '/semanas/semana18/html/8. Ejemplos biblicos.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Resumen del Perfecto', url: '/semanas/semana18/html/9. Resumen.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Tabla de Verbos en Perfecto', url: '/semanas/semana18/html/10. Tabla de verbos.html', icono: '🔟' },
      { tipo: 'html', titulo: 'Vocabulario Semana 18', url: '/semanas/semana18/html/vocabularioSemana18.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana18/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Completa el Perfecto', url: '/semanas/semana18/juegos/Completa el Perfecto.html', icono: '✏️', nota: 'Completa la forma del perfecto' }
    ]
  },
  19: {
    numero: 19,
    titulo: "Introducción a los Participios",
    tema: "El verbo-adjetivo: morfología, aspecto verbal y usos introductorios",
    recursos: [
      { tipo: 'html', titulo: 'Introducción a los Participios', url: '/semanas/semana19/html/1. Introduccion a los participios.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Concepto y Visión', url: '/semanas/semana19/html/2. Concepto y vision.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Formación', url: '/semanas/semana19/html/3. Formacion.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Aspecto Verbal', url: '/semanas/semana19/html/4. Aspecto.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Usos: Adverbial y Adjetival', url: '/semanas/semana19/html/5. Usos adverbial y adjetival.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Voz y Negación', url: '/semanas/semana19/html/6. Voz y negacion.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Ejemplos Bíblicos', url: '/semanas/semana19/html/7. Ejemplos biblicos.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana19/html/8. Ejercicios.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Credo Apostólico en Griego', url: '/semanas/semana19/html/9. Credo apostolico.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Resumen y Tarea', url: '/semanas/semana19/html/10. Resumen y tarea.html', icono: '🔟' },
      { tipo: 'html', titulo: 'Vocabulario Semana 19', url: '/semanas/semana19/html/11. vocabularioSemana19.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana19/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Completa el Participio', url: '/semanas/semana19/juegos/Completa el Participio.html', icono: '✏️', nota: 'Completa la forma correcta' }
    ]
  },
  20: {
    numero: 20,
    titulo: "El Participio Presente",
    tema: "Acción continua contemporánea y usos adverbiales circunstanciales",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Participio Presente', url: '/semanas/semana20/html/1. Introduccion al participio presente.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Ejemplo Exegético: 2 Corintios 3:18', url: '/semanas/semana20/html/2. Ejemplo exegetico.html', icono: '💡' },
      { tipo: 'html', titulo: 'Formación del Participio Presente', url: '/semanas/semana20/html/3. Formacion.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Paradigmas', url: '/semanas/semana20/html/4. Paradigmas.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Procedimiento de Traducción', url: '/semanas/semana20/html/5. Traduccion.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Usos Adverbiales', url: '/semanas/semana20/html/6. Usos adverbiales.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Resumen', url: '/semanas/semana20/html/7. Resumen.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana20/html/8. Ejercicios.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 20', url: '/semanas/semana20/html/vocabularioSemana20.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana20/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Caza-Participios', url: '/semanas/semana20/juegos/cazaParticipios.html', icono: '🔍', nota: 'Encuentra el participio en cada versículo' },
      { titulo: 'Rompecabezas de Participios', url: '/semanas/semana20/juegos/rompecabezas.html', icono: '🧩', nota: 'Arma el participio tocando las piezas' },
      { titulo: 'Juego Integrador', url: '/semanas/semana20/juegos/juegoIntegrador.html', icono: '🎮', nota: 'Caza-Participios y Rompecabezas combinados' }
    ]
  },
  21: {
    numero: 21,
    titulo: "El Participio Aoristo Adverbial",
    tema: "Acción completa, anterioridad temporal y usos adverbiales",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Participio Aoristo', url: '/semanas/semana21/html/1. Introduccion al participio aoristo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Ejemplo Exegético: Hechos 19:2', url: '/semanas/semana21/html/2. Ejemplo exegetico.html', icono: '💡' },
      { tipo: 'html', titulo: 'Formación', url: '/semanas/semana21/html/3. Formacion.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Paradigmas', url: '/semanas/semana21/html/4. Paradigmas.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Segundo Aoristo', url: '/semanas/semana21/html/5. Segundo aoristo.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Relación Temporal', url: '/semanas/semana21/html/6. Relacion temporal.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Traducción', url: '/semanas/semana21/html/7. Traduccion.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana21/html/9. Ejercicios.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 21', url: '/semanas/semana21/html/vocabularioSemana21.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana21/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Caza-Participios Aoristo', url: '/semanas/semana21/juegos/cazaParticipiosAoristo.html', icono: '🔍', nota: 'Encuentra el participio aoristo' },
      { titulo: 'Rompecabezas Aoristo', url: '/semanas/semana21/juegos/rompecabezasAoristo.html', icono: '🧩', nota: 'Arma el participio aoristo' },
      { titulo: 'Clasifica los Participios', url: '/semanas/semana21/juegos/clasificaParticipios.html', icono: '🎯', nota: 'Clasifica tiempo y aspecto' }
    ]
  },
  22: {
    numero: 22,
    titulo: "Los Participios Adjetivales",
    tema: "Participio atributivo y sustantivado (con artículo)",
    recursos: [
      { tipo: 'html', titulo: 'Introducción a los Participios Adjetivales', url: '/semanas/semana22/html/1. Introduccion a los participios adjetivales.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Ejemplo Exegético: Romanos 1:3-4', url: '/semanas/semana22/html/2. Ejemplo exegetico.html', icono: '💡' },
      { tipo: 'html', titulo: 'Tipos de Participio Adjetival', url: '/semanas/semana22/html/3. Tipos.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Participio Atributivo', url: '/semanas/semana22/html/4. Atributivo.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Participio Sustantivo', url: '/semanas/semana22/html/5. Sustantivo.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Paradigmas', url: '/semanas/semana22/html/6. Paradigmas.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Aspecto', url: '/semanas/semana22/html/7. Aspecto.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana22/html/8. Ejercicios.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 22', url: '/semanas/semana22/html/vocabularioSemana22.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana22/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Clasifica Participios Adjetivales', url: '/semanas/semana22/juegos/clasificaParticipiosAdjetivales.html', icono: '🎯', nota: 'Atributivo o Sustantivo' },
      { titulo: 'Caza-Participio Adjetival', url: '/semanas/semana22/juegos/cazaParticipioAdjetival.html', icono: '🔍', nota: 'Encuentra el participio adjetival' },
      { titulo: 'Rompecabezas Adjetival', url: '/semanas/semana22/juegos/rompecabezasAdjetival.html', icono: '🧩', nota: 'Arma el participio' },
      { titulo: 'Juego Integrador', url: '/semanas/semana22/juegos/juegoIntegrador.html', icono: '🎮', nota: 'Práctica completa' }
    ]
  },
  23: {
    numero: 23,
    titulo: "Participios Perfectos y Genitivos Absolutos",
    tema: "Participio Perfecto, Genitivo Absoluto y Construcciones Perifrásticas",
    recursos: [
      { tipo: 'html', titulo: 'Introducción', url: '/semanas/semana23/html/1. Introduccion.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Ejemplo Exegético: Efesios 2:8', url: '/semanas/semana23/html/2. Ejemplo exegetico.html', icono: '💡' },
      { tipo: 'html', titulo: 'El Participio Perfecto', url: '/semanas/semana23/html/3. Participio perfecto.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Paradigmas', url: '/semanas/semana23/html/4. Paradigmas.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Genitivo Absoluto', url: '/semanas/semana23/html/5. Genitivo absoluto.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Construcciones Perifrásticas', url: '/semanas/semana23/html/6. Construcciones perifrasticas.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Segundo Perfecto', url: '/semanas/semana23/html/7. Segundo perfecto.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana23/html/9. Ejercicios.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 23', url: '/semanas/semana23/html/vocabularioSemana23.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana23/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Detective de Genitivos', url: '/semanas/semana23/juegos/detectiveGenitivos.html', icono: '🕵️', nota: 'Identifica genitivos absolutos' },
      { titulo: 'Clasifica Construcciones', url: '/semanas/semana23/juegos/clasificaConstrucciones.html', icono: '🎯', nota: 'Clasifica construcciones perifrásticas' },
      { titulo: 'Caza-Genitivos Absolutos', url: '/semanas/semana23/juegos/cazaGenitivoAbsoluto.html', icono: '🔍', nota: 'Encuentra el genitivo absoluto' },
      { titulo: 'Gran Repaso de Participios', url: '/semanas/semana23/juegos/juegoResumenParticipios.html', icono: '🏆', nota: 'Resumen de TODOS los participios' }
    ]
  },
  24: {
    numero: 24,
    titulo: "El Modo Subjuntivo",
    tema: "Subjuntivo: Propósito (ἵνα), Condición (ἐάν), Exhortación y Negación Enfática (οὐ μή)",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Subjuntivo', url: '/semanas/semana24/html/1. Introduccion al subjuntivo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Ejemplo Exegético: Juan 10:28', url: '/semanas/semana24/html/2. Ejemplo exegetico.html', icono: '💡' },
      { tipo: 'html', titulo: 'Aspecto vs Tiempo', url: '/semanas/semana24/html/3. Aspecto vs tiempo.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Formación del Subjuntivo', url: '/semanas/semana24/html/4. Formacion.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'ἵνα + Subjuntivo', url: '/semanas/semana24/html/5. Hina mas subjuntivo.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'ἐάν + Subjuntivo', url: '/semanas/semana24/html/6. Ean mas subjuntivo.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Subjuntivo Hortatorio', url: '/semanas/semana24/html/7. Subjuntivo hortatorio.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Negación Enfática', url: '/semanas/semana24/html/8. Negacion enfatica.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana24/html/10. Ejercicios.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 24', url: '/semanas/semana24/html/vocabularioSemana24.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana24/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Caza-Subjuntivos', url: '/semanas/semana24/juegos/cazaSubjuntivo.html', icono: '🔍', nota: 'Encuentra el verbo en subjuntivo' },
      { titulo: 'Clasifica Usos del Subjuntivo', url: '/semanas/semana24/juegos/clasificaUsosSubjuntivo.html', icono: '🎯', nota: 'Clasifica propósito, condición, etc.' },
      { titulo: 'Rompecabezas Subjuntivo', url: '/semanas/semana24/juegos/rompecabezasSubjuntivo.html', icono: '🧩', nota: 'Arma la forma verbal' },
      { titulo: 'Gran Repaso del Subjuntivo', url: '/semanas/semana24/juegos/juegoResumenSubjuntivo.html', icono: '🏆', nota: 'Resumen completo' }
    ]
  },
  25: {
    numero: 25,
    titulo: "El Infinitivo Griego",
    tema: "Infinitivo sustantivado, complementario, con preposiciones y de propósito",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Infinitivo', url: '/semanas/semana25/html/1. Introduccion al infinitivo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Ejemplo Exegético: 1 Corintios 15:25', url: '/semanas/semana25/html/2. Ejemplo exegetico.html', icono: '💡' },
      { tipo: 'html', titulo: 'Aspecto vs Tiempo', url: '/semanas/semana25/html/3. Aspecto vs tiempo.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Formación del Infinitivo', url: '/semanas/semana25/html/4. Formacion.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Infinitivo Sustantivado', url: '/semanas/semana25/html/5. Infinitivo sustantivado.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Infinitivo Complementario', url: '/semanas/semana25/html/6. Infinitivo complementario.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Infinitivo con Preposición', url: '/semanas/semana25/html/7. Infinitivo con preposicion.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Infinitivo de Propósito', url: '/semanas/semana25/html/8. Infinitivo de proposito.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana25/html/10. Ejercicios.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 25', url: '/semanas/semana25/html/vocabularioSemana25.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana25/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Caza-Infinitivos', url: '/semanas/semana25/juegos/cazaInfinitivos.html', icono: '🔍', nota: 'Encuentra el infinitivo' },
      { titulo: 'Clasifica Infinitivos', url: '/semanas/semana25/juegos/clasificaInfinitivos.html', icono: '🎯', nota: 'Clasifica función' },
      { titulo: 'Rompecabezas Infinitivo', url: '/semanas/semana25/juegos/rompecabezasInfinitivo.html', icono: '🧩', nota: 'Arma la forma del infinitivo' },
      { titulo: 'Gran Repaso del Infinitivo', url: '/semanas/semana25/juegos/juegoResumenInfinitivo.html', icono: '🏆', nota: 'Resumen completo' }
    ]
  },
  26: {
    numero: 26,
    titulo: "El Modo Imperativo",
    tema: "Imperativo: 2ª y 3ª persona, aspecto (presente vs aoristo) y prohibiciones",
    recursos: [
      { tipo: 'html', titulo: 'Introducción al Imperativo', url: '/semanas/semana26/html/1. Introduccion al imperativo.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Perspectiva Exegética', url: '/semanas/semana26/html/2. Perspectiva exegetica.html', icono: '💡' },
      { tipo: 'html', titulo: 'Aspecto vs Tiempo', url: '/semanas/semana26/html/3. Aspecto vs tiempo.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Persona', url: '/semanas/semana26/html/4. Persona.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Formación', url: '/semanas/semana26/html/5. Formacion.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Paradigmas', url: '/semanas/semana26/html/6. Paradigmas.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Usos del Imperativo', url: '/semanas/semana26/html/7. Usos del imperativo.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Prohibiciones (μή + imperativo / aoristo subjuntivo)', url: '/semanas/semana26/html/8. Prohibiciones.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Ejercicios', url: '/semanas/semana26/html/10. Ejercicios.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Vocabulario Semana 26', url: '/semanas/semana26/html/vocabularioSemana26.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana26/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Caza-Imperativos', url: '/semanas/semana26/juegos/cazaImperativos.html', icono: '🔍', nota: 'Encuentra el imperativo' },
      { titulo: 'Clasifica Imperativos', url: '/semanas/semana26/juegos/clasificaImperativos.html', icono: '🎯', nota: 'Persona, aspecto y voz' },
      { titulo: 'Rompecabezas Imperativo', url: '/semanas/semana26/juegos/rompecabezasImperativo.html', icono: '🧩', nota: 'Arma la forma del imperativo' },
      { titulo: 'Gran Repaso del Imperativo', url: '/semanas/semana26/juegos/juegoResumenImperativo.html', icono: '🏆', nota: 'Resumen completo' }
    ]
  },
  27: {
    numero: 27,
    titulo: "Verbos en -μι (Conjugación Atemática)",
    tema: "Las 5 reglas de los verbos atemáticos, δίδωμι, τίθημι, ἵστημι y ἀφίημι",
    recursos: [
      { tipo: 'html', titulo: 'Importancia Exegética: La Cruz en Gálatas 6:14', url: '/semanas/semana27/html/1. Exegesis.html', icono: '💡' },
      { tipo: 'html', titulo: 'Introducción a los Verbos en -μι', url: '/semanas/semana27/html/2. Introduccion.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Las Cuatro Clases de Verbos en -μι', url: '/semanas/semana27/html/3. Cuatro clases.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Regla 1: Reduplicación con Iota', url: '/semanas/semana27/html/4. Regla 1 reduplicacion.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Regla 2: Sin Vocal de Conexión', url: '/semanas/semana27/html/5. Regla 2 sin vocal tematica.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Regla 3: Tres Terminaciones', url: '/semanas/semana27/html/6. Regla 3 tres terminaciones.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Regla 4: Ablaut', url: '/semanas/semana27/html/7. Regla 4 ablaut.html', icono: '7️⃣' },
      { tipo: 'html', titulo: 'Regla 5: Aoristo Kappa', url: '/semanas/semana27/html/8. Regla 5 aoristo kappa.html', icono: '8️⃣' },
      { tipo: 'html', titulo: 'Paradigma Completo: δίδωμι', url: '/semanas/semana27/html/9. Paradigma didomi.html', icono: '9️⃣' },
      { tipo: 'html', titulo: 'Práctica de Reconocimiento', url: '/semanas/semana27/html/10. Practica.html', icono: '🔟' },
      { tipo: 'html', titulo: 'Vocabulario Esencial y Semana 27', url: '/semanas/semana27/html/11. Vocabulario.html', icono: '📖' }
    ],
    juegos: [
      { titulo: 'Empareja las palabras', url: '/semanas/semana27/juegos/3. Empareja las palabras.html', icono: '🔄', nota: 'Toca la palabra griega y su traducción' },
      { titulo: 'Caza-Verbos en -μι', url: '/semanas/semana27/juegos/cazaVerbosMi.html', icono: '🔍', nota: 'Encuentra el verbo atemático' },
      { titulo: 'Clasifica Verbos en -μι', url: '/semanas/semana27/juegos/clasificaVerbosMi.html', icono: '🎯', nota: 'Clasifica clase, tiempo y persona' },
      { titulo: 'Rompecabezas Verbos -μι', url: '/semanas/semana27/juegos/rompecabezasVerbosMi.html', icono: '🧩', nota: 'Arma la forma verbal' },
      { titulo: 'Gran Repaso de Verbos -μι', url: '/semanas/semana27/juegos/juegoResumenVerbosMi.html', icono: '🏆', nota: 'Resumen completo' }
    ]
  },
  28: {
    numero: 28,
    titulo: "Consolidación Final — Griego II",
    tema: "Repaso integrador: verbos, participios, modos no indicativos y estrategias de traducción",
    recursos: [
      { tipo: 'html', titulo: 'Introducción a la Consolidación', url: '/semanas/semana28/html/1. Introduccion consolidacion.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Repaso de Verbos', url: '/semanas/semana28/html/2. Repaso de verbos.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Repaso de Participios', url: '/semanas/semana28/html/3. Repaso de participios.html', icono: '3️⃣' },
      { tipo: 'html', titulo: 'Repaso de Modos No Indicativos', url: '/semanas/semana28/html/4. Repaso de modos no indicativos.html', icono: '4️⃣' },
      { tipo: 'html', titulo: 'Repaso de Conjugaciones Atemáticas', url: '/semanas/semana28/html/5. Repaso de conjugaciones atematicas.html', icono: '5️⃣' },
      { tipo: 'html', titulo: 'Cuadro General de Tiempos', url: '/semanas/semana28/html/6. Cuadro general de tiempos.html', icono: '6️⃣' },
      { tipo: 'html', titulo: 'Estrategias de Traducción', url: '/semanas/semana28/html/7. Estrategias de traduccion.html', icono: '7️⃣' }
    ],
    juegos: [
      { titulo: 'Maratón de Verbos', url: '/semanas/semana28/juegos/1. Maraton de verbos.html', icono: '🏃', nota: 'Identifica los 6 tiempos verbales' },
      { titulo: 'Cazador de Participios', url: '/semanas/semana28/juegos/2. Cazador de participios.html', icono: '🎯', nota: 'Encuentra el participio en versículos del NT' },
      { titulo: 'Clasifica Modos', url: '/semanas/semana28/juegos/3. Clasifica modos.html', icono: '🔀', nota: 'Indicativo, subjuntivo, imperativo, etc.' },
      { titulo: 'Conquista de las -μι', url: '/semanas/semana28/juegos/4. Conquista de las -μι.html', icono: '⚔️', nota: 'Domina las 4 clases de verbos' },
      { titulo: 'Super Juego Integrador', url: '/semanas/semana28/juegos/5. Super juego integrador.html', icono: '🏆', nota: '¡TODO el griego II en un solo juego!' }
    ]
  },
  29: {
    numero: 29,
    titulo: "Lectura Guiada I: Prólogo de Juan (1:1-18)",
    tema: "Traducción y análisis exegético verso por verso de Juan 1:1-18",
    recursos: [
      { tipo: 'html', titulo: 'El Logos en el principio', url: '/semanas/semana29/html/1. El Logos en el principio.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'La Palabra hecha carne', url: '/semanas/semana29/html/2. La Palabra hecha carne.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Video de la semana', url: '/semanas/semana29/html/3. Video de la semana.html', icono: '🎬' }
    ],
    juegos: [
      { titulo: 'Quiz de lectura: Juan 1:1-18', url: '/semanas/semana29/juegos/quizLectura.html', icono: '🎯', nota: 'Repasa el texto griego de Juan' }
    ]
  },
  30: {
    numero: 30,
    titulo: "Lectura Guiada II: 1 Juan 1:1-10 y Evaluación Final",
    tema: "Comunión con Dios, Dios es Luz, confesión de pecados y graduación",
    recursos: [
      { tipo: 'html', titulo: 'Lo que vimos y oímos', url: '/semanas/semana30/html/1. Lo que vimos y o├¡mos.html', icono: '1️⃣' },
      { tipo: 'html', titulo: 'Dios es luz', url: '/semanas/semana30/html/2. Dios es luz.html', icono: '2️⃣' },
      { tipo: 'html', titulo: 'Video de la semana', url: '/semanas/semana30/html/3. Video de la semana.html', icono: '🎬' }
    ],
    juegos: [
      { titulo: 'Quiz de lectura: 1 Juan 1:1-10', url: '/semanas/semana30/juegos/quizLectura.html', icono: '🎯', nota: 'Evaluación final integradora' }
    ]
  }
};
