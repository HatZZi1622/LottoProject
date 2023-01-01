import "./App.css";
import styled from "@emotion/styled";
import React, { useState } from "react";

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
  const [isMessage, setIsMessage] = useState("");
  const [newMember, setNewMember] = useState<IMember>(defaultMember);
  const [isMembers, setIsMembers] = useState<any>([]);
  const [winnerNumber, setWinnerNumber] = useState<number>(1);
  const [isWinners, setIsWinners] = useState([""]);

  let nameList: string[] = JSON.parse(JSON.stringify(isMembers)).map(
    (data: any) => data.name
  );

  const membersNum = Object.keys(isMembers).length;

  const handlePushMember = (memberName: any) => {
    setNewMember((prev) => (prev.name = memberName));
    setIsMembers((isMembers: any[]) => [isMembers, newMember]);
  };
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

  const handleSetNumber = (e: number) => {
    if (e < membersNum) {
      if (e > 0) {
        setWinnerNumber(e);
      } else {
        setIsMessage("1명 이상의 수를 넣어주세요!");
        e = 1;
      }
    } else {
      setIsMessage("당첨자 수는 참가자 이상의 수가 될 수 없습니다!");
      e = membersNum - 1;
    }
  };
  const handleSelectWinners = () => {
    let i = 0;
    let nList = [0];
    while (i < winnerNumber) {
      let n = Math.floor(Math.random() * membersNum) + 1;
      if (!nList.find((e) => e === n)) {
        isMembers[n].win_number++;
        isWinners.push(isMembers[n]);
        i++;
      }
    }
  };

  // const selectMoreWinners = (e) => {

  // }
  return (
    <BackGround>
      <NameInput>
        <TextLine>멤버를 추가합니다</TextLine>
        <Input
          value={memberName}
          onChange={(e) => setIsMemberName(e.target.value)}
        ></Input>
        <AddButton onClick={() => handlePushMember(memberName)}>
          추가하기
        </AddButton>
      </NameInput>
      {nameList == null
        ? ""
        : nameList.map((v) => {
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

export default App;
