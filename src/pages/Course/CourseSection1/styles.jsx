import styled from 'styled-components';

export const SectionContainer = styled.div`
  padding-top: 85px;
  padding-bottom: 100px;
  width: 100%;
  height: max-content;
  margin-bottom: -85px;
  background: rgb(88, 102, 173);
  background: -moz-linear-gradient(
    90deg,
    rgba(88, 102, 173, 1) 0%,
    rgba(83, 137, 184, 1) 55%,
    rgba(55, 176, 207, 1) 100%
  );
  background: -webkit-linear-gradient(
    90deg,
    rgba(88, 102, 173, 1) 0%,
    rgba(83, 137, 184, 1) 55%,
    rgba(55, 176, 207, 1) 100%
  );
  background: linear-gradient(
    90deg,
    rgba(88, 102, 173, 1) 0%,
    rgba(83, 137, 184, 1) 55%,
    rgba(55, 176, 207, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#5866ad",endColorstr="#37b0cf",GradientType=1);
`;
export const TextContainer = styled.div`
  padding: 10% 0% 10% 12%;
  color: white;

  & h1 {
    font-family: 'PlantagenetCherokee';
    font-size: 5rem;
    margin: 0;
    line-height: 1em;
    font-weight: 300;
  }
  @media only screen and (min-width: 571px) and (max-width: 1000px) {
    & h1 {
      font-size: 4rem;
    }
  }

  @media only screen and (${(props) => props.theme.breakpoints.s}) {
    & h1 {
      font-size: 2.8rem;
    }
  }
`;
