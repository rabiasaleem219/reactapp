import styled from "styled-components";

export const Container = styled.div`
  /* background-color: #f8f8f8; */
  margin: 10px 0px;
  height: max-content;
`;

export const Content = styled.div`
  padding: 0 100px 50px 100px;
  margin-inline: 92px;
  display: flex;
  justify-content: space-between;

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-inline: 0px;
    padding: 10px 10px;
  }
  @media only screen and (min-width: 850px) and (max-width: 1200px) {
    padding: 0px 10px;
    margin: 0 10px;
  }
`;

export const TextContainer = styled.div`
  width: 30%;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    align-items: center;
  }
`;

export const Details = styled.div`
  display: flex;
  font-family: sans-serif;
  align-items: center;
  color: #444444;

  & > p {
    margin: 10px 10px 10px 0;
  }
`;

export const VerticalLine = styled.div`
  background-color: #7090be;
  width: 1px;
  height: 350px;
  margin-right: 10px;
  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    width: 95%;
    height: 1px;
  }
`;

export const LogosContainer = styled.div`
  width: 70%;
  & > h5 {
    text-align: center;
  }
  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`;

export const Logos = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  & > img {
    margin: 0;
    width: 200px;
    height: 80px;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;
