// src/component/CategoryDropdown.js
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Select
      placeholder="Select Category"
      style={{ width: 200 }}
      value={selectedCategory || undefined}
      onChange={onCategoryChange}
      allowClear
    >
      {categories.map((category, index) => (
        <Option key={index} value={category}>{category}</Option>
      ))}
    </Select>
  );
};

export default CategoryDropdown;
