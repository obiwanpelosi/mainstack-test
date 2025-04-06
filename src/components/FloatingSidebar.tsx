import Clip from "../assets/clip.svg";
import Paper from "../assets/paper.svg";
import Doc from "../assets/doc.svg";
import Folder from "../assets/folder.svg";

const FloatingSidebar = () => {
  return (
    <div className="fixed bg-white left-4 top-1/2 -translate-y-1/2 h-[192px] hidden lg:flex flex-col items-between justify-between gap-4 rounded-full px-2 py-2 border shadow-lg">
      <div className="flex items-center justify-center">
        <img src={Clip} alt="clip" />
      </div>

      <div className="flex items-center justify-center">
        <img src={Doc} alt="doc" />
      </div>
      <div className="flex items-center justify-center">
        <img src={Folder} alt="folder" />
      </div>
      <div className="flex items-center justify-center">
        <img src={Paper} alt="paper" />
      </div>
    </div>
  );
};

export default FloatingSidebar;
