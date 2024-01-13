export default (results) => {
    const digestivo = results.filter(r => r == 1)
    const intestinal = results.filter(r => r == 2)
    const circulatorio = results.filter(r => r == 3)
    const nervioso = results.filter(r => r == 4)
    const inmunológico = results.filter(r => r == 5)
    const respiratorio = results.filter(r => r == 6)
    const urinario = results.filter(r => r == 7)
    const glandular = results.filter(r => r == 8)
    const estructural = results.filter(r => r == 9)

    const calProm = () => {
        let suma = 0
        for (let numero of results) {
            suma += numero;
        }
        return (suma / results.length).toFixed();
    }

    const calModa = (array) => {
        let mayor = 0;
        let moda = undefined;

        for (const numero of array) {
            const contador = array.reduce((a, b) => b === numero ? a + 1 : a, 0);
            if (contador > mayor) {
                mayor = contador;
                moda = numero;
            }
        }

        return moda;
    }


    return { digestivo: digestivo.length, intestinal: intestinal.length, circulatorio: circulatorio.length, nervioso: nervioso.length, inmunológico: inmunológico.length, respiratorio: respiratorio.length, urinario: urinario.length, glandular: glandular.length, estructural: estructural.length, promedio: calProm(), moda: calModa(results) }
}