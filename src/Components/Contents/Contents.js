import React from "react";
import styled from "styled-components";
import ElementWidth from "../../Hooks/ElementSizeHooks";
import Header from "./Header";
import Card from "./Card";
import Footer from "./Footer";

const Box = styled.div`
  /*  */
  width: ${(props) => props.width - 10}px;
  min-height: 1000px;
  margin-left: 10px;
  transform: ${(props) => props.state === true && "translateX(280px)"};
  transition-property: transform;
  transition-duration: 0.6s;
`;

const ContentBox = styled.div`
  display: flex;
  width: 100%;
  height: ${(props) =>
    props.row && props.cardheight && props.row * props.cardheight}px;
  background-color: ${(props) => props.theme.ContentBoxBackground};
`;

const Content = ({ state, setState, sortResult, data }) => {
  const Width = ElementWidth();
  let CardCount; // 2115부터 6개  1695 부터 5개 1275 부터 4개 980부터 태블릿
  //855 부터 3개 // 435부터 2개

  let ContentRow;
  let CardWidth;
  let CardHeight;

  if (Width !== undefined) {
    if (Width >= 2132) {
      CardCount = 6;
    } else if (Width >= 1712) {
      CardCount = 5;
    } else if (Width >= 1292) {
      CardCount = 4;
    } else if (Width >= 872) {
      CardCount = 3;
    } else if (Width > 452) {
      CardCount = 2;
    } else {
      CardCount = 1;
    }

    CardWidth = (Width - 10) / CardCount;
    CardHeight = CardWidth * 0.75;

    if (data.length % CardCount === 0) {
      ContentRow = data.length / CardCount;
    } else {
      ContentRow = data.length / CardCount + 1;
    }
  }

  return (
    <Box
      state={state}
      width={Width}
      onMouseEnter={() => {
        setState(false);
      }}
    >
      <Header />
      <ContentBox row={parseInt(ContentRow)} cardheight={CardHeight}>
        {Width !== undefined &&
          data.map((data, index) => {
            const sortIndex = sortResult.findIndex((x) => x.id === data.id);
            return (
              <Card
                key={index}
                width={CardWidth}
                height={CardHeight}
                cardCount={CardCount}
                sortIndex={sortIndex}
                data={data}
              />
            );
          })}
      </ContentBox>
      <Footer />
    </Box>
  );
};

export default Content;
