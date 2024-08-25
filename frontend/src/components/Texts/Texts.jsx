
const Texts = () => {
  return (
    <div className='flex flex-col gap-[1rem] px-4 md:px-10 text-[#4C4C4C] leading-[27px] mb-[3rem]'>
      <p className='text-justify text-sm'>Welcome to Adiinsight a not-for-profit initiative dedicated to tracking and analyzing the prices of essential goods and services across Nigeria&apos;s six(6) geographical zones. Our mission is to provide insights into the impact of economic reforms, regional differences, religious influences, and other factors on the cost of living in various states and zones.</p>
      <div>
        <p className='text-justify text-sm'>We collect and update data twice daily on:</p>
        <ul className="list-disc ml-[2rem]">
          <li>Food prices</li>
          <li>Rent and accommodation costs</li>
          <li>Petrol and fuel prices</li>
          <li>And other essential expenses</li>
        </ul>
      </div>

      <div>
        <p className='text-justify text-sm'>Our unique approach combines human data collection with machine learning algorithms to ensure accuracy and reliability. By doing so, we aim to:</p>
        <ul className="list-disc ml-[2rem]">
          <li>Inform policy decisions with data-driven insights</li>
          <li>Enhance economic understanding and research</li>
          <li>Support businesses and individuals in making informed decisions</li>
          <li>Foster transparency and accountability in price setting</li>
        </ul>
      </div>

      <p>Explore our website to access up-to-date price data, interactive dashboards, and in-depth analysis. Together, let&apos;s work towards a more equitable and prosperous Nigeria.</p>

      <p><b>Note:</b> We are a not-for-profit organisation, and our data is available for free to ensure equal access to information for all.</p>
    </div>
  )
}

export default Texts
