import data from '../data.json';
import CardGrid from '../components/CardGrid';

export default function LoveListPage() {
  return <CardGrid title="22 Things We Love About You" items={data.lovelist} />;
}
