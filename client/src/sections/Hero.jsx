export default function Hero() {
  return (
    <section className="py-12 flex flex-col justify-center items-center gap-4">
      <h1>Welcome To Shelfie - Your Ultimate Book Heaven!</h1>
      <p>
        Dive into a world of literature where every page turns into an
        adventure. Explore our curated selection and find your next favorite
        read today!
      </p>
      <div className="flex gap-4">
        <button className="btn btn-neutral">Login</button>
        <button className="btn">Explore</button>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 my-12 gap-4">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1529158062015-cad636e205a0?q=80&w=3453&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1630948197497-3c0de9d73ad2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="row-span-2">
          <img
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="col-span-2">
          <img
            src="https://images.unsplash.com/photo-1512508561942-18fbe6d5d0cf?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure>
          <img
            src="https://plus.unsplash.com/premium_photo-1681980018727-b2b984b3faa7?q=80&w=3459&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
        <figure className="col-span-2">
          <img
            src="https://images.unsplash.com/photo-1462903876006-77f6beb241b4?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
