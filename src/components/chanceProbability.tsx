interface ChanceProbabilityProps {
  probability: number;
}

const ChanceProbability = ({ probability }: ChanceProbabilityProps) => {
  return (
    <div className="relative max-w-20">
      <input
        type="number"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full  py-2 px-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={probability}
        max={100}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
        %
      </span>
    </div>
  );
};

export default ChanceProbability;
