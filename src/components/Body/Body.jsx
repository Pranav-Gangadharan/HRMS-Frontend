import "./body.css";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Barchart from "../Barchart/Barchart";
import { FaProjectDiagram } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import Linechart from "../Linechart/Linechart";

const Body = () => {
  return (
    <div className="mainContent">
      <Navbar />

      <div className="bottom flex">
        <Card number={"112"} name={"Project"} icon={<FaProjectDiagram />} />
        <Card
          number={"50"}
          name={"Client"}
          icon={<RiMoneyDollarCircleLine />}
        />
        <Card number={"30"} name={"Tasks"} icon={<MdOutlineTaskAlt />} />
        <Card number={"10"} name={"Employees"} icon={<IoPeopleSharp />} />
        <Card number={"10"} name={"Employees"} icon={<IoPeopleSharp />} />
      </div>

      <div className="chartSection flex">
        <Barchart />
        <Linechart />
      </div>
    </div>
  );
};

export default Body;
