function Card({ emogi, head, content }) {
  return (
    <div className="pt-10 h-full">
      <div className="shadow-2xl bg-stone-100 p-10 space-y-8 h-full flex flex-col">
        <div className="text-5xl">{emogi}</div>
        <div className="font-bold">{head}</div>

      
        <div className="text-stone-600 text-sm flex-grow">{content}</div>
      </div>
    </div>
  );
}
export default Card;
