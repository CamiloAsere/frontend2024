// fetchFunctions.ts
export type User = {
    id: number,
    name: string,
    gender:'male'|'female',
    username:string,
    role:string;
    megasAvailable:number,
    megasUsed:number,
    totalMegasPlan:number
  };
  export type ApiData = {
    // Define aquí las propiedades de los datos que recibes de la API
    id: number,
    name: string,
    username: string,
    role: string
  };
  
  export const fetchGeneric = async <T>(url: string, transformData ?: (data: ApiData) => T): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Network response was not ok. Status: ${res.status}, Body: ${await res.text()}`);
    }
    
    const data: ApiData = await res.json();
    if (!data) {
      throw new Error('Data is null or undefined');
    }
    
    const newData = transformData ? transformData(data) : data;
    return newData;
  };
  
  const generateTestData = (user: ApiData): User => {
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const totalMegasPlan = Math.floor(Math.random() * 1000);
    const megasUsed = Math.floor(Math.random() * totalMegasPlan);
    const megasAvailable = totalMegasPlan - megasUsed;
  
    return {
      ...user,
      gender,
      totalMegasPlan,
      megasUsed,
      megasAvailable
    };
  };

  export const transformUser = (data: ApiData): User => {
    return generateTestData(data);
  };
  
  export const transformUsers = (data: ApiData[]): User[] => {
    return data.map(generateTestData);
  };
  