import './CardGrid.css';

export default function CardGrid({ title, items }) {
  return (
    <section className="fade-in">
      <h1>{title}</h1>
      <div className="grid">
        {items.map(({ id, img, caption }) => (
          <div key={id} className="card">
            <img src={img} alt={caption} />
            <p>{caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
