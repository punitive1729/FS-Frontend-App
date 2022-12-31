import Container from './container.component';
import Success from './success.component';
import './home.styles.scss';
const Home = () => {
  return (
    <div className='home'>
      <Success />
      <Container />
    </div>
  );
};

export default Home;
