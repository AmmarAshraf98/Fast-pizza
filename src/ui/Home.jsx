import { useSelector } from "react-redux";
import CreateUser from "../feature/user/CreateUser";
import Button from "./Button";

function Home() {
  const { userName } = useSelector((state) => state.user);

  return (
    <div className='my-10 text-center sm:my-16 p-4'>
      <h1 className='text-xl  font-semibold text-stone-700 mb-8 md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500 tracking-wide'>
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName ? (
        <Button to='/menu' type='primary'>
          continue ordering, {userName}
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
