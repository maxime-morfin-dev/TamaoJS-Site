const technoItems = ["React", "NodeJS", "NextJS", "Flutter", "C#", "SocketIO"];

export default function Tags() {
  return (
    <div className="flex justify-start items-center lg:h-fit my-8 gap-3 flex-wrap lg:max-w-sm">
      {technoItems.map((item, index) => (
        <div
          key={index}
          className="px-4 rounded-sm bg-slate-500 text-white dark:bg-white bg-opacity-70 dark:bg-opacity-80 :hover:dark:bg-opacity-100 hover:bg-opacity-100 transition-all duration-300 ease-in-out hover:cursor-pointer dark:text-black text-sm font-medium"
        >
          {item}
        </div>
      ))}
    </div>
  );
}
