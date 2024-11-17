import { team } from "../constants";

export default function Team() {
  return (
    <section className="team py-12 flex flex-col justify-center items-center gap-4 text-center">
      <h4>Passion</h4>
      <h3>Our Team</h3>
      <p>Meet the dedicated individuals behind our bookstore.</p>
      <div className="grid grid-cols-3 gap-8 py-8">
        {team.map((member, index) => {
          const { name, role, description, avatar_img } = member;
          return (
            <article key={index} className="flex flex-col items-center gap-2">
              <img
                src={avatar_img}
                alt=""
                className="w-16 h-16 object-cover rounded-full"
              />
              <h4>{name}</h4>
              <h5>{role}</h5>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
