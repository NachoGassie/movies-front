export const basicError = (field: string, type: string) => (
  {
    required_error: `${field} es obligatorio`,
    invalid_type_error: `${field} debe ser un ${type}`
  }
);
export const anioLanzamientoError = () => (
  {
    required_error: `Año de Lanzamiento es obligatorio`,
    invalid_type_error: `Año de Lanzamiento debe ser mayor que 1900`
  }
);

export const greaterThanError = (field: string, min: number) => (
  `${field} debe ser mayor que ${min}`
);

export const stringLenghtError = (field: string, cant: number) => (
  `${field} debe tener al menos ${cant} caracter/es`
);