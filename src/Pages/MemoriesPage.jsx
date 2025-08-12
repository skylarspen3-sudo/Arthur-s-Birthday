import data from '../data.json';
import JournalMemory from '../components/JournalMemories';

export default function MemoriesPage() {
  return (
    <div className="page-container">
      <h1>Arthur's Journal - Favorite Memories</h1>
      <div className="memories-container">
        {data.memories.map(memory => (
          <JournalMemory
            key={memory.id}
            image={memory.img}
            caption={memory.caption}
            date={memory.date}
          />
        ))}
      </div>
    </div>
  );
}
