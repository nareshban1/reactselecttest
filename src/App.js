import './App.css';
import Select from 'react-select'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './useDebounce';
function App() {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const debouncedSearchTerm = useDebounce(inputValue, 1000);
  const [loading, setLoading] = useState(false);


  // handle input change event
  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  useEffect(() => {
    const fetchData = (input) => {
      console.log("API CALL")
      setCount(count + 1)
      return axios.get(`https://api.aniapi.com/v1/anime?title=${input}`)
        .then(function (response) {
          // handle success
          setItems(response?.data?.data?.documents)
          setLoading(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }

    if (debouncedSearchTerm !== '') {
      setLoading(true)
      fetchData(debouncedSearchTerm)
    }

  }, [debouncedSearchTerm])

  return (
    <div className="App">
      API CALL COUNT = {count}
      <Select
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={option => option.titles.en}
        getOptionValue={option => option.id}
        options={items}
        isLoading={loading}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />


    </div>
  );
}

export default App;
