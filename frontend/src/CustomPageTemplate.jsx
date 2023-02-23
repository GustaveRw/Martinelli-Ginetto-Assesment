import Image from 'react-image';
import React from 'react';

const CustomPageTemplate = ({ data }) => {
  return (
    <div>
      {data.products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <Image
            src={product.image.url}
            alt={product.name}
            width="100%"
            height="auto"
            style={{ display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomPageTemplate;