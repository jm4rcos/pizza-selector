import { Olive } from "./olive";
import { Pepperoni } from "./pepperoni";

export const PizzaDetails = () => (
  <>
    <div className="absolute top-20 left-14">
      <Pepperoni />
    </div>

    <div className="absolute top-16 left-24 rotate-6 bg-white w-4 h-3 rounded-full" />
    <div className="absolute top-22 right-12 rotate-12 bg-white w-4 h-3 rounded-full" />
    <div className="absolute left-16 -rotate-3 bg-white w-4 h-3 rounded-full" />
    <div className="absolute mt-8 ml-4 -rotate-12 bg-white w-4 h-3 rounded-full" />
    <div className="absolute bottom-8 left-24 rotate-90 bg-white w-4 h-3 rounded-full" />
    <div className="absolute top-14 left-20">
      <Olive />
    </div>
    <div className="absolute top-10 transform -rotate-12">
      <Pepperoni />
    </div>
    <div className="absolute top-16 right-24">
      <Olive />
    </div>
    <div className="absolute top-30 right-8">
      <Olive />
    </div>

    <div className="absolute bottom-12 right-16">
      <Olive />
    </div>
    <div className="absolute bottom-16 right-16">
      <Pepperoni />
    </div>
    <div className="absolute top-32 left-8">
      <Olive />
    </div>

    <div className="absolute top-16 right-16">
      <Pepperoni />
    </div>
    <div className="absolute bottom-16 left-16">
      <Pepperoni />
    </div>
  </>
);
