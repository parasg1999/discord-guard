import Home from "../components/Home.js";
import Profile from "../components/Profile.js";
import { parseUser } from "../utils/parse-user.js";

const Index = ({ user }) => {
  if (!user) {
    return <Home />;
  }

  return <Profile user={user} />;
};

export const getServerSideProps = async (context) => {
  const user = parseUser(context);

  return { props: { user } };
};

export default Index;
