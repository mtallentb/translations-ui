import './App.css';
import './styles/globals.css';
import { TranslationGrid, LocaleSelector, SearchInput } from './components';
import { MainTranslationProvider } from './providers';

function App() {
  return (
    <MainTranslationProvider loadData={true}>
      <div className="App">
        <header className="app-header">
          <h1>Translation Management UI</h1>
          <p>Manage translations across multiple locales</p>
        </header>
        <main className="app-main">
          <div className="app-content">
            <LocaleSelector />
            <SearchInput />
            <TranslationGrid />
          </div>
        </main>
      </div>
    </MainTranslationProvider>
  );
}

export default App;
