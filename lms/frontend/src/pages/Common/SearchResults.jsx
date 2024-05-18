import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FiFilter } from "react-icons/fi"; // Import the filter icon

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { query } = useParams();
  const [totalResults, setTotalResults] = useState(0);
  const [showFilters, setShowFilters] = useState(false); // State to control visibility of filters
  const [filteredResults, setFilteredResults] = useState([]); // State to store filtered results
  const [filterOptions, setFilterOptions] = useState({
    price: "",
  }); // State to store filter options

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${encodeURIComponent(query)}`
        );
        setSearchResults(response.data.results);
        setTotalResults(response.data.results.length); // Set the total results count
        setFilteredResults(response.data.results); // Set initial filtered results
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleFilterClick = () => {
    setShowFilters(!showFilters); // Toggle the state to show/hide filters
  };

  const applyFilters = () => {
    let filteredData = [...searchResults];

    // Apply price filter
    if (filterOptions.price !== "") {
      filteredData = filteredData.filter(
        (course) => course.price <= parseInt(filterOptions.price)
      );
    }

    setFilteredResults(filteredData);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    // Update filter options
    setFilterOptions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    applyFilters(); // Apply filters whenever filterOptions changes
  }, [filterOptions]);

  return (
    <div>
      <Navbar />
      <h2 className="text-3xl p-8 font-semibold mb-4">
        {totalResults.toLocaleString()} results for "{query}"
      </h2>

      <div className="m-4">
        <button
          onClick={handleFilterClick}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-lg px-6 py-3 rounded-lg flex items-center"
        >
          <FiFilter className="mr-2" />
          Filters
        </button>
      </div>

      {/* Display filters when showFilters is true */}
      {showFilters && (
        <div className="bg-gray-100 p-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
          <div>
            <button
              onClick={() => setFilterOptions({ price: "100" })}
              className="p-2 border mr-2"
            >
              Under ₹100
            </button>
            <button
              onClick={() => setFilterOptions({ price: "300" })}
              className="p-2 border mr-2"
            >
              Under ₹300
            </button>
            <button
              onClick={() => setFilterOptions({ price: "500" })}
              className="p-2 border mr-2"
            >
              Under ₹500
            </button>
            <button
              onClick={() => setFilterOptions({ price: "1000" })}
              className="p-2 border mr-2"
            >
              Under ₹1000
            </button>
            <label className="block mt-4">
              Custom Price:
              <input
                type="number"
                name="price"
                value={filterOptions.price}
                onChange={handleFilterChange}
                className="border-gray-300 border rounded-md p-2 ml-2"
              />
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {filteredResults.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex"
          >
            <div>
              <img src={course.imageUrl} alt="" className="w-[200px] m-4 " />
            </div>

            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-700 mb-4">{course.description}</p>

              <div className="flex justify-between">
                <p className="text-gray-600">Duration: {course.duration}</p>
                <p className="text-gray-600 text-xl font-bold">
                  Price: ₹{course.price}
                </p>
              </div>
              <button className="border-2 p-2 bg-green-500 text-white font-bold">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
