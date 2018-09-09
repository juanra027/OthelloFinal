module.exports = {
    crearTablero:function(tam) {
        let matriz = new Array(tam);
        for (f = 0; f < tam; f++) {
            matriz[f] = new Array(tam);
    
            for (c = 0; c < tam; c++) {
                if ((tam / 2 == f) & (tam / 2 == c)) {
                    matriz[f][c] = 1;
                } else if ((tam / 2 == f) & (tam / 2 - 1 == c)) {
                    matriz[f][c] = 2;
                } else if ((tam / 2 - 1 == f) & (tam / 2 == c)) {
                    matriz[f][c] = 2;
                } else if ((tam / 2 - 1 == f) & (tam / 2 - 1 == c)) {
                    matriz[f][c] = 1;
                } else {
                    matriz[f][c] = 0;
                }
            }
        }
        return (matriz);
    },
    
    validateMove:function(matriz,fila, columna, ficha,tam){
        return movimiento(matriz,fila,columna,ficha,tam);
    }

    
}

function movimiento(matriz,fila, columna, ficha, tam) {
    let object = {matrix:matriz,validate:false};
    if (matriz[fila][columna] == 0) {
        if (ficha == 1) {
            object = movFichaVerifica(matriz,fila, columna, 2, tam); 
            if (object.validate == true) {
                object.matrix[fila][columna] = ficha;
                //return "La jugada se realizó con exito";
            }
            else {
                return {matrix:matriz,validate:false};
            }
        }
        else {
            object = movFichaVerifica(matriz,fila, columna, 1, tam); 
            //jugada = movFichaVerifica(matriz,fila, columna, 1, tam).verifica;


            if (object.validate == true) {
                object.matrix[fila][columna] = ficha;
                //return "La jugada se realizó con exito";
            }
            else {
                return {matrix:matriz,validate:false};
            }
        }
        //matriz = object.matrizId
    }

    else {
        //return "Esa posicion ya esta ocupada por una ficha";
    }
    return object
}

function movFichaVerifica(matriz,fila, columna, fichaC, tam) {
    var f = parseInt(fila);
    var c = parseInt(columna);
    var ficha;

    var verifica = false;

    if (fichaC == 1) {
        ficha = 2;

    }
    else {
        ficha = 1;

    }


    if (fila != 0 & columna != 0) {
        if (matriz[fila - 1][columna - 1] == fichaC) {
            while (f != 0 & c != 0) {
                f--;
                c--;
            }

            while (f < fila & c < columna) {
                if (matriz[f][c] == ficha) {
                    while (f != fila & c != columna) {
                        f++;
                        c++;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }

                f++;
                c++;
            }

        }
    }

    if (fila != 0) {
        f = fila;
        c = columna;
        if (matriz[fila - 1][columna] == fichaC) {
            f = 0;

            while (f < fila) {

                if (matriz[f][c] == ficha) {
                    //aqui iba
                    while (f != fila) {
                        f++;
                        matriz[f][c] = ficha;
                        
                        verifica = true;

                    }
                }
                f++;
            }

        }
    }

    if (fila != 0 & columna != tam - 1) {
        f = fila;
        c = columna;

        if (matriz[fila - 1][columna + 1] == fichaC) {
            while (f != 0 & c != tam - 1) {
                f--;
                c++;
            }

            while (f < fila & c > columna) {
                if (matriz[f][c] == ficha) {
                    while (f != fila & c != columna) {
                        f++;
                        c--;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }
                f++;
                c--;
            }

        }
    }



    if (columna != 0) {
        f = fila;
        c = columna;

        if (matriz[fila][columna - 1] == fichaC) {
            c = 0;

            while (c < columna) {
                if (matriz[f][c] == ficha) {
                    while (c != columna) {
                        c++;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }
                c++;
            }

        }
    }

    if (columna != tam - 1) {
        f = fila;
        c = columna;
        if (matriz[fila][columna + 1] == fichaC) {
            c = tam - 1;

            while (c > columna) {

                if (matriz[f][c] == ficha) {
                    while (c != columna) {
                        c--;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }
                c--;
            }
            

        }

    }

    if (fila != tam - 1 & columna != 0) {
        f = fila;
        c = columna;
        if (matriz[fila + 1][columna - 1] == fichaC) {
            while (f != tam - 1 & c != 0) {
                f++;
                c--;
            }

            while (f > fila & c < columna) {
                if (matriz[f][c] == ficha) {
                    while (f != fila & c != columna) {
                        f--;
                        c++;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }
                f--;
                c++;
            }

        }
    }

    if (fila != tam - 1) {
        f = fila;
        c = columna;
        if (matriz[fila + 1][columna] == fichaC) {
            f = tam - 1;

            while (f > fila) {
                if (matriz[f][c] == ficha) {
                    while (f != fila) {
                        f--;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }
                f--;
            }

        }
    }

    if (fila != tam - 1 & columna != tam - 1) {
        f = fila;
        c = columna;

        if (matriz[fila + 1][columna + 1] == fichaC) {
            while (f != tam - 1 & c != tam - 1) {
                f++;
                c++;
            }


            while (f > fila & c > columna) {
                if (matriz[f][c] == ficha) {
                    while (f != fila & c != columna) {
                        f--;
                        c--;
                        matriz[f][c] = ficha;
                        
                        verifica = true;
                    }
                }
                f--;
                c--;
            }

        }

    }

    return {validate:verifica,matrix:matriz};
    //return matriz
}