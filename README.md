# Conduit Playwright Tests

Automated test suite for [Conduit RealWorld App](https://demo.realworld.show) built with Playwright and TypeScript.

##  Tech Stack

- [Playwright](https://playwright.dev/) – test automation framework
- [TypeScript](https://www.typescriptlang.org/) – typed JavaScript
- [Faker.js](https://fakerjs.dev/) – dynamic test data generation
- [dotenv](https://www.npmjs.com/package/dotenv) – environment variables

## 📁 Project Structure

\```
📁 tests/
    📁 ui/
        📁 auth/
            registration.spec.ts    – registration tests
            login.spec.ts           – login tests
        📁 articles/
            article.spec.ts         – article CRUD tests
        📁 settings/
            settings.spec.ts        – user settings tests
📁 pages/
    📁 components/
        MenuBarComponent.ts
    SignUpPage.ts
    SignInPage.ts
    NewArticlePage.ts
    SettingsPage.ts
    ProfilePage.ts
📁 fixtures/
    userFixture.ts
📁 test-data/
    users.ts
    invalidRegistrationUsers.ts
    invalidLoginUser.ts
    articles.ts
    invalidArticles.ts
    settings.ts
📁 types/
    user.ts
    article.ts
    usersettings.ts
📄 playwright.config.ts
📄 .env.example
\```

## ⚙️ Setup

### 1. Clone the repository

\```bash
git clone https://github.com/veronikakurhajcova/conduit-playwright-ts.git
cd conduit-playwright-ts
\```

### 2. Install dependencies

\```bash
npm install
npx playwright install
\```

### 3. Configure environment variables

\```bash
cp .env.example .env
\```

`.env.example`:
\```
BASE_URL=https://demo.realworld.show
API_URL=https://api.realworld.show/api
\```

##  Running Tests

\```bash
# Run all tests
npx playwright test

# Run specific suite
npx playwright test tests/ui/auth/
npx playwright test tests/ui/articles/
npx playwright test tests/ui/settings/

# Run with UI (headed)
npx playwright test --headed

# Open HTML report
npx playwright show-report
\```

##  Test Coverage

| Suite | Tests | Type |
|-------|-------|------|
| Registration | 6 | HP + NEG + known bugs |
| Login | 5 | HP + NEG + fixture |
| Articles | 7 | CRUD + NEG |
| Settings | 5 | HP + API verification |
| **Total** | **23** | |

##  Architecture Highlights

- **Page Object Model** — all UI interactions encapsulated in page classes
- **Custom Fixtures** — `user` and `createdArticle` fixtures for test isolation
- **API Prerequisites** — users and articles created via API before UI tests
- **Data-driven Testing** — negative scenarios via `for...of` loops
- **Known Bug Handling** — `test.fail()` pattern for documented bugs
- **Dynamic Test Data** — Faker.js generates unique data per test run
- **TypeScript Interfaces** — strict typing with inheritance (`InvalidUser extends User`)

## Author

[Veronika Kurhajcová](https://github.com/veronikakurhajcova)