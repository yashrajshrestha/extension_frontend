import './App.css';
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button, Pagination, Input } from 'antd';
import CustomModal from './component/CustomModals';
import CategoryDropdown from './component/CategoryDropdown';

const { Title } = Typography;
const { Search } = Input;

function App() {
  const [scrapedData, setScrapedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 9; // 3x3 grid, so 9 items per page
  const extension_api = process.env.REACT_APP_EXTENSION_API;

  useEffect(() => {
    fetch(`http://${extension_api}/showAll`)
      .then(response => response.json())
      .then(data => {
        setScrapedData(data);
        setFilteredData(data);
        const uniqueCategories = [...new Set(data.map(item => item.category).filter(category => category !== undefined))];
        setCategories(uniqueCategories);
        setTotalPages(Math.ceil(data.length / pageSize));
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleCardClick = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = scrapedData.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()) &&
      (selectedCategory === '' || item.category === selectedCategory)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    let filtered;
    
    if (!value) {
      // If the dropdown selection is cleared, show all data
      filtered = scrapedData;
    } else {
      // Filter data based on the selected category
      filtered = scrapedData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.category === value
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  return (
    <div className="App">
      <div className="content-container">
        <Title level={2} style={{ textAlign: 'center', marginBottom: '10px', color: '#d46b08' }}>Daraz Web Scraper</Title>
        
        <div className="search-container">
          <Search
            placeholder="Search products"
            onSearch={handleSearch}
            style={{ width: 400 }}
            allowClear
          />
          <CategoryDropdown
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        <Row gutter={[16, 16]} justify="center">
          {filteredData
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item, index) => (
              <Col key={index}>
                <Card
                  hoverable
                  style={{ height: '100%', maxWidth: '350px'}}
                  cover={
                    <img
                      alt="example"
                      src={item.images}
                      style={{ height: '400px', objectFit: 'cover' }} // Adjust height as needed
                    />
                  }
                  title={item.title}
                  bordered={false}
                  onClick={() => handleCardClick(item)}
                >
                  <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <Title level={4}>{item.prices}</Title>
                    <Button
                      type="primary"
                      onClick={() => handleButtonClick(item.url)}
                      style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)' }}
                    >
                      Redirect to Daraz
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </div>

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={handleChangePage}
        style={{ margin: '20px', textAlign: 'center' }}
      />

      <CustomModal
        visible={showModal}
        onCancel={handleModalClose}
        item={modalContent}
      />
    </div>
  );
}

export default App;
