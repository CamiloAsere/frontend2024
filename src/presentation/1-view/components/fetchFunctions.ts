export type User = {
    name: string;
    username: string;
    megasAvailable: number;
    megasUsed: number;
    totalMegasPlan: number;
    gender: 'male' | 'female';
  };
  
  export type FetchOptions = {
    url: string;
    onError?: (error: Error) => void;
    transformData?: (data: any) => any;
  };
  export const fetchUser = async (options: FetchOptions): Promise<User> => {
    const res = await fetch(options.url);
    
    if (!res.ok) {
      const error = new Error('Network response was not ok');
      options.onError?.(error);
      throw error;
    }
    
    let data = await res.json();
    
    // Aplica la transformación de datos personalizada, si existe
      // Genera un género aleatorio
      data.gender = Math.random() < 0.5 ? 'male' : 'female';
    
      // Añade tus propios campos de prueba
     data.totalMegasPlan = Math.floor(Math.random() * 1000);
     data.megasUsed = Math.floor(Math.random() * data.totalMegasPlan);
     data.megasAvailable = data.totalMegasPlan - data.megasUsed;
    if (options.transformData) {
      data = options.transformData(data);
    }
    
    return data as User;
  };
  