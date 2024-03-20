interface Elemento {
    numero: number;
    peso: number;
    beneficio: number;
  }
  
  abstract class ProcesadorMochila {
    abstract leerArchivo(): string;
    abstract parsearDatos(datos: string): { capacidad: number; elementos: Elemento[] };
    abstract extraerBeneficiosYPesos(elementos: Elemento[]): { beneficios: number[]; pesos: number[] };
  
    procesar(): { beneficios: number[]; pesos: number[] } {
      const datos = this.leerArchivo();
      const { capacidad, elementos } = this.parsearDatos(datos);
      const { beneficios, pesos } = this.extraerBeneficiosYPesos(elementos);
      return { beneficios, pesos };
    }
  }
  
  export class CSVProcesador extends ProcesadorMochila {
    leerArchivo(): string {
      // Simulación de la lectura de un archivo CSV
      return "10\n3\n1,2,5\n2,3,7\n3,4,10";
    }
  
    parsearDatos(datos: string): { capacidad: number; elementos: Elemento[] } {
      const lineas = datos.split("\n");
      const capacidad = parseInt(lineas[0]);
      const elementos: Elemento[] = [];
  
      for (let i = 2; i < lineas.length; i++) {
        const [numero, peso, beneficio] = lineas[i].split(",").map(Number);
        elementos.push({ numero, peso, beneficio });
      }
  
      return { capacidad, elementos };
    }
  
    extraerBeneficiosYPesos(elementos: Elemento[]): { beneficios: number[]; pesos: number[] } {
      const beneficios = elementos.map(elemento => elemento.beneficio);
      const pesos = elementos.map(elemento => elemento.peso);
      return { beneficios, pesos };
    }
  }
  
  export class JSONProcesador extends ProcesadorMochila {
    leerArchivo(): string {
      // Simulación de la lectura de un archivo JSON
      return '{"capacidad": 10, "numElementos": 3, "elementos": [{"numero": 1, "peso": 2, "beneficio": 5}, {"numero": 2, "peso": 3, "beneficio": 7}, {"numero": 3, "peso": 4, "beneficio": 10}]}';
    }
  
    parsearDatos(datos: string): { capacidad: number; elementos: Elemento[] } {
      const objeto = JSON.parse(datos);
      const capacidad = objeto.capacidad;
      const elementos = objeto.elementos;
      return { capacidad, elementos };
    }
  
    extraerBeneficiosYPesos(elementos: Elemento[]): { beneficios: number[]; pesos: number[] } {
      const beneficios = elementos.map(elemento => elemento.beneficio);
      const pesos = elementos.map(elemento => elemento.peso);
      return { beneficios, pesos };
    }
  }
  
  // EJEMPLOS DE USO
  const csvProcesador = new CSVProcesador();
  const csvResultados = csvProcesador.procesar();
  console.log("Resultados del procesador CSV:");
  console.log("Beneficios:", csvResultados.beneficios);     // [5, 7, 10]
  console.log("Pesos:", csvResultados.pesos);               // [2, 3, 4]
  
  const jsonProcesador = new JSONProcesador();              
  const jsonResultados = jsonProcesador.procesar();
  console.log("\nResultados del procesador JSON:");
  console.log("Beneficios:", jsonResultados.beneficios);    // [5, 7, 10]
  console.log("Pesos:", jsonResultados.pesos);              // [2, 3, 4]
  