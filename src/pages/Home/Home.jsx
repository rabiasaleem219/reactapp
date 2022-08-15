import { Footer } from "../../components/common/Footer";
import { HomeSection1 } from "./HomeSection1";
import { HomeSection2 } from "./HomeSection2";
import { HomeSection3 } from "./HomeSection3";
import { HomeSection4 } from "./HomeSection4";
import { HomeSection5 } from "./HomeSection5";
import { HomeContainer } from "./styles";

const Home = () => {
  return (
    <HomeContainer>
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
