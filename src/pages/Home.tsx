import Navbar from "../components/shared/navbar";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="h-full flex items-center justify-center">
        <h1 className="text-6xl">Home</h1>
      </div>
    </div>
  );
};

export default Home;
