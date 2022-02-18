import Container from "../../components/Container.js";
import Header from "../../components/Header.js";
import Home from "../../components/Home.js";
import Profile from "../../components/Profile.js";
import { parseUser } from "../../utils/parseUser.js";

const EditProfile = ({ user }) => {
  return (
    <Container>
      <Header />
      {!user ? null : <Profile user={user} isEditMode={true} />}
    </Container>
  );
};

export const getServerSideProps = async ({ res, ...context }) => {
  const user = parseUser(context);

  if (!user) {
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    return { props: {} };
  }

  return { props: { user } };
};

export default EditProfile;
