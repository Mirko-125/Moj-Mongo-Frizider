import React, { useState } from 'react';
import Select from 'react-select';

const SearchableSelect = ({ options, onSelect, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onSelect(selectedOption); 
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black' 
    }),
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      isSearchable={true}
      getOptionLabel={(option) => option.name} 
      getOptionValue={(option) => option._id}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default SearchableSelect;