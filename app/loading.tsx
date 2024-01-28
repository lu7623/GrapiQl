import Loader from "./components/loader";

export default function Loading() {
  return (
    <div className="w-full grid justify-center min-h-screen">
      <Loader size={150} />
    </div>
  );
}
