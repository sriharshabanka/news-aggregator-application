import React, { useState, useEffect } from 'react';
import './App.css';
import NewsList from './components/NewsList';
import CategoryFilter from './components/CategoryFilter';
import axios from 'axios';

const API_KEY = 'YOUR_NEWS_API_KEY';  // Replace with your actual News API key

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(true);

  // Fetch news data based on selected category
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [category]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>News Aggregator</h1>
        <p>Browse the latest news from different categories</p>
      </header>
      <CategoryFilter setCategory={setCategory} />
      {loading ? (
        <p className="loading">Loading news...</p>
      ) : (
        <NewsList articles={articles} />
      )}
    </div>
  );
}

export default App;
