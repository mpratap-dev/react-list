import React, { useEffect, useState } from 'react'

const LazyList = ({ children, data, height = 300 }) => {
  const [visibleList, setVisibleList] = useState(data);

  const handleScroll = (event) => {
    const element = event.target;
    const { top, bottom } = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const bottomLimit = windowHeight < bottom ? windowHeight : bottom;
    const topLimit = top > 0 && top < windowHeight ? top : 0; 
    const childrens = element.children;

    const visibleListItems = [...childrens].reduce((acc, curr) => {
      const { top, bottom } = curr.getBoundingClientRect();
      const isVisible = (top < bottomLimit && top > topLimit) || (bottom > topLimit && bottom < bottomLimit);
      isVisible && acc.push(curr.id);
      return acc;
    }, []);

    const minNumber = Math.min(...visibleListItems);
    const maxNumber = Math.max(...visibleListItems);

    const filteredVisibleList = data.filter(each => {
      return each >= minNumber - 2 && each <= maxNumber + 2;
    });

    setVisibleList(filteredVisibleList);
  }

  useEffect(() => {
    setVisibleList(data);
  }, [data]);

  return (
    <div onScroll={handleScroll} style={{ height, overflow: "auto" }}>
      {children({ data: visibleList })}
    </div>
  )
}

export default LazyList