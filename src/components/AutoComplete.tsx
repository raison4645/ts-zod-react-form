import { useState } from "react";
import { ToggleListBtn } from "./ToggleListBtn";

type listProps = {
  dataList: object[];
  inputId: string;
  nested: boolean;
};

export const AutoComplete = ({ dataList, inputId, nested }: listProps) => {
  const [data, setData] = useState<object[]>(dataList);
  const [toggle, setToggle] = useState<string>("none");

  const onInputChange = (e: any) => {
    const input:string = e.target.value;
    if (input === "") {
      setData(dataList);
      setToggle("none");
    } else {
      const regex:RegExp = new RegExp(input, "i");
      setData(dataList.filter((item) => regex.test(item.parent?? item.sub.map(nation => nation.desc))));
      setToggle("flex");
    }
  };

  const selectItem = (e: any) => {
    const inputField = document.getElementById(inputId) as HTMLInputElement;
    inputField.value = e.target.innerText;
    setToggle("none");
  };

  return (
    <div className="m-2">
      <label>Find:</label>
      <br />
      <div>
        <input
          id={inputId}
          type="text"
          className="border mt-2 rounded w-3/6"
          onChange={onInputChange}
        />
        <button
          id="toggleBtn"
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
        className="w-3/6 border flex flex-col bg-white gap-2 mt-2 h-60 overflow-y-scroll"
        style={{ display: `${toggle}` }}
      >
        {!nested ?
          data.map(item =>
            <li className="border-b bg-white" key={item.id} onClick={selectItem}>
              {item.parent}
            </li>
          )
          :
          data.map(item =>
            <li className='bg-white' key={item.id}>
              {item.parent}
              {
                item.sub.map(nation =>
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
