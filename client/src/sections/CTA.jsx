export default function CTA() {
  return (
    <section className="py-12">
      <div className="border my-4 mx-8 grid grid-cols-2">
        <div className="p-8 flex flex-col gap-4">
          <h2>Join Our Book Lovers Community</h2>
          <p>
            Create an account today to save your favorite books and engage in
            lively discussions.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-neutral">Sign Up</button>
            <button className="btn">Learn More</button>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1512508561942-18fbe6d5d0cf?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
