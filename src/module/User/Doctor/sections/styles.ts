import styled from "@emotion/styled"

export const DetailDoctorModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .MuiDateCalendar-root {
    background-color: #fafafb;
    border-radius: 8px;
    margin: 0;
    display: flex;
    flex-shrink: 0;
    padding: 16px 22px;
    width: fit-content;
    height: auto;
    .MuiDayCalendar-header,
    .MuiDayCalendar-weekContainer {
      gap: 18px;
    }
    .MuiDayCalendar-monthContainer {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .MuiPickersDay-dayWithMargin {
      font-size: 16px;
      font-weight: 300;
    }
  }
  .modal-filed {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .label {
      font-size: 16px;
      color: #44444f;
      font-weight: 500;
    }
  }
`
