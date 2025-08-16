/* eslint-disable @next/next/no-img-element */
import React from 'react';

// A custom Image component that can be used in a static export.
// It doesn't provide optimization, but it's a direct replacement
// for the <img> tag with a similar API to next/image.
const StaticImage = (props: any) => {
  const { alt, src, width, height, className, style, layout, objectFit, ...rest } = props;

  if (layout === 'fill') {
    return (
      <img
        alt={alt}
        src={src}
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          boxSizing: 'border-box',
          padding: 0,
          border: 'none',
          margin: 'auto',
          display: 'block',
          width: 0,
          height: 0,
          minWidth: '100%',
          maxWidth: '100%',
          minHeight: '100%',
          maxHeight: '100%',
          objectFit: objectFit || 'cover',
          ...style,
        }}
        {...rest}
      />
    );
  }

  return (
    <img
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={className}
      style={style}
      {...rest}
    />
  );
};

export default StaticImage;
