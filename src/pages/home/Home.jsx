import React from 'react';
import './home.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';

function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </React.Fragment>
  )
}

export default Home