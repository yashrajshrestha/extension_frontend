import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ReactHtmlParser from 'react-html-parser';

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
          <p>{item.prices}</p>
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