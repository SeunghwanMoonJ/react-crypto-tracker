import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "./atoms";

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(prop) => prop.theme.textColor};
  border-radius: 5px;
  padding: 2px 2px;
  text-align: center;
  font-size: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export function ThemeButton() {
  const isDark = useRecoilValue(isDarkAtom);
  const setAtom = useSetRecoilState(isDarkAtom);
  const toggleSetAtom = () => setAtom((prev) => !prev);

  return (
    <Container>
      <Button onClick={toggleSetAtom}>
        {isDark ? "Go Light Mode!" : "Go Dark Mode!"}
      </Button>
    </Container>
  );
}
