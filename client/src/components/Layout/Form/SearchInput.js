import React, { useState, useEffect } from "react";
import { useSearch } from "../../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css";
import { IoMdMic } from "react-icons/io";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(values.keyword || "");

  useEffect(() => {
    setValues({ ...values, keyword: searchTerm });
  }, [searchTerm]);

  const startDictation = () => {
    if (window.hasOwnProperty("webkitSpeechRecognition")) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-GB"; 
      recognition.start();

      recognition.onresult = (e) => {
        setSearchTerm(e.results[0][0].transcript);
        recognition.stop();
      };

      recognition.onerror = (e) => {
        recognition.stop();
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <div className="input-group">
          <input
            
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text mic-icon" onClick={startDictation}>
            <IoMdMic />
          </span>
        </div>
        <button className="btn btn-outline-success ms-2" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
