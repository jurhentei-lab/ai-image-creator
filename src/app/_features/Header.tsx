import { Separator } from "@radix-ui/react-separator";

export const Header = () => {
  return (
    <div>
      <div className="px-12 py-4 w-full border-box">
        <p className="w-14.75 h-6 text-base font-semibold">AI tools</p>
      </div>
      <Separator
        orientation="horizontal"
        className=" h-px w-full bg-gray-200 box-border"
      />
    </div>
  );
};
