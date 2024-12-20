const Navbar = () => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-20 bg-slate-50 border-b-4 border-black flex items-center justify-between p-4">
      <div>
        <h1 className="font-serif font-extrabold text-2xl">Muaddib</h1>
      </div>
      <div className="text-xl">
        <ul className="flex gap-2">
          <li className="hover:cursor-pointer">Home</li>
          <li className="hover:cursor-pointer underline-offset-2 underline decoration-amber-500 decoration-2">
            Editor
          </li>
          <li className="hover:cursor-pointer">About Us</li>
        </ul>
      </div>
      <div>
        <p className="bg-gradient-to-r select-none from-amber-500 to-yellow-500 px-4 py-2  font-bold ">
          subject to change
        </p>
      </div>
    </div>
  );
};

export default Navbar;
