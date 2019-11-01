import styled from '@emotion/styled';

import {
  space,
  width,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  flex,
  alignSelf,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
  textAlign,
  order,
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  size,
  zIndex
} from 'styled-system';

export const Box = styled.div`
  box-sizing: border-box;
  ${display}
  ${space};
  ${color};
  ${width};
  ${maxWidth};
  ${height}
  ${fontSize};
  ${textAlign};
  ${flex};
  ${order};
  ${alignSelf};
  ${zIndex};
`;

Box.displayName = 'Box';

Box.propTypes = {
  ...display.propTypes,
  ...space.propTypes,
  ...color.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...fontSize.propTypes,
  ...flex.propTypes,
  ...zIndex.propTypes,
  ...textAlign.propTypes,
  ...maxWidth.propTypes
};

export const Flex = styled(Box)`
  display: flex;
  ${flexWrap};
  ${flexDirection};
  ${alignItems};
  ${justifyContent};
`;

Flex.displayName = 'Flex';

Flex.propTypes = {
  ...flexWrap.propTypes,
  ...flexDirection.propTypes,
  ...alignItems.propTypes,
  ...justifyContent.propTypes
};

export const Text = styled.div`
  ${space};
  ${fontSize};
  ${fontWeight};
  ${lineHeight};
  ${color};
  ${textAlign};
`;

Text.displayName = 'Text';

Text.propTypes = {
  ...space.propTypes,
  ...fontSize.propTypes,
  ...fontWeight.propTypes,
  ...lineHeight.propTypes,
  ...color.propTypes,
  ...textAlign.propTypes
};

export const Container = styled(Box)`
  ${display};
  ${maxWidth};
  ${minWidth};
  ${height};
  ${maxHeight};
  ${minHeight};
  ${size};
  ${space};
`;

Container.propTypes = {
  ...display.propTypes,
  ...maxWidth.propTypes,
  ...minWidth.propTypes,
  ...height.propTypes,
  ...maxHeight.propTypes,
  ...minHeight.propTypes,
  ...size.propTypes,
  ...space.propTypes
};

Container.defaultProps = {
  mx: 'auto',
  maxWidth: '1150px'
};

export const FlexContainer = styled(Flex)`
  ${display};
  ${maxWidth};
  ${minWidth};
  ${height};
  ${maxHeight};
  ${minHeight};
  ${size};
  ${space};
`;

FlexContainer.propTypes = Container.propTypes;
FlexContainer.defaultProps = Container.defaultProps;
