import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-xl text-primary-200 ">Loading Cabins Data...</p>
    </div>
  );
}

export default Loading;
