import React, { useEffect, useState, useRef } from 'react'

const LazyList = ({ children, data, height = 300 }) => {
  const [visibleList, setVisibleList] = useState(data);
  const container = useRef(null);

  const callback = (event) => {
    const { target, rootBounds, boundingClientRect, isIntersecting } = event[0];
    const IS_VISIBLE = isIntersecting;
    const IS_TOP_ELEMENT = boundingClientRect.top <= rootBounds.top;
    const key = target.id;
    const addNegativeItems = IS_VISIBLE && IS_TOP_ELEMENT;
    const addPositiveItems = IS_VISIBLE && !IS_TOP_ELEMENT;
    console.log(IS_VISIBLE, IS_TOP_ELEMENT, key);

    data.filter((each) => {
      return each
    });
  }

  useEffect(() => {
    const element = container.current;
    if(element) {
      let options = {
        root: element,
        rootMargin: '0px',
        threshold: 0.1
      }
      
      let observer = new IntersectionObserver(callback, options);
      const childrens = element.children;
  
      [...childrens].forEach((each) => {
        observer.observe(each);
      });
    }
  }, []);

  return (
    <div 
      ref={container}
      style={{ height, overflow: "auto" }}
    >
      {children({ data: visibleList })}
    </div>
  )
}

export default LazyList