import Image from "next/image";

export default function Loader({ size }: { size: number }) {
  return (
    <Image
      src="Spinner-1s-200px.svg"
      width={size}
      height={size}
      alt="loading"
      priority={true}
    />
  );
}
