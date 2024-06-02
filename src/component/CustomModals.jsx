import React, { useState } from 'react';
import { Button, Modal, Typography } from 'antd';
import ReactHtmlParser from 'react-html-parser';
const {Title} = Typography;

const CustomModals = ({ visible, onCancel, item }) => {

  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Modal
      title={item ? item.title : ""}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      {item && (
        <div>
          <img 
            src={item.images} 
            alt="modal"  
            style={{
              width: '100%', 
              objectFit: 'cover' }}/>
          <Title level={2}>{item.prices}</Title>
          {ReactHtmlParser(item.descriptions)}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button 
            type="primary" 
            onClick={() => handleButtonClick(item.url)}
              style={{background: 'linear-gradient(to right, #ff7e5f, #feb47b)'}}
              size="large"
              >Redirect to Daraz</Button>
           </div>
           </div>
      )}
    </Modal>
  );
};

export default CustomModals;