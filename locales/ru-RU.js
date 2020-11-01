
export default {
  appName: 'Финапка',

  locale: {
    toogle: 'Сменить язык'
  },

  theme: {
    change: 'Сменить цвет оформления'
  },

  trnForm: {
    transferTitle: 'Перевод',
    createTrnButton: 'Создать Транзакцию',
    createTransferButton: 'Создать Перевод',
    titleEditTrn: 'Редактирование Транзакции',
    titleEditTransfer: 'Редактирование Перевода',
    titleCreateTrn: 'Создание Транзакции',
    titleCreateTransfer: 'Создание Перевода',
    filterWalletAndCategory: 'Кошелек и Категория',
    filterWallet: 'Только Кошелек',
    filterAll: 'Все',
    title: 'Создание транзакции',
    lastUsedCats: 'Показывать последние использованные категории',
    description: {
      title: 'Описание',
      placeholder: 'Напишите описание...'
    },
    transfer: {
      fromShort: 'Из',
      toShort: 'В',
      fromTitle: 'Перевести из кошелька',
      fromText: 'Из кошелька',
      toTitle: 'Перевести в кошелек',
      toText: 'В кошелек'
    },

    editTrnButton: 'Сохранить Транзакцию',
    editTransferButton: 'Сохранить Перевод',
    amountButtonEmpty: 'Введи трату'
  },

  about: {
    creators: {
      title: 'Создатели',
      author: 'Автор',
      ideas: 'Идеи и тестирование'
    }
  },

  app: {
    update: {
      title: 'Доступа новая версия',
      text: 'Перезагрузи приложение. Иногда требуется несколько перезагрузок. Не волнуйся ты все равно можно использовать приложение.'
    },
    version: 'Версия',
    desc: 'Приложение для учета личных финансов',
    welcome: 'Добро пожаловать в Финапку',
    lang: {
      select: 'Выберите язык',
      en: 'English',
      ru: 'Русский'
    },
    theme: {
      change: 'Сменить тему',
      select: 'Выберите тему',
      dark: 'Темная',
      light: 'Светлая'
    },
    madeBy: {
      text: 'Разработал',
      name: 'Илья Комичев'
    }
  },

  userLogout: 'Выход',
  loginWithGoogle: 'Войти через Google',
  changeTheme: 'Сменить оформление',
  createTrn: 'Создать транзакцию',

  base: {
    sure: 'Ты уверен?',
    yes: 'Да',
    no: 'Нет',
    sort: 'Сортировка',
    save: 'Сохранить',
    cancel: 'Отмена',
    on: 'Да',
    dublicate: 'Дублировать',
    setFilter: 'Применить фильтр по',
    off: 'Нет',
    edit: 'Редактировать',
    delete: 'Удалить',
    filter: 'Фильтровать'
  },

  filter: {
    clear: 'Очистить фильтр'
  },

  welcome: {
    firstRun: {
      text: 'Пройти первоначальную настройку приложения',
      btn: 'Начать'
    },
    create: {
      text: 'Начнем с создания первого кошелька и категории',
      btn: 'Создать'
    },
    or: 'или',
    demo: {
      text: 'Загрузить приложение с заранее созданными кошельками и категориями',
      btn: 'Открыть демо режим'
    },
    createFirstWallet: {
      text: 'Создадим первый кошелек',
      btn: 'Создать'
    },
    createFirstCategory: {
      text: 'Отлично! Теперь создадим категорию',
      btn: 'Создать'
    }
  },

  settings: {
    title: 'Настройки',
    lang: 'Язык приложения',
    options: 'Опции',
    open: 'Открыть настройки',
    customize: 'Внешний вид',
    app: 'Приложение',
    delete: 'Удаление данных',
    demo: 'Демо режим',
    deleteButton: 'Удалить все мои данные',
    loadDemoButton: 'Загрузить демо данные'
  },

  wallets: {
    title: 'Кошельки',
    name: 'Кошельки',
    new: 'Новый кошелек',
    showAll: 'показать все кошельки',
    showOnly: 'показать только',
    sortTitle: 'Сортировать кошельки',
    createNewTitle: 'Создание кошелька',
    editTitle: 'Редактирование кошелек',
    form: {
      name: {
        label: 'Имя кошелька',
        placeholder: 'Напишите имя кошелька...',
        error: 'Напишите имя кошелька',
        exist: 'Кошелек с таким именем уже существует'
      },
      color: {
        label: 'Цвет',
        placeholder: 'Выберите цвет',
        error: 'Выберите цвет',
        custom: 'Кастомный цвет'
      },
      currency: {
        label: 'Валюта',
        placeholder: 'Выберите валюту',
        error: 'Выберите валюту'
      },
      total: {
        placeholder: 'Считать в общем балансе'
      },
      save: 'Сохранить'
    }
  },

  currency: {
    selectBaseTitle: 'Выбрать основную валюту'
  },

  categories: {
    title: 'Категории',
    name: 'Категории',
    shortTitle: 'Категории',
    new: 'Новая категория',
    allTitle: 'Все',
    lastUsedTitle: 'Недавние',
    favoriteTitle: 'Любимые категории',
    createNewTitle: 'Создание категории',
    editTitle: 'Редактирование категории',
    form: {
      name: {
        label: 'Имя категории',
        placeholder: 'Напишите имя категории...',
        error: 'Напишите имя категории',
        exist: 'Категория с таким именем уже существует'
      },
      parent: {
        no: 'Корневая категория',
        label: 'Категория',
        placeholder: 'Выберите категрию'
      },
      color: {
        label: 'Цвет',
        placeholder: 'Выберите цвет',
        error: 'Выберите цвет',
        custom: 'Кастомный цвет'
      },
      icon: {
        label: 'Иконка',
        placeholder: 'Выберите иконку'
      },
      lastUsed: 'Показывать в списке последних использованных категорий',
      quickSelector: 'Добавить в быстрый выбор при создании транзакции',
      childColor: 'Применить цвет ко всем дочерних категориям',
      save: 'Сохранить'
    }
  },

  stat: {
    shortTitle: 'Статистика',
    balanceTitle: 'Баланс',
    empty: 'Статистики за выбранный период нетю :)',
    customize: {
      showPeriodsChart: 'Показывать график периодов',
      showCategorisChart: 'Показывать график категорий',
      showCategorisList: 'Показывать список категорий'
    }
  },

  chart: {
    title: 'График',
    view: {
      add: 'Добавить',
      remove: 'Удалить',
      toogle: 'Изменить график',
      showed: 'Показано',
      groupsName: 'групп',
      periodsName: 'период',
      simpleTitle: 'Простой график',
      groupedTitle: 'График с группами',
      addGroupButton: 'Добавить группу',
      addPeriodButton: 'Добавить период',
      removeGroupButton: 'Удалить группу',
      removePeriodButton: 'Удалить период'
    }
  },

  trns: {
    shortTitle: 'Транзакции',
    history: 'История',
    more: 'Показать еще'
  },

  create: {
    title: 'Создать'
  },

  money: {
    incomes: 'Доход',
    expenses: 'Расход',
    transfer: 'Перевод',
    total: 'Итого',
    average: 'Среднее',
    also: 'Еще',
    wallets: 'Кошельки',
    all: 'Всего'
  },

  dates: {
    day: {
      current: 'Сегодня',
      today: 'Сегодня',
      yesterday: 'Вчера',
      simple: 'День'
    },
    week: {
      current: 'Текущая неделя',
      simple: 'Неделя'
    },
    month: {
      current: 'Текущий месяц',
      simple: 'Месяц'
    },
    year: {
      current: 'Текущий год',
      simple: 'Год'
    },
    all: 'Показать всё'
  },

  alerts: {
    willDeleteEverything: 'Все кошельки, категории и транзакции будут удалены.'
  },

  buttons: {
    nextTitle: 'Следующий',
    prevTitle: 'Предыдущий',
    nextStep: 'Далее'
  },

  budgets: {
    id: 'budgets',
    name: 'Проекты',
    show: 'Показать проекты',
    form: {
      title: 'Создать новый проект',
      name: 'Имя проекта',
      amount: 'Стоимость проекта',
      button: 'Создать проект'
    },
    trns: {
      name: 'Транзакции проекта'
    },
    stat: {
      left: 'Осталось',
      got: 'Получено',
      total: 'Всего'
    }
  },

  groups: {
    id: 'groups',
    name: 'Группы',
    show: 'Показать группы',
    form: {
      title: 'Create new group',
      name: 'Group name',
      amount: 'Group amount',
      button: 'Create'
    },
    trns: {
      name: 'Group transactions'
    },
    stat: {
      expenses: 'Рассход',
      incomes: 'Доход',
      total: 'Итого'
    }
  },

  users: {
    title: 'Пользователи'
  }
}
