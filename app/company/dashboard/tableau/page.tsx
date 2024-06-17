export default function Page() {
  return (
    <>
      <div>
        {/*<Tableau tableauUrl="https://app.powerbi.com/view?r=eyJrIjoiNDY4OWRkNDUtZDNlMC00NjFjLThkZmItMjJmYWViYmQyNmY1IiwidCI6ImNhODhmMmZkLTkxYzgtNDE3OS1hM2FhLWJjODM3NjVmNjUxMyJ9&pageName=76c5440e54369308734d" />

        <NoSSR tableauUrl="https://tsereports.trade.gov/views/StateAnnualDashboardLive_16421978287720/TradebyPartnerbyState?:showVizHome=no&:embed=true" />*/}
        <iframe
          src="https://tsereports.trade.gov/views/StateAnnualDashboardLive_16421978287720/TradebyPartnerbyState?:showVizHome=no&:embed=true"
          width="1045"
          height="955"
        ></iframe>
      </div>
    </>
  );
}
