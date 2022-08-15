import styled from 'styled-components';

export const Container2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SectionContainer = styled.div`
  padding: 40px 100px 0px 50px;
  display: flex;
  justify-content: space-evenly;
  height: max-content;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 40px 0px;
  }
`;

export const ImgContainer = styled.div`
  width: 65%;
  height: 100%;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

export const VideoTitle = styled.div`
  margin: 10px 0px;
  padding: 20px 0px 0 60px;

  & > h1 {
    margin: 0px;
    color: #555555;
    font-size: 1.9rem;
    font-weight: lighter;
  }
  & > h2 {
    margin: 0px;
    color: #55555540;
    font-size: 1.4rem;
    font-weight: lighter;
  }
`;

export const VideoList = styled.div`
  width: 30%;
  height: 100%;
  margin: 0px 0px 0px 40px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 900px) {
    width: 95%;
    margin: 10% 0px;
    border-radius: 0px;
  }
`;

export const HeaderList = styled.div`
  background: rgb(81, 153, 187);
  background: linear-gradient(
    90deg,
    rgba(81, 153, 187, 1) 22%,
    rgba(83, 103, 180, 1) 100%
  );
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 900px) {
    border-radius: 0px;
    text-align: center;
  }
`;

export const Title = styled.div`
  padding: 25px 0 25px 25px;
  & > h1 {
    margin: 0;
    color: #ffff;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 900px) {
    padding: 10px 0px;
  }
`;

export const Text = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid #ffff;
  & h5 {
    margin: 0px 0px 0px 0px;
    padding: 5px 0px 5px 0px;
    color: #ffff;
  }
  & > div {
    width: 50%;
    text-align: center;
    transition: all 0.3s ease-in-out;
    color: #ffff;
    cursor: pointer;
  }

  & > div:hover {
    background-color: #ffff;
    color: #fdfdfd;
  }
`;

export const List = styled.div`
  height: 324px;
  overflow-y: scroll;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 2.5px;
    border-radius: 10px;

    &-track {
      background: #f8f8f8;
    }

    &-thumb {
      background: #5571b2;
      border-radius: 0.5rem;
    }
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 110px 0px 0px;
  & > h2 {
    color: ${(props) => props.theme.colors.titleBlue};
    margin: 0px 10px 0px 0px;
    font-size: 1.3rem;
  }
`;
