import styled from "@emotion/styled"

export const DetailDoctorModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 660px;
  width: 880px;
  padding: 24px 24px 0 24px;
  margin-bottom: 12px;
  .MuiDateCalendar-root {
    background-color: #fafafb;
    padding: 16px 22px;
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
