export default function Team() {
  return (
    <section className="py-12 flex flex-col justify-center items-center gap-4 text-center">
      <h4>Passion</h4>
      <h3>Our Team</h3>
      <p>Meet the dedicated individuals behind our bookstore.</p>
      <div className="grid grid-cols-3 gap-8 py-8">
        <article className="flex flex-col items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-16 h-16 object-cover rounded-full"
          />
          <h4>Huy (Benjamin) Pham</h4>
          <h5>Full-Stack Software Developer</h5>
          <p>Ben has a deep love for literature and community engagement</p>
        </article>
        <article className="flex flex-col items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=3647&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-16 h-16 object-cover rounded-full"
          />
          <h4>Hiep (Roger) Nguyen</h4>
          <h5>Full-Stack Software Developer</h5>
          <p>
            Hiep is a talented developer, powering our site with AI
            implemenation
          </p>
        </article>
        <article className="flex flex-col items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1654110455429-cf322b40a906?q=80&w=3178&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-16 h-16 object-cover rounded-full"
          />
          <h4>Duc Hung Luong</h4>
          <h5>Full-Stack Software Developer</h5>
          <p>
            Duc curates our collection with an eye for quality and diversity
          </p>
        </article>
      </div>
    </section>
  );
}
