import Image from "next/image";
import { useDict } from "../utils/useDictHook";

export type PersonCardProps = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  onClick: () => void;
};

export default function PersonCard({
  name,
  role,
  photoUrl,
  githubUrl,
  onClick,
}: PersonCardProps) {
  const dict = useDict();

  return (
    <div
      className="hover:-translate-y-1 flex items-center gap-x-3.5 mt-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden w-18 h-18 sm:w-24 sm:h-24 rounded-full ">
        <Image
          width={100}
          height={100}
          className="inline-block"
          src={photoUrl}
          alt={name}
        />
      </div>
      <div>
        <span className="sm:text-lg text-[#f6009c] font-bold md:text-xl">
          {role}
        </span>
        <div className="flex flex-wrap items-center gap-1">
          <span>{dict.welcToGit}</span>
          <a
            rel="noreferrer"
            href={githubUrl}
            target="_blank"
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <Image
              width={45}
              height={45}
              className="inline-block"
              src="/icons8-github.svg"
              alt="GitHubLogo"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
