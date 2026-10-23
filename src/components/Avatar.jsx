const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-sky-500 to-indigo-500",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-pink-500",
  "from-rose-500 to-purple-500",
];

export default function Avatar({ name = "?", online, size = "h-12 w-12", image }) {
  const color = gradients[name.length % gradients.length];

  return (
    <div className="relative shrink-0">
      <div className={`${size} flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${color} font-semibold text-white`}>
        {image ? <img src={image} alt="" className="h-full w-full object-cover" /> : name[0].toUpperCase()}
      </div>
      {online && <span className="avatar-status absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 bg-emerald-400" />}
    </div>
  );
}
