// Definimos las clases de error personalizadas
class ErrorWithMessage extends Error {
    constructor(public data: { message: string }, public status: number) {
      super(data.message);
      this.name = 'ErrorWithMessage';
    }
  }
  
  class SerializedError extends Error {
    constructor(public data: object) {
      super(JSON.stringify(data));
      this.name = 'SerializedError';
    }
  }
  
  // Función de utilidad para comprobar si un objeto es una instancia de una clase de error
  function isErrorInstance(error: unknown, errorClass: any): error is Error {
    return error instanceof errorClass;
  }
  
  // Funciones para comprobar el tipo de error
  export function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return isErrorInstance(error, ErrorWithMessage);
  }
  
  export function isSerializedError(error: unknown): error is SerializedError {
    return isErrorInstance(error, SerializedError);
  }
  
  // Ejemplo de uso
  try {
    // Aquí va tu código que puede lanzar errores
    throw new ErrorWithMessage({ message: 'Algo salió mal' }, 500);
  } catch (error) {
    if (isErrorWithMessage(error)) {
      console.log(`Error with status ${error.status} and message: ${error.message}`);
    } else if (isSerializedError(error)) {
      console.log(`Serialized error with data: ${error.message}`);
    } else {
      console.log('Unknown error type:', error);
    }
  }
  