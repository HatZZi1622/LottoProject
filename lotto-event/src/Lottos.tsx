import "./App.css";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

interface IMember {
  name: string;
  // sign_number: number;
  win_number: number;
  //   color: string;
}
const colorchip: any[] = ["", "", ""];

// const defaultMember = { name: "", sign_number: 0, win_number: 0, color: "" };
const defaultMember = { name: "", sign_number: 0, win_number: 0 };
function App() {
  const [memberName, setIsMemberName] = useState("");
  const [settingNum, setSettingNum] = useState<number>(1);
  const [isMembers, setIsMembers] = useState<any>([]);
  const [winnerNumber, setWinnerNumber] = useState<number>(1);
  const [isWinners, setIsWinners] = useState<any>([]);

  const membersNum = Object.keys(isMembers).length;

  const handlePushMember = () => {
    setIsMembers([...isMembers, { name: memberName, win_number: 0 }]);

    console.log(isMembers);
  };

  // useEffect(() => {
  //   membersNum === 0
  //     ? setIsMembers((isMembers: any[]) => [isMembers, newMember])
  //     : isMembers.push(newMember);
  // }, [newMember]);

  // useEffect(() => {
  //   setIsMembers(() => isMembers.push(newMember));
  // }, [newMember]);
  //   const handlePushMember = (memberName: any) => {
  //     if (membersNum - Object.keys(colorchip).length + 1 < 0) {
  //       setNewMember((prev) => (prev.name = memberName));
  //       //   setNewMember((prev) => (prev.color = colorchip[membersNum + 1]));
  //       // setNewMember((prev) => prev.sign_number= Object.keys(isMembers).length+1)
  //     } else {
  //       setNewMember((prev) => (prev.name = memberName));
  //       //   setNewMember(
  //       //     (prev) =>
  //       //       (prev.color =
  //       //         colorchip[
  //       //           (Object.keys(isMembers).length % Object.keys(colorchip).length) +
  //       //             1
  //       //         ])
  //       //   );
  //     }
  //     setIsMembers((isMembers: any) => [isMembers, newMember]);
  //   };

  const handleSetNumber = (settingNum: number) => {
    setWinnerNumber(settingNum);
  };

  const handleSelectWinners = () => {
    let i = 0;
    const pushName: string[] = [];
    while (i < winnerNumber + 1) {
      let n = Math.floor(Math.random() * membersNum);

      if (!pushName.find((e: any) => e === isMembers[n].name)) {
        pushName.push(isMembers[n].name);
        i++;
      } else continue;
    }
    setIsWinners(pushName);
  };

  useEffect(() => {
    console.log(isWinners);
  }, [isWinners]);

  return (
    <BackGround>
      <NameInput>
        <TextLine>멤버를 추가합니다</TextLine>
        <Input
          value={memberName}
          onChange={(e) => setIsMemberName(e.target.value)}
        ></Input>
        <AddButton
          onClick={() => {
            handlePushMember();
            setIsMemberName("");
          }}
        >
          추가하기
        </AddButton>
        <Input
          type="number"
          min={1}
          max={membersNum - 1}
          value={settingNum}
          onChange={(e) => {
            setSettingNum(parseInt(e.target.value));
            handleSetNumber(settingNum);
          }}
        ></Input>
      </NameInput>
      {isMembers == null
        ? ""
        : isMembers.map((v: any) => {
            return <MemberNames>{v.name}</MemberNames>;
          })}
      <SelectButton onClick={() => handleSelectWinners()}>돌리기</SelectButton>
      {isWinners == null
        ? ""
        : isWinners.map((v: any) => {
            return <MemberNames>{v}</MemberNames>;
          })}
    </BackGround>
  );
}

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;

const MemberNames = styled.div`
  display: flex;
  width: 100px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameInput = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 30px;
  color: black;
`;

const Input = styled.input`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
`;

const AddButton = styled.button``;
const SelectButton = styled.button``;

export default App;
