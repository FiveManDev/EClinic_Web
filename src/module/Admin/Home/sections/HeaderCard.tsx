import Card from "./Card"

const HeaderCard = () => {
  return (
    <div className="grid justify-around grid-cols-3 gap-x-6">
      <Card
        icon="/images/calendar.svg"
        title="Appointment"
        dataNumber="2113  "
      />
      <Card icon="/images/people.svg" title="New Patients" dataNumber="104" />
      <Card
        icon="/images/creditcard.svg"
        title="Total Earnings"
        dataNumber="$ 2113"
      />
    </div>
  )
}

export default HeaderCard
