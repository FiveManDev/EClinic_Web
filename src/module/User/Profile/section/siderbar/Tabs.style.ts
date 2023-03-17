import styled from "@emotion/styled"

export const TabsWrapper = styled.div`
  width: full;
  display: flex;
  .MuiTabs-flexContainer {
    display: flex;
    justify-content: flex-start;
    padding: 10px;
  }
  .MuiTab-root {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    column-gap: 20px;
    text-transform: none;
    font-size: 18px;
    font-weight: 500;
    padding: 0px 20px;
    transition: all 0.25s ease-out;
    border-radius: 6px;
    .MuiTab-iconWrapper {
      margin-bottom: 0;
      font-size: 22px;
    }
  }
  .Mui-selected {
    background-color: rgba(2, 78, 213, 0.1);
  }
  .MuiTabs-indicator {
    display: none;
  }
`
