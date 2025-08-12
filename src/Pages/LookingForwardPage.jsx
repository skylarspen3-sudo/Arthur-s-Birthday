import data from '../data.json';

export default function LookingForwardPage() {
  return (
    <section className="fade-in">
      <h1>Looking Forward</h1>
      {data.lookingForward.map((txt,i)=><p key={i}>{txt}</p>)}
    </section>
  );
}
