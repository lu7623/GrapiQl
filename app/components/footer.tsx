import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-header text-white flex sm:justify-around items-center py-2 flex-col sm:flex-row gap-4">
      <div className="flex gap-2 items-center">
        <Image
          src={"/github.png"}
          width={80}
          height={80}
          alt={"Github"}
          className=" md:w-20 md:h-20 w-12 h-12"
        />
        <div className="flex flex-col">
          <Link href={"https://github.com/lu7623"}>lu7623</Link>
          <Link href={"https://github.com/mksenni"}>mksenni</Link>
          <Link href={"https://github.com/ramzes-84"}>ramzes-84</Link>
        </div>
      </div>
      <div className=" lg:text-2xl">@2023</div>
      <Link href={"https://rs.school/react/"}>
        <Image
          src={"https://rs.school/images/rs_school_js.svg"}
          width={120}
          height={60}
          alt={"RS School"}
          className=" md:w-32 md:h-16 w-20 h-10"
        />
      </Link>
    </footer>
  );
};
