/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    es2020: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: [
          './apps/desktop/tsconfig.json',
          './apps/desktop/ui-electron/tsconfig.json',
          './apps/backend-main/tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
        noWarnOnMultipleProjects: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', './node_modules', '../../node_modules'],
      },
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/set-state-in-effect': 'warn',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.css$', '.module.css$', '.scss$'],
      },
    ],
    'import/no-named-as-default-member': 'warn',
    'import/default': 'off',
    'no-console': [
      'warn',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  overrides: [
    {
      files: ['apps/desktop/ui-electron/src/**/*'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-console': 'off',
      },
    },
    {
      files: [
        'apps/desktop/main/**/*',
        'apps/desktop/backend-electron/**/*',
        'apps/backend-main/src/**/*',
        'apps/desktop/scripts/**/*',
        'apps/backend-main/scripts/**/*',
      ],
      env: {
        node: true,
        browser: false,
      },
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        'import/no-named-as-default-member': 'off',
      },
    },
  ],
  ignorePatterns: [
    'dist',
    'release',
    'apps/desktop/dist',
    'apps/desktop/release',
    'node_modules',
    '*.js',
    '*.d.ts',
    'coverage',
    '.eslintrc.cjs',
    'apps/desktop/ui-electron/public/**/*',
    'apps/desktop/ui-electron/src/styles/**/*',
  ],
};
