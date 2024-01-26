interface QuoteData {
  name: string;
  trafficD: number;
}
interface QuoteData {
    name: string;
    trafficD: number;
  }
  
  interface TotalQuoteData {
    name: string;
    TotalQuote: number;
  }
  
  interface CombinedData extends QuoteData, TotalQuoteData {}
  
  const MyComponent = () => {
    const url1='https://10.34.0.100:7094/Cuota';
    const url2='https://10.34.0.100:7094/QuotaTotal'
    /*
    const quoteData = useFetchData(url1);
    const totalQuoteData = useFetchData(url2);
    console.log(" quoteData1 : ", quoteData)
    console.log(" quoteData2 : ",totalQuoteData)
  
   
    if (quoteData.loading || totalQuoteData.loading) {
      return <div>Cargando...</div>;
    }
  
    if (quoteData.error || totalQuoteData.error) {
      return <div>Ocurrió un error al obtener los datos.</div>;
    }
*/
    const quoteData=[{name:"george",username:"george.money",trafficD:"111"},{name:"ana",username:"ana1989",trafficD:"91"}]
    const totalQuoteData=[{name:"george",username:"george.money",totalQuota:54},{name:"ana",username:"ana1989",totalQuota:27}]
   
    const combinedData = quoteData.map((quoteObj: CombinedData[]) => {
      const totalQuotaObj = totalQuoteData.find((totalQuoteObj: TotalQuoteData) => totalQuoteObj.name === quoteObj.name);
      
      // Si no se encuentra un objeto correspondiente en totalQuoteData.data, se retorna el objeto original de quoteData.data
      if (!totalQuotaObj) return quoteObj;
    
      // Se combinan los objetos sin duplicar las propiedades
      return {
        ...quoteObj,
        ...totalQuotaObj,
      };
    });
    
  console.log('combinedData: ',combinedData)

    return (
      <ul>
        {combinedData.map(({ quote,name,trafficD,totalQuota }) => (
      <li key={name}>
        <h5>name {name}</h5>
        <p>trafico {trafficD}</p>
        <p>Total Quota {totalQuota}</p>
      </li>
    ))}
      </ul>
    );
  };
  
  export default MyComponent;
  