import Image from "next/image";
import { useDict } from "../utils/useDictHook";

export type PersonDetailesProps = {
  name: string;
  role: string;
  photoUrl: string;
  githubUrl: string;
  description: string;
  contributions: string[];
};

export default function PersonDetailes({
  name,
  role,
  photoUrl,
  githubUrl,
  description,
  contributions,
}: PersonDetailesProps) {
  const dict = useDict();

  return (
    <>
      <div className="my-12 mx-4 md:mx-8 text-center md:text-lg">
        <div className="inline-block w-36 h-36 rounded-[50%] p-3 bg-green-50">
          <div className="overflow-hidden w-[100%] h-[100%] rounded-[50%]">
            <Image width={144} height={144} src={photoUrl} alt="photo" />
          </div>
        </div>
        <div className=" bg-green-50 -mt-16 md:p-[70px_30px_30px] p-[70px_10px_10px] rounded-md">
          <h2 className="uppercase">{name}</h2>
          <span className="font-bold">{role}</span>
          <p className="text-left">{description}</p>
          <p className="text-left font-bold">{dict.contributionsTitle}</p>
          <ul className="list-disc ml-4 text-left">
            {contributions.map((c) => {
              return <li key={c}>{c}</li>;
            })}
          </ul>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <span>{dict.myGit}</span>
            <a href={githubUrl} target="_blank" rel="noreferrer">
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
    </>
  );
}
