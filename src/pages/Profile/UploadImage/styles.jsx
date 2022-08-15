import styled from 'styled-components';

export const FormContainer = styled.form`
  height: 150%;
  display: flex;
  align-items: center;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    height: 100%;

    label {
      height: 60%;
    }
    span {
      height: 80px !important;
      width: 80px !important;
      margin: 5px auto;
    }
  }

  & > label {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-content: center;
    justify-content: flex-end;
    align-items: center;

    & > span {
      height: 110px;
      width: 110px;
      background-color: #999999;
    }
  }
`;

export const UploadButton = styled.div`
  & > button {
    color: #fff;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 45px;
    cursor: pointer;
    background: ${(props) =>
      props.backgorundColor || props.theme.colors.headerBlue};
    &:hover {
      background: ${(props) =>
        props.backgorundColor || props.theme.colors.headerBlue};
    }
  }
  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    & > button {
      font-size: 0.5rem;
      padding: 0.5rem 0.5rem;
    }
  }
`;
