import { Oval } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="absolute w-32 h-32 left-1/2 top-1/2 -translate-x-10 -translate-y-1/2">
      <Oval color="#e1a1e9" className="w-32 h-32" />;
    </div>
  );
}
