"use client";

import { useEffect } from 'react';
import tocbot from 'tocbot';

const TopicsCard = () => {

  useEffect(() => {
    tocbot.init({
      tocSelector: '.toc',
      contentSelector: 'article',
      headingSelector: 'h2, h3, h4',
    })

    return () => tocbot.destroy()
  }, [])

  return (
      <nav className="toc" />
  )
}

export default TopicsCard