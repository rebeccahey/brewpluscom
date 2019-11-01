import React from 'react';
import PropTypes from 'prop-types';

export default function HamburgerButton({
  isOpen,
  menuClicked,
  width,
  height,
  strokeWidth,
  animationDuration,
  rotate,
  color,
  borderRadius,
  zIndex,
  ...props
}) {
  const halfHeight = height / 2;
  const halfStrokeWidth = `-${strokeWidth / 2}px`;

  const getTransformValue = (open, defaultPos, rotateVal) =>
    `translate3d(0,${
      isOpen ? `${halfHeight}px` : `${defaultPos}px`
    },0) rotate(${open ? `${rotateVal}deg` : '0'})`;

  const styles = {
    container: {
      width: `${width}px`,
      height: `${height}px`,
      position: 'relative',
      transform: `rotate(${rotate}deg)`,
      outline: 0,
      zIndex
    },
    lineBase: {
      display: 'block',
      height: `${strokeWidth}px`,
      width: '100%',
      background: color,
      transitionTimingFunction: 'ease',
      transitionDuration: `${animationDuration}s`,
      borderRadius: `${borderRadius}px`,
      transformOrigin: 'center',
      position: 'absolute'
    },
    firstLine: {
      transform: getTransformValue(isOpen, 0, 45),
      marginTop: halfStrokeWidth
    },
    secondLine: {
      transitionTimingFunction: 'ease-out',
      transitionDuration: `${animationDuration / 4}s`,
      opacity: isOpen ? '0' : '1',
      top: `${halfHeight}px`,
      marginTop: halfStrokeWidth
    },
    thirdLine: {
      transform: getTransformValue(isOpen, height, -45),
      marginTop: halfStrokeWidth
    }
  };

  return (
    <div
      style={styles.container}
      onClick={menuClicked}
      onKeyPress={menuClicked}
      role="button"
      tabIndex="0"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <span style={{ ...styles.lineBase, ...styles.firstLine }} />
      <span style={{ ...styles.lineBase, ...styles.secondLine }} />
      <span style={{ ...styles.lineBase, ...styles.thirdLine }} />
    </div>
  );
}

HamburgerButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  menuClicked: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  strokeWidth: PropTypes.number,
  rotate: PropTypes.number,
  color: PropTypes.string,
  borderRadius: PropTypes.number,
  animationDuration: PropTypes.number,
  zIndex: PropTypes.number
};

HamburgerButton.defaultProps = {
  width: 36,
  height: 30,
  strokeWidth: 2,
  rotate: 0,
  color: '#000',
  borderRadius: 0,
  animationDuration: '0.4',
  zIndex: 1000
};
