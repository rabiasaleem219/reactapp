import {
  HeroContainer,
  HeroForm,
  HeroImage,
  HeroSeparator,
  HeroText,
  HeroTextContainer,
  HeroTitle,
  HomeHeroContainer,
} from './styles';
import heroImage from '../../../assets/images/hero-image.png';
import SearchIcon from '@mui/icons-material/Search';

export const HomeSection1 = () => {
  const getWindowWidth = () => {
    return window.innerWidth;
  };

  return (
    <HomeHeroContainer>
      <HeroContainer>
        <HeroTextContainer>
          <HeroSeparator></HeroSeparator>
          <HeroTitle>
            <h1>Nunc maximus ut dapibus efficitur</h1>
          </HeroTitle>
          <HeroText>
            <p>
              Pellentesque a cursus ante. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </HeroText>
          <HeroForm>
            <div>Ingresa Gratis</div>
            <input type="text" placeholder="Buscar Curso"></input>
            <button
              type="submit"
              onClick={() => {
                console.log('Click');
              }}
            >
              <SearchIcon
                sx={{
                  color: '#fff',
                }}
                fontSize={getWindowWidth() > 600 ? 'large' : 'medium'}
              />
            </button>
          </HeroForm>
        </HeroTextContainer>
        <HeroImage>
          <img src={heroImage} alt="cenaoz" />
        </HeroImage>
      </HeroContainer>
    </HomeHeroContainer>
  );
};
