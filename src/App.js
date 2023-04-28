import {useState, useRef, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContexts';
import { SearchContext } from './contexts/SearchContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import { createResource as fetchData } from './helper';
import Spinner from './components/Spinner';


import './App.css';
import Spinner from './components/Spinner';

function App() {
  let [search, setSearch] = useState('');
  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('')

  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      if (!search) return
      document.title = `${search} Music`;
      const response = await fetch(`https://itunes.apple.com/search?term=${search}`);
      const resData = await response.json();
      if (resData.results.length){
        setData(resData.results)
      }else{
        setData([]);
        setMessage("Nothing found for that artist")
      }
      console.log(resData)
    }
    fetchData();
  }
  useEffect(() => {
    if (searchTerm) {
        setData(fetchData(searchTerm))
    }
}, [searchTerm])



  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
            <SearchContext.Provider value={
        {
          term: searchInput, 
          handleSearch: setSearch
        }
      }> 
      <SearchBar />
      </SearchContext.Provider>

      <DataContext.Provider value={ {data, setSearch}}>
      
      {message}
  
      <Suspense fallback = {<Spinner/>}>
        <Gallery />
        </Suspense>
      
        
      </DataContext.Provider>
            </>

          }/>
          <Route path='/album/:id' element={ <AlbumView/> } />
          <Route path='/artist/:id' element={ <ArtistView /> }/>
        </Routes>

      </Router>
      
      
      <AlbumView/>
      <ArtistView/>
    </div>
  );
}

export default App;
