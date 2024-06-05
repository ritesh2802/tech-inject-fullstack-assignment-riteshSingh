// About.js

import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-purple-400 font-sans">
      <div className="max-w-3xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About PhotoMania</h1>
        <p className="text-lg text-gray-800 mb-4">
          PhotoMania is a platform for photographers and photo enthusiasts to discover, share, and connect with each other.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Whether you're a professional photographer showcasing your portfolio, an amateur photographer looking for inspiration, or simply someone who loves beautiful images, PhotoMania has something for everyone.
        </p>
        <p className="text-lg text-gray-800 mb-4">
          Join our vibrant community today and explore the world through the lens of talented photographers from around the globe!
        </p>
      </div>
    </div>
  );
};

export default About;
