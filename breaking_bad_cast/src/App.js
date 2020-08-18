import React ,{useState,useEffect} from 'react';
import Header from './components/ui/Header';

import CharacterGrid from './components/characters/CharacterGrid';
import Search from './components/ui/Search';

import axios from 'axios';
import './App.css';

const App = () =>  {
  const [items,setItems] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const [query,setQuery] = useState('')
  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(`https://superheroapi.com/api/2760477794278185/search/${query}`)

     console.log(result.data.results);
     setItems(result.data.results);
     setIsLoading(false);
     }
     fetchItems();

  },[query]);

  return (
    <div className="container">
    <Header />
    <Search getQuery={(q) =>setQuery(q)}/>
    <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
}

export default App;
