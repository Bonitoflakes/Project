import "./index.css";
import Navbar from "./components/Navbar";
import styled from 'styled-components';

export default function App() {
  return (
    <>
    <Navbar />
      <Container>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eum, vero tenetur optio temporibus ducimus repellendus ad cumque ipsam est rem quo quos dolorum consectetur tempore nemo aut minima animi.Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio neque modi, adipisci iure repudiandae nobis ducimus, repellat reiciendis reprehenderit praesentium ab saepe consequuntur nihil nisi quibusdam earum architecto. Quas, eaque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eum, vero tenetur optio temporibus ducimus repellendus ad cumque ipsam est rem quo quos dolorum consectetur tempore nemo aut minima animi.Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio neque modi, adipisci iure repudiandae nobis ducimus, repellat reiciendis reprehenderit praesentium ab saepe consequuntur nihil nisi quibusdam earum architecto. Quas, eaque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci eum, vero tenetur optio temporibus ducimus repellendus ad cumque ipsam est rem quo quos dolorum consectetur tempore nemo aut minima animi.Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio neque modi, adipisci iure repudiandae nobis ducimus, repellat reiciendis reprehenderit praesentium ab saepe consequuntur nihil nisi quibusdam earum architecto. Quas, eaque.</p>
        </Container>
    </>
  );
}

const Container = styled.div`
width: 100vw;
max-width: 1400px;
margin:0 auto;
padding:0 5rem;
text-align: justify;
background:pink;
`;