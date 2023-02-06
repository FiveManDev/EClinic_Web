import CustomButton from "components/User/Button"
import Card from "./components/card"

const Services = () => {
  return (
    <section className="flex flex-col w-full ">
      <h3 className="mb-3 heading-section ">Popular services</h3>
      <p className="mb-4 desc-section">
        Hơn 30 dịch vụ chúng tôi có thể cung cấp cho bạn
      </p>
      <CustomButton kind="secondary" className="max-w-[200px]">
        View all services
      </CustomButton>

      <div className="relative grid grid-cols-1 pt-8 gap-y-2 md:gap-x-4 md:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  )
}

export default Services
