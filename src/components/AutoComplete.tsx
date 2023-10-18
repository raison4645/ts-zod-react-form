import { useState } from "react";
import { ToggleListBtn } from "./ToggleListBtn";

interface listProps {
  dataList: object[];
  inputId: string;
  nested: boolean;
  label: string;
};

export const AutoComplete = ({ dataList, inputId, nested, label }: listProps) => {
  const [data, setData] = useState<object[]>(dataList);
  const [toggle, setToggle] = useState<string>("none");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement> /* Common type of event object is React.ChangeEvent<HTMLInputElement> */) => {
    const input:string = e.target.value;
    if (input === "") {
      setData(dataList);
      setToggle("none");
    } else {
      const regex:RegExp = new RegExp(input, "i");
      setData(dataList.filter((item: any ) => regex.test(item.parent?? item.sub.map((nation: any) => nation.desc))));
      setToggle("flex");
    }
  };

  const selectItem = (e: React.MouseEvent<HTMLElement>) => {
    const inputField = document.getElementById(inputId) as HTMLInputElement;
    inputField.value = e.target.innerText;
    setToggle("none");
  };

  return (
    <div className="m-auto w-1/3 relative">
      <label>{label}</label>
      <br />
      <div>
        <input
          id={inputId}
          type="text"
          className="border mt-2 rounded pl-1 w-10/12"
          onChange={onInputChange}
        />
        <button
          id="toggleBtn"
          className="translate-x-1"
          onClick={() =>
            toggle === "none"
              ? (setToggle("flex"), setData(dataList))
              : setToggle("none")
          }
        >
          <ToggleListBtn toggle={toggle} />
        </button>
      </div>
      <ol
        id="itemList"
        className="w-10/12 border flex flex-col bg-white gap-2 mt-2 h-60 overflow-y-scroll absolute z-10"
        style={{ display: `${toggle}` }}
      >
        {!nested ?
          data.map((item: any) =>
            <div className="border-b bg-white" key={item.id} onClick={selectItem}>
              {item.parent}
            </div>
          )
          :
          data.map((item: any) =>
            <li className='bg-white' key={item.id}>
              {item.parent}
              {
                item.sub.map((nation: any) =>
                  <div className='border-b bg-white pl-4 text-slate-600' key={nation.id} onClick={selectItem}>
                    {nation.child}
                  </div>
                )
              }
            </li>
          )
        }
      </ol>
    </div>
  );
};
