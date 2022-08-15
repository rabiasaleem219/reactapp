
import styled from 'styled-components';

export const ContactFormContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 35%;
  overflow: hidden;
  height: max-content;
  border-radius: 45px;
  padding: 1rem 2rem;
  box-shadow: 0px 13px 99px rgba(4, 12, 105, 0.04);
  margin: 3rem auto;

  @media only screen and (${(props) => props.theme.breakpoints.tablet}) {
    width: 50%;
  }

  @media only screen and (${(props) => props.theme.breakpoints.mobile}) {
    width: 85%;
    padding: 1rem 30px;
  }
`;

export const ContactFormTitle = styled.div`
  & h1 {
    color: ${(props) => props.theme.colors.headerBlue};
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
`;

export const ContactFormInput = styled.div`
  padding: 1rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LabelText = styled.p`
  color: ${(props) => props.theme.colors.lightGray};
  font-size: 1rem;
  margin: 0 0 0 1rem;
`;

export const InputTextField = styled.input`
  width: fill-available;
  width: -webkit-fill-available;
  border: none;
  background-color: ${(props) => props.theme.colors.lightGrayBackground};
  border-radius: 35px;
  margin: 0.5rem 0;
  padding: 1rem;

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.red};
  font-size: 0.8rem;
  margin: 0 0 0.8rem 1rem;
`;

export const InputTextAreaField = styled.textarea`
  width: fill-available;
  width: -webkit-fill-available;
  border: none;
  font-family: 'helvetica';
  background-color: ${(props) => props.theme.colors.lightGrayBackground};
  border-radius: 35px;
  margin: 0.5rem 0;
  padding: 1rem;
  height: 4rem;

  &:focus {
    outline: none;
  }
`;
