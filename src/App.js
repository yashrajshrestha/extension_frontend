// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import CustomModal from './component/CustomModals'; // Import your CustomModal component
const { Title } = Typography;

function App() {
  const [scrapedData, setScrapedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/showAll')
      .then(response => response.json())
      .then(data => setScrapedData(data))
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Extension Data</h1>
        <Row gutter={[16, 16]} justify="center">
          {scrapedData.map((item, index) => (
            <Col key={index}  >
              <Card  
                hoverable 
                style={{ width: 300 }} 
                cover={
                  <img 
                    alt="example" 
                    src={item.images} 
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                } 
                title={item.title} 
                bordered={false}
                onClick={() => handleCardClick(item)}
              > 
                <Title level={2}>{item.prices}</Title>
                <Button 
            type="primary" 
            onClick={() => handleButtonClick(item.url)}
              style={{background: 'linear-gradient(to right, #ff7e5f, #feb47b)'}}
              size="large"
              >Redirect to Daraz</Button>
              </Card> 
            </Col>
          ))}
        </Row>
        {/* Render your CustomModal component */}
        <CustomModal
          visible={showModal}
          onCancel={handleModalClose}
          item={modalContent}
        />
      </header>
    </div>
  );
}

export default App;
