import Container from "../components/Container.js";
import Header from "../components/Header.js";
import Home from "../components/Home.js";
import Profile from "../components/Profile.js";
import { parseUser } from "../utils/parseUser.js";

const Index = ({ user }) => {
  return (
    <Container>
      <Header />
      {!user ? <Home /> : <Profile user={user} isEditMode={false} />}
    </Container>
  );
};

export const getServerSideProps = async (context) => {
  const user = parseUser(context);

  return { props: { user } };
};

export default Index;
