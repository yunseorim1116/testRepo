import React, { useState, useEffect } from "react";

interface ISearchProps {
  inputValue: string;
  setInputValue:  React.Dispatch<React.SetStateAction<string>>
}

export default function SearchInput(props: ISearchProps) {
  console.log(props);

  const [timer, setTimer] = useState(0);
  const [focus, setFocus] = useState(false);
  const [flag, setFlag] = useState(false);
  let output: string[] = JSON.parse(localStorage.getItem("Keywords") || "[]"); // 저장된 검색어 가져옴

  // 로컬 스토리지 저장 처리
  const handleLocalStorage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let Keywords: { id: number; content: string } = {
      id: Date.now(),
      content: e.target.value,
    };

    // input에 값이 있고 && 스토리지에 저장된 검색어가 있을 때
    if (e.target.value && localStorage.getItem("Keywords")) {
      if (output.length >= 5) {
        // 검색어가 5개 이상이 됐을 때
        output.shift(); // shift로 제일 처음 검색어를 뺀다.
      }
      localStorage.setItem("Keywords", JSON.stringify([...output, Keywords])); // localstorage에 검색어 저장
    } else if (e.target.value) {
      // 스토리지에 처음 저장할 때
      localStorage.setItem("Keywords", JSON.stringify([Keywords]));
    }
  };

  // 검색어 삭제 처리
  const handleKeywordDelete = (idx: number) => {
    output.splice(output.length - idx - 1, 1);
    localStorage.setItem("Keywords", JSON.stringify([...output]));
    setFlag(!flag);
    if (!output.length) {
      // 최근검색어 모두 삭제 시 스토리지에 빈 배열이 남아있어서 아예 삭제 처리
      localStorage.removeItem("Keywords");
    }
  };

  const handleBlurClear = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // 0.5초 후 검색 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      //0.5초 미만으로 입력이 주어질 경우 해당 timer를 clear
      clearTimeout(timer);
    }
    const newTimer: any = setTimeout(() => {
      props.setInputValue(e.target.value);
      handleLocalStorage(e);
    }, 500); //입력 후 0.5초 이상 지나면 e.target.value를 담는 함수 실행
    setTimer(newTimer);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="type search keyword here"
        onChange={handleInputChange}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        style={{ width: "100%" }}
      />
      <br />
      {focus && localStorage.getItem("Keywords") && (
        <ul
          style={{
            listStyle: "none",
            padding: 5,
            margin: 0,
            border: "2px solid black",
          }}
        >
          <li style={{ fontStyle: "italic", color: "gray" }}>
            Recent Keywords...
          </li>
          {
            // 최근검색어 출력
            JSON.parse(localStorage.getItem("Keywords") || "[]")
              .reverse()
              .map((item: { id: number; content: string }, i: number) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.content}
                  <span
                    onClick={() => {
                      handleKeywordDelete(i);
                    }}
                    onMouseDown={handleBlurClear}
                    style={{ cursor: "pointer", fontSize: 25 }}
                  >
                    ×
                  </span>
                </li>
              ))
          }
        </ul>
      )}
    </div>
  );
}
