import Image from "next/image";
import DrumHead from "./DrumHead";

/** Shows a photo, or a quiet drum-pattern placeholder when no image has been added yet. */
export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-wood ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={src.startsWith("/uploads/")} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-wood-deep">
          <DrumHead className="w-1/2 max-w-40 opacity-25" />
          <span className="sr-only">{alt}</span>
        </div>
      )}
    </div>
  );
}
