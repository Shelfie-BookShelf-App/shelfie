import { imageCollection } from "../constants";

export default function Hero() {
  return (
    <section className="hero py-12 flex flex-col justify-center items-center gap-4">
      <h1>Welcome To Shelfie - Your Ultimate Book Heaven!</h1>
      <p>
        Dive into a world of literature where every page turns into an
        adventure. Explore our curated selection and find your next favorite
        read today!
      </p>
      {/* <div className="flex gap-4">
        <button className="btn btn-neutral">Login</button>
        <button className="btn">Explore</button>
      </div> */}
      <div className="grid grid-cols-3 grid-rows-3 my-12 gap-4">
        <figure>
          <img
            src={imageCollection[0]}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure>
          <img
            src={imageCollection[1]}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="row-span-2">
          <img
            src={imageCollection[2]}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="col-span-2">
          <img
            src={imageCollection[3]}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure>
          <img
            src={imageCollection[4]}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="col-span-2">
          <img
            src={imageCollection[5]}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
