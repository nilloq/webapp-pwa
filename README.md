# Mahali

Welcome to Mahali Progressive WebApp repository.

## Community

You can chat with the core team on [Mattermost](https://mattermost.tech.orange/mahali/channels/town-square).

## Getting Started

### Prerequisites

Mahali PWA requires Node >=16

### Installing

Please follow these steps to get a development env running.

```shell
git clone git@gitlab.tech.orange:mahali/front/webapp-vue3.git
cd webapp-vue3
npm install
```

### Run a local version for development purpose

Start a local version connected to **dev backend** of Mahali webapp using the following command:

```shell
npm run dev
```

Start a local version connected to **a local backend** of Mahali webapp using the following command:

```shell
npm run localhost
```

In both cases, the local version of Mahali webapp will be available on <http://localhost:8080>

### Linting and formatting

We use [ESLint](https://eslint.org/) for **both linting and formatting**.
You can run `npm run lint --fix` to let ESLint formats and lints the code.

We recommend using VS Code along with the ESLint extension.
With the following settings in VS Code's `settings.json`, you can have auto fix and formatting when you save the code you are editing :

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true
  }
}
```

Since ESLint is already configured to format the code, there is no need to duplicate the functionality with Prettier.

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages, which allows the changelog to be auto-generated based on the commits. Please read the guide through if you aren't familiar with it already.

Only `fix:` and `feat:` will be presented in the changelog.

Note that `fix:` and `feat:` are for **actual code changes** (that might affect logic).
For typo or document changes, use `docs:` or `chore:` instead:

- ~~`fix: typo`~~ -> `docs: fix typo`

## Built With

Tools thatare used to build your application.

> - [Vue 3](https://github.com/vuejs/core) - The progressive Javascript framework
> - [Vite 2](https://github.com/vitejs/vite) - Next Generation Frontend Tooling
> - [Vitest](https://github.com/vitest-dev/vitest) - A blazing fast unit-test framework powered by Vite

## Authors

- **[Samuel Collin](https://gitlab.tech.orange/samuel.collin)**

  - Webapp developer

- **[Nicolas Bossard](https://gitlab.tech.orange/nicolas.bossard)**
  - Webapp developer

## License

This project is licensed - see the [LICENSE](LICENSE) file for details.
