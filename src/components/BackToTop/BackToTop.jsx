import React, { useEffect, useState } from 'react'
import "./BackToTop.scss"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    isVisible && (
      <button className="back-to-top shadow-sm ring-1 ring-inset ring-gray-300" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    )
  )
}
