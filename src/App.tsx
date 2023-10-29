import './App.css';
import React, { ChangeEvent, Component } from 'react';
import { Character } from './resources/Character.interface';
import CharacterCard from './components/CharacterCard';
import Search from './components/Search';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/Button';
import Error from './components/Error';

interface AppState {
  userInput: string;
  data: Character[];
  loading: boolean;
  error: string | null;
  dummyError: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      userInput: '',
      data: [],
      loading: false,
      error: null,
      dummyError: false,
    };
  }

  componentDidMount() {
    const savedInput = localStorage.getItem('userInput');
    if (savedInput) {
      this.setState({ userInput: savedInput });
    }
    this.fetchData();
  }

  handleButtonClick = () => {
    const { userInput } = this.state;
    this.setState({ error: null, data: [] });
    localStorage.setItem('userInput', userInput);
    this.fetchData();
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ userInput: event.target.value });
  };

  handleErrorThrow = () => {
    this.setState({ dummyError: true });
  };

  fetchData = () => {
    const { userInput } = this.state;
    this.setState({ loading: true });
    fetch(
      `https://rickandmortyapi.com/api/character/?page=1${
        userInput ? `&name=${userInput}` : ''
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.setState({ loading: false, error: data.error });
          return;
        }
        this.setState({ data: data.results, loading: false });
      })
      .catch((error) =>
        this.setState({ loading: false, error: error.message })
      );
  };

  render() {
    const { userInput, data, loading, error, dummyError } = this.state;
    return (
      <ErrorBoundary>
        <header className="header">
          <Search
            userInput={userInput}
            onButtonClick={this.handleButtonClick}
            onInputChange={this.handleInputChange}
          />
          <Button className="header__throw" onClick={this.handleErrorThrow}>
            Throw error
          </Button>
        </header>

        {loading && <Loading />}
        {error && <div>{error}</div>}
        {dummyError && <Error />}
        {data && (
          <section className="cards">
            {data.map((item) => (
              <CharacterCard key={item.id} character={item} />
            ))}
          </section>
        )}
      </ErrorBoundary>
    );
  }
}

export default App;
