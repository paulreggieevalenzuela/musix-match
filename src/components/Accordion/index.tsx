import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, toggle }: any) => {
  return (
    <div className="border mb-2 overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-2 bg-maroon-500 text-white font-semibold text-left capitalize"
        onClick={toggle}
      >
        {title}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-full" : "max-h-0"
          }`}
      >
        <div className="p-4 bg-gray-100 whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  );
};

const Accordion = ({ items }: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item: any, index: number) => (
        <AccordionItem
          key={index}
          title={item.name}
          content={item.lyrics}
          isOpen={openIndex === index}
          toggle={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;