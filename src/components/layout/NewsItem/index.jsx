import React from 'react';
import { Button } from '../../common/Buttons/MainButton';
import {
  NewsContainer,
  NewsContent,
  NewsProfileImage,
  NewsSubtitle,
  NewsText,
  NewsTitle,
} from './styles';
import newsImage from '../../../assets/images/news-image.png';

export const NewsItem = () => {
  const getWidth = () => {
    return window.innerWidth;
  };
  return (
    <NewsContainer>
      <NewsProfileImage>
        <img src={newsImage} alt="news" />
      </NewsProfileImage>
      <NewsContent>
        <NewsTitle>
          <h1>Donec elementum</h1>
        </NewsTitle>
        <NewsSubtitle>
          <h5>Pellentesque a cursus</h5>
        </NewsSubtitle>
        <NewsText>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque feugiat dictum dapibus. Donec vel fermentum quam. Sed
            pretium velit sit amet sollicitudin dapibus. Phasellus sodales nulla
            metus. Pellentesque in libero ﬁnibus, lobortis metus eget, congue
            ante. Fusce id ante quis nulla venenatis condimentum id nec diam.
            Praesent enim nunc, accumsan quis leo dignissim, molestie vehicula
            metus.
          </p>
        </NewsText>
        <Button
          text="Ver Mas"
          width="30%"
          alignSelf={getWidth() < 600 ? 'center' : ''}
          fontSize={getWidth() < 600 ? '1rem' : ''}
        />
      </NewsContent>
    </NewsContainer>
  );
};
