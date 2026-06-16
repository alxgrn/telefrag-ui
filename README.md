# UI-библиотека проекта [The Daily Telefrag](https://dailytelefrag.ru)
Документация по компонентам [тут](./docs/README.md)

### ВНИМАНИЕ: Для работы `Link` в навигации главного меню пришлось добавить внешнюю зависимость от `react-router`. Это не очень хорошее решение т.к. данная библиотека используется в библиотеках редакторов, которым роутер совсем не нужен, но его приходится прописывать также как внешнюю зависимость. Необходимо будет выделить компонент `Layout` и все связанные с ним компоненты в отдельную библиотеку и избавится от ненужных зависимостей от `react-router`!

Ниже просто мусор для памяти :)

## Подготовка для публикации библиотеки
https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma
ВНИМАНИЕ: на последней версии Vite может возникнуть ошибка `but '--jsx' is not set`.
Как её чинить непонятно. В интернете пишут про версии TS и т.п. Поэтому инциализировали версию vite 5.0.0 с более старыми версиями всего.

## Настройка тестов
https://deku.posstree.com/en/react/vite/react-typescript/test/

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
