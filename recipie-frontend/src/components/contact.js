// Contact.js

import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-purple-400 font-sans">
      <div className="max-w-3xl w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-800 mb-4">
          Have questions or feedback? We'd love to hear from you! Reach out to us using the contact information below.
        </p>
        <div className="flex items-center space-x-4 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 00-8 8c0 3.15 1.83 5.98 4.67 7.34.36.18.76.18 1.11 0C8.17 15.98 10 13.15 10 10c0-2.21-.66-3.55-1.47-4.5-.3-.45-.87-.5-1.2-.5s-.9.05-1.2.5C3.66 6.45 3 7.79 3 10c0 3.31 2.69 6 6 6s6-2.69 6-6c0-2.21-.66-3.55-1.47-4.5-.3-.45-.87-.5-1.2-.5s-.9.05-1.2.5C12.66 6.45 12 7.79 12 10a1 1 0 01-2 0c0-2.21-.66-3.55-1.47-4.5-.3-.45-.87-.5-1.2-.5s-.9.05-1.2.5C5.66 6.45 5 7.79 5 10a8 8 0 008 8c2.21 0 3.55-.66 4.5-1.47.45-.3.5-.87.5-1.2s-.05-.9-.5-1.2C15.98 13.83 13.15 15 10 15c-2.21 0-3.55-.66-4.5-1.47-.45-.3-.5-.87-.5-1.2s.05-.9.5-1.2C6.45 10.34 7.79 10 10 10a1 1 0 010-2zm-2.92-2.92a1 1 0 011.41 0l1.07 1.07a1 1 0 01-1.41 1.41l-1.06-1.07a1 1 0 010-1.41z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800">Email: singhritesh02000@gmail.com</span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zM8 7a1 1 0 00-1 1v5a1 1 0 002 0V8a1 1 0 00-1-1zm5-1a1 1 0 011 1v1.586l-1.707-1.707a1 1 0 00-1.414 0L10 7.586l-1.879-1.88a1 1 0 00-1.414 0L6 8.586V7a1 1 0 011-1h6zm3 4a1 1 0 00-1-1h-2a1 1 0 100 2h2a1 1 0 001-1z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-800">Phone: +91 9696584099</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
