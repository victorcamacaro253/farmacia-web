export default function BrandCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-24 h-24 rounded-full bg-white p-2 shadow-sm flex items-center justify-center overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors">
        <img
          src={logo}
          alt={name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <p className="mt-2 text-xs text-gray-600 font-medium text-center max-w-[96px] truncate group-hover:text-blue-600 transition-colors">
        {name}
      </p>
    </div>
  );
}