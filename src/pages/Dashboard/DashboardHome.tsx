import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/features/auth/authSlice';

const DashboardHome = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className="m-20 text-black dark:text-white ">
      <h2 className="text-3xl text-center mb-10">
        <span>Hi, </span> {user?.name}
      </h2>
      <h2 className="text-lg my-3">Welcome to RideRevolt!</h2>
      <p className="text-lg text-justify mb-12">
        We are delighted to have you. At RideRevolt, we strive to create a
        seamless and enjoyable experience for every biking enthusiast. Our
        platform offers a smooth and convenient way to find your ideal bike,
        whether you're a city commuter, an adventure seeker, or a speed lover.
        Explore our extensive collection of premium bikes, take advantage of
        exclusive deals, and experience a new standard of biking with
        RideRevolt. Whether you're looking for a sleek urban bike or a rugged
        off-road model, RideRevolt is here to make your journey efficient and
        enjoyable. Thank you for choosing RideRevolt, where your perfect biking
        experience begins.
      </p>
      <h5 className="text-lg mt-3">Warm regards,</h5>
      <h5 className="text-lg">The RideRevolt Team</h5>
    </div>
  );
};
export default DashboardHome;
