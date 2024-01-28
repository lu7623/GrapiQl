export const EN = {
  mainPage: "Main Page",
  footer: "Footer",
  en: "EN",
  ru: "RU",
  appBroken: "It looks like the app is broken...",
  errDesc: "Error description: ",
  youCan: "You can",
  again: "Try again",
  orGoTo: "or go to",
  welcomePage: "Welcome Page",
  notFound: "Not Found",
  notFoundDesc: "Could not find requested resource",
  goTo: "Go to",
  persons: [
    {
      name: "Roman Shevyakov",
      role: "Team Lead",
      photoUrl: "/Shevyakov.jpg",
      githubUrl: "https://github.com/ramzes-84",
      description:
        "Was born in 1984 in Tula`s region. Owns a binoculars. Worked as a lawyer for a long time but after moving to another country faced with a necessity to make some changes in profession. The RSSchool learning is the first attempt to enter the IT world.",
      contributions: [
        "repository setup and development environment configuration;",
        "components development;",
        "testing.",
      ],
    },
    {
      name: "Lyubov Agulova",
      role: "Developer",
      photoUrl: "/Agulova.jpg",
      githubUrl: "https://github.com/lu7623",
      description:
        "Was born in Voronezh, Russia in 1992, now I live in Saint Petersburg . Graduated as a Bachelor of radiophysics from Voronezh State University in 2013. Currently working as a stained glass crafter in my small home workshop. I`m a self-taught glass artist and I think self education is a strong point of my personality. Also running business gave me skills such as flexibility, resourcefulness, and persistence in achieving goals.",
      contributions: [
        "authorization ability;",
        "components development;",
        "App design solutions;",
        "testing.",
      ],
    },
    {
      name: "Kseniya Merkulova",
      role: "Developer",
      photoUrl: "/Merkulova.jpg",
      githubUrl: "https://github.com/mksenni",
      description:
        "Born in Petropavlovsk, Kazakhstan, in 1992 and soon my family moved to Russia. Received an economic education and worked for 6 years as a financial consultant in a bank. But I always wanted to change my profession and see the result of my work. Then I became a mother, went to live in Tyumen, Russia, and while on maternity leave began my way into IT. I was HR in an IT company, then took a short course on basics of front-end development. Studying at RS School is first serious training in the IT world.",
      contributions: [
        "components development;",
        "testing;",
        "creating an Welcome page.",
      ],
    },
  ],
  welcDesc:
    "The GraphiQL App as a result of the development was made thanks to the numerous efforts of each team member. Upon completion of the project, we can confidently say that the team united and accurately completed all the assigned tasks. The development process was accompanied by mutual understanding and supporting to each other.",
  stack: "Technology stack:",
  stackDesc:
    "The application was built using modern web technologies such as Next.js, React, Typescript and Jest.",
  coord: "Work coordination:",
  coordDesc:
    "To distribute tasks, set intermediate deadlines, ensure everyone understands the progress of development and avoid duplication we have used task tracking with GitHub Project board. Communication in team took place in Telegram group chat. Skype meetings with mentor helped us in solving problems that have arisen in the development process.",
  quality: "Code quality control:",
  qualityDesc:
    "For automatic code formatting and linting checks during the commit process we used Husky with ESlint and Prettier. Each PR should have gotten 2 approves before being merged in the develop branch. In the repository we organized CI/CD workflow with Vercel Deployment for continuous application build and deploy.",
  welcToGit: "Welcome to my GitHub",
  contributionsTitle: "Contributions to GraphiQL Application project:",
  myGit: "My GitHub",
  defaultTextEditor: `
  # Welcome to GraphiQL
  #
  # GraphiQL is an in-browser tool for writing, validating, and
  # testing GraphQL queries.
  #
  # Type queries into this side of the screen, and you will see intelligent
  # typeaheads aware of the current GraphQL type schema and live syntax and
  # validation errors highlighted within the text.
  #
  # GraphQL queries typically start with a "{" character. Lines that start
  # with a # are ignored.
  #
  # An example GraphQL query might look like:
  #
  #     {
  #       field(arg: "value") {
  #         subField
  #       }
  #     }
`,
  login: "Sign In",
  logout: "Sign Out",
  register: "Sign Up",
  loginWithGoogle: "Sign In With Google",
  registerWithGoogle: "Sign Up With Google",
  notHaveAnAccount: "Do not have an account?",
  haveAnAccount: "Already have an account?",
  loginTitle: "Sign in to your account",
  signupTitle: "Registration",
  emailField: "Email address",
  passwordField: "Password",
  emailWrong: "Incorrect email address",
  emailRequired: "Please enter email address",
  passwordRequired: "Please enter your password",
  passwordWrong: "Your password must have at least 1 ",
  letter: "letter",
  specialCharacter: "special character",
  digit: "digit",
  userNotFound: "Invalid e-mail address or password ",
  alreadyExist: "User with this email already exists",
  minLength: "Your password must be 8 or more characters",
  networkFailed: "Network failed",
  youAreAuth1: "You are authenticated. The",
  youAreAuth2: "is available for you.",
  youAreNotAuth1: "You are not authenticated. Please",
  youAreNotAuth2: "to get access to the editor",
  or: "or",
  serverChooserLabel: "Please choose the server:",
  countries: "Countries",
  rickAndMorty: "Rick And Morty",
  setServer: "Set",
  actualServer: "Current endpoint:",
  customServer: "Custom",
  variables: "Variables",
  headers: "Headers",
  tokenValid: "Access open until:",
  docHeader: "Server's Documentation",
  swapi: "Star Wars",
  rootTypes: "Root Types",
  description: "Description",
  back: "< Back",
  notProvided: "not provided",
  fields: "Fields",
  type: "Type",
  types: "All Types",
  kind: "Kind",
  enums: "Enum values",
  createPopupTooltipError: "I can not describe this entity",
  unauthorized: "Unauthorized",
  invalidQuery: "Invalid query",
  serverError: "Server error",
  failedToFetch:
    "Failed to fetch. Please check your network connection and URL address",
  unauthorizedSchema:
    "This endpoint requires authorization. Please set authorization headers down below",
  failedToLoadSchema: "Failed to load documentation",
};

export const RU: typeof EN = {
  mainPage: "Главная страница",
  footer: "Подвал",
  en: "АНГ",
  ru: "РУС",
  appBroken: "Похоже, приложение сломано...",
  errDesc: "Описание ошибки: ",
  youCan: "Вы можете",
  again: "Попытаться снова",
  orGoTo: "или перейти к",
  welcomePage: "О нас",
  notFound: "Не найдено",
  notFoundDesc: "Не можем найти запрашиваемый ресурс",
  goTo: "Перейти на",
  persons: [
    {
      name: "Роман Шевяков",
      role: "Тимлид",
      photoUrl: "/Shevyakov.jpg",
      githubUrl: "https://github.com/ramzes-84",
      description:
        "Родился в 1984 в Тульской области. Владеет биноклем. Долгое время работал юристом, однако после переезда в другую страну столкнулся с необходимостью внести корректировки в профессию. RS School - первая попытка войти в программирование.",
      contributions: [
        "настройка репозитория и среды разработки;",
        "разработка компонентов;",
        "тестирование.",
      ],
    },
    {
      name: "Любовь Агулова",
      role: "Разработчик",
      photoUrl: "/Agulova.jpg",
      githubUrl: "https://github.com/lu7623",
      description:
        "Родилась в Воронеже в 1992, сейчас проживаю в Санкт-Петербурге. Окончила Воронежский государственный университет по специальности радиоэлектроника в 2013. В настоящий момент создаю шедевры из стекла для своего интернет-магазина. Я - художник-самоучка и мне кажется, способность к самообучению это сильная сторона моего характера. Также управление собственным бизнесом дало мне такие навыки, как гибкость, ответственность и настойчивость в достижении целей.",
      contributions: [
        "авторизация;",
        "разработка компонентов;",
        "многие технические решения;",
        "тестирование.",
      ],
    },
    {
      name: "Ксения Меркулова",
      role: "Разработчик",
      photoUrl: "/Merkulova.jpg",
      githubUrl: "https://github.com/mksenni",
      description:
        "Родилась в Петропавловске, Казахстан, в 1992, и вскоре переехала в Россию. Получила высшее экономическое образование и 6 лет работала финансовым консультантом в банке. Но я всегда хотела поменять профессию, чтобы видеть результат своей работы. Затем я стала мамой, переехала в Тюмень, и начала свой путь в IT. Я была специалистом по подбору персонала в IT-компании, а затем прошла небольшой курс по основам фронтэнда. Обучение в RS School - это первая серьёзная попытка войти в мир программирования.",
      contributions: [
        "авторизация;",
        "разработка компонентов;",
        "создание приветственной страницы",
        "многие технические решения;",
        "тестирование.",
      ],
    },
  ],
  welcDesc:
    "GraphiQL-приложение как результат разработки стало возможно благодаря стараниям каждого члена команды. После завершения проекта мы можем с уверенность утверждать, что команда сплотилась и точно выполнила все стоявшие перед ней задачи. Процесс разработки сопровождался взаимопониманием и поддержкой друг друга.",
  stack: "Технологический стэк:",
  stackDesc:
    "Приложение разработано на основе современных решений, таких как Next.js, React, Typescript и Jest.",
  coord: "Координация работы:",
  coordDesc:
    "Для делегирования задач, установления промежуточных дэдлайнов, понимания работы друг друга и избегания задваивания задач мы использовали доску GitHub Project. Коммуникация осуществлялась в Telegram. Skype использовался для обсуждения важных задач и встреч с ментором.",
  quality: "Контроль качества программирования:",
  qualityDesc:
    "Для автоматического форматирования кода и проверки его корректности на стадии коммитов мы использовали Husky с ESlint и Prettier. Каждый PR должен был получить два утверждения, прежде, чем влиться в основную ветку. В репозитории мы организовали CI/CD подход с помощью Vercel Deployment для тестирования готовности билдов и деплоя их на лету.",
  welcToGit: "Перейти на GitHub страницу",
  contributionsTitle: "Вклад в проект:",
  myGit: "Мой GitHub",
  defaultTextEditor: `
  # Добро пожаловать в GraphiQL
  #
  # GraphiQL это инструмент в браузере для написания, проверки, и
  # тестирования GraphQL запросов.
  #
  # Введите запросы в этот редактор, и вы увидите текущую
  # схему типов GraphQL и документацию.
  #
  # GraphQL запросы обычно начинаются с " query NAME {". Линии, начинающиеся
  # с # игнорируются.
  #
  # Например, GraphQL запрос может выглядеть так:
  #
  #     {
  #       field(arg: "value") {
  #         subField
  #       }
  #     }
  `,
  login: "Войти",
  logout: "Выйти",
  register: "Зарегистрироваться",
  loginWithGoogle: "Войти с Google",
  registerWithGoogle: "Регистрация с Google",
  notHaveAnAccount: "Еще нет аккаунта?",
  loginTitle: "Войти в аккаунт",
  passwordField: "Пароль",
  emailField: "Емайл адрес",
  haveAnAccount: "Уже зарегистрированы?",
  emailWrong: "Неверный емайл",
  emailRequired: "Пожалуйста, введите емайл",
  passwordRequired: "Пожалуйста, введите пароль",
  passwordWrong: "Ваш пароль должен содержать как минимум 1 ",
  letter: "букву",
  specialCharacter: "специальный символ",
  digit: "цифру",
  signupTitle: "Регистрация",
  userNotFound: "Неверно указан адрес эл. почты или пароль. ",
  alreadyExist: "Пользователь с такими данными уже существует",
  minLength: "Пароль должен быть минимум 8 символов",
  networkFailed: "Ошибка сети",
  youAreAuth1: "Вы авторизованы. ",
  youAreAuth2: "доступна.",
  youAreNotAuth1: "Вы не авторизованы.",
  youAreNotAuth2: "для доступа к редактору.",
  or: "или",
  serverChooserLabel: "Пожалуйста, выберите сервер:",
  countries: "Страны",
  rickAndMorty: "Рик и Морти",
  setServer: "Задать",
  actualServer: "Текущий сервер:",
  customServer: "Задать свой",
  variables: "Переменные",
  headers: "Хедеры",
  tokenValid: "Доступ открыт до:",
  docHeader: "Документация по серверу",
  swapi: "Звёздные войны",
  rootTypes: "Корневые типы",
  description: "Описание",
  back: "< Назад",
  notProvided: "не предоставлено",
  fields: "Поля",
  type: "Тип",
  types: "Все типы",
  kind: "Вид",
  enums: "Значения ENUM",
  createPopupTooltipError: "Не могу описать данную сущность",
  unauthorized: "Требуется авторизация",
  invalidQuery: "Ошибка запроса",
  serverError: "Ошибка сервера",
  failedToFetch:
    "Запрос не может быть выполнен. Проверьте интернет соединение и URL адрес",
  unauthorizedSchema:
    "Требуется авторизация. Введите заголовки авторизации ниже",
  failedToLoadSchema: "Ошибка при загрузке документации",
};
