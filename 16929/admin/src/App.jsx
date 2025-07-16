// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddItems from './components/AddItems/AddItems';
import Orders from './components/Orders/Orders';
import ListItems from './components/ListItems/ListItems';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddItems />} />
      <Route path="/list" element={<ListItems />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>

  );
}
export default App;