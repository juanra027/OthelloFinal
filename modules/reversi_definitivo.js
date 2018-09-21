		/*
		Definicion de variables y llamada de metodos para el programa
		Ej: Ficha es una lista con:
		0) 0 o 1 si esta el jugador automatico activado
		1) 1 o 2 para saber la ficha que quiere elegir siendo la opuesta a este el rival
		2) 1 2 o 3 la dificultad del jugador automatico
		*/

		var matriz; 
		var tam = 4;
		
        crearTablero(tam); 
        var ficha = new Array(3);
		ficha = [1, false, 0];
		
		/*
		Ciclo para correr el programa:
		Llamada de metodos para la jugabilidad del juego
		Dependiendo de si son jugadores normales o automaticos segun la ficha
		Este ciclo se debe sustituir por el front end
		*/ 

        while (true) {
            imprimir(tam);
            if (ficha[1] == 0) {
                document.write('FICHA: ' + ficha[0] + ' Jugador Normal');
                document.write('<br>');
                var fila = prompt('Ingresa la fila en la desee jugar: ');
                var columna = prompt('Ingresa la columna en la desee jugar: ');
                var game = movimiento(parseInt(fila), parseInt(columna), ficha, tam);
            } else {
                document.write('FICHA: ' + ficha[0] + ' Jugador Automatico');
                document.write('<br>');
                var game = movimiento(0, 0, ficha, tam);
                var opc = prompt('Salida Y/N ');
                if (opc == 'y') {
                    break;
                }
            }

            if (game == true) {
                document.write('La jugada se realizó con exito');
                document.write('<br>');
            } else {
                document.write('La jugada no es valida');
                document.write('<br>');
                var ganadora = ganador(ficha[0], tam);
                if (ganadora != 'El jugador con la ficha: ' + ficha[0] + ' aun puede seguir jugando') {
                    document.write(ganadora);
                    document.write('<br>');
                    break;
                }
                document.write(ganadora);
                document.write('<br>');
            }

            if (ficha[0] == 1) {
                ficha[0] = 2;
                ficha[1] = true;
                ficha[2] = 2;
            } else {
                ficha[0] = 1;
                ficha[1] = false;
                ficha[2] = 0;
            }

            document.write('<br>');
        }
		/*
		Funcion para crear el tablero
		Ej:
		Si tamaño = 4
		entonces 
		0 0 0 0
		0 1 2 0
		0 2 1 0 
		0 0 0 0
		*/
        function crearTablero(tam) {
            matriz = new Array(tam);
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
        }
		/*
		Funcion para imprimir el tablero cada vez que se haga una modificacion a este
		Se debe sustituir en frontend
		*/
        function imprimir(tam) {
            document.write('P ' + '0' + '  ' + '1' + '  ' + '2' + '  ' + '3' + '  ' + '<br>');
            for (f = 0; f < tam; f++) {
                document.write(f + '  ');

                for (c = 0; c < tam; c++) {
                    document.write(matriz[f][c] + '  ');
                }
                document.write('<br>');
            }
            return;
		}
		
		/*
		Funcion para cada vez que un jugador desea realizar un movimiento o jugada
		1) Si es un jugador automatico verifica la jugada dependiendo de su dificultad
		2) Si es un jugador normal verifica si se puede hacer la jugada
		*/

        function movimiento(fila, columna, ficha, tam) {
            if (fila > tam || columna > tam) {
                return false;
            }
            if (ficha[1] == true) {
                jugada = jugadorAutomatico(ficha[0], tam, ficha[2]);
                if (jugada == true) {
                    alert('Jugador Automatico ha echo la jugada');
                    return true;
                }
            }

            if (matriz[fila][columna] == 0) {
                jugada = movFichaVerifica(fila, columna, ficha[0], tam);

                if (jugada == true) {
                    matriz[fila][columna] = ficha[0];
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

		/*
		Funcion para verificar el movimiento de la ficha del jugador normal
		Debido a que verificar si el movimiento es valido consta de 8 direcciones 
		entonces se llaman 8 metodos con su respectivas direcciones:
		NO N NE
		 0 .  E
		SO S SE
		en donde el punto es la direccion de la jugada respecto a una fila columna
		*/
        function movFichaVerifica(fila, columna, ficha, tam) {
            var fichaC;
            var posible = false;
            var verifica = false;
            var v1 = false;
            var v2 = false;
            var v3 = false;
            var v4 = false;
            var v5 = false;
            var v6 = false;
            var v7 = false;
            var v8 = false;

            if (ficha == 1) {
                fichaC = 2;
            } else {
                fichaC = 1;
            }

            if ((fila != 0) & (columna != 0)) {
                v1 = noroeste(fila - 1, columna - 1, ficha, fichaC, false, tam - 1);
            }

            if (fila != 0) {
                v2 = norte(fila - 1, columna, ficha, fichaC, false, tam - 1);
            }

            if ((fila != 0) & (columna != tam - 1)) {
                v3 = noreste(fila - 1, columna + 1, ficha, fichaC, false, tam - 1);
            }

            if (columna != 0) {
                v4 = oeste(fila, columna - 1, ficha, fichaC, false, tam - 1);
            }

            if (columna != tam - 1) {
                v5 = este(fila, columna + 1, ficha, fichaC, false, tam - 1);
            }

            if ((fila != tam - 1) & (columna != 0)) {
                v6 = suroeste(fila + 1, columna - 1, ficha, fichaC, false, tam - 1);
            }
            if (fila != tam - 1) {
                v7 = sur(fila + 1, columna, ficha, fichaC, false, tam - 1);
            }

            if ((fila != tam - 1) & (columna != tam - 1)) {
                v8 = sureste(fila + 1, columna + 1, ficha, fichaC, false, tam - 1);
            }

            if (v1 == true || v2 == true || v3 == true || v4 == true || v5 == true || v6 == true || v7 == true || v8 == true) {
                verifica = true;
            }
            return verifica;
		}
		
		/*
		Verifica si el movimiento noroeste esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function noroeste(f, c, ficha, fichaC, verifica, tam) {
            if (matriz[f][c] == fichaC) {
                while ((matriz[f][c] == fichaC) & (f > 0) & (c > 0)) {
                    f--;
                    c--;
                }

                if (matriz[f][c] == ficha) {
                    f++;
                    c++;
                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        f++;
                        c++;
                    }
                }
            }
            return verifica;
		}
		/*
		Verifica si el movimiento norte esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function norte(f, c, ficha, fichaC, verifica, tam) {
            if (matriz[f][c] == fichaC) {
                while ((matriz[f][c] == fichaC) & (f > 0)) {
                    f--;
                }

                if (matriz[f][c] == ficha) {
                    f++;

                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        f++;
                    }
                }
            }
            return verifica;
		}

		/*
		Verifica si el movimiento noreste esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function noreste(f, c, ficha, fichaC, verifica, tam) {
            if ((matriz[f][c] == fichaC) & (f > 0) & (c < tam)) {
                while (matriz[f][c] == fichaC) {
                    f--;
                    c++;
                }

                if (matriz[f][c] == ficha) {
                    f++;
                    c--;

                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        f++;
                        c--;
                    }
                }
            }
            return verifica;
		}
		
		/*
		Verifica si el movimiento oeste esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function oeste(f, c, ficha, fichaC, verifica, tam) {
            if ((matriz[f][c] == fichaC) & (c > 0)) {
                while (matriz[f][c] == fichaC) {
                    c--;
                }

                if (matriz[f][c] == ficha) {
                    c++;
                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        c++;
                    }
                }
            }
            return verifica;
		}
		
		/*
		Verifica si el movimiento este esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function este(f, c, ficha, fichaC, verifica, tam) {
            if ((matriz[f][c] == fichaC) & (c < tam)) {
                while (matriz[f][c] == fichaC) {
                    c++;
                }
                if (matriz[f][c] == ficha) {
                    c--;
                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        c--;
                    }
                }
            }
            return verifica;
		}

		/*
		Verifica si el movimiento suroeste esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function suroeste(f, c, ficha, fichaC, verifica, tam) {
            if (matriz[f][c] == fichaC) {
                while ((matriz[f][c] == fichaC) & (f < tam) & (c > 0)) {
                    f++;
                    c--;
                }

                if (matriz[f][c] == ficha) {
                    f--;
                    c++;
                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        f--;
                        c++;
                    }
                }
            }
            return verifica;
		}
		
		/*
		Verifica si el movimiento sur esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function sur(f, c, ficha, fichaC, verifica, tam) {
            if (matriz[f][c] == fichaC) {
                while ((matriz[f][c] == fichaC) & (f < tam)) {
                    f++;
                }
                if (matriz[f][c] == ficha) {
                    f--;
                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        f--;
                    }
                }
            }
            return verifica;
		}
		
		/*
		Verifica si el movimiento sureste esta permitido 
		Retorna true o false dependiendo si esta o no  esta
		*/

        function sureste(f, c, ficha, fichaC, verifica, tam) {
            if (matriz[f][c] == fichaC) {
                while ((matriz[f][c] == fichaC) & (f < tam) & (c < tam)) {
                    f++;
                    c++;
                }

                if (matriz[f][c] == ficha) {
                    f--;
                    c--;
                    while (matriz[f][c] == fichaC) {
                        matriz[f][c] = ficha;
                        verifica = true;
                        f--;
                        c--;
                    }
                }
            }
            return verifica;
        }

		/*
		Cada vez que se realizar una jugada verificar si ya existe un ganador
		Si la ficha le quedan movimientos entonces aun puede seguir jugando sino define el ganador
		Este metodo llama a otro para ver si esta definido el ganador
		*/

        function ganador(ficha, tam) {
            var a = 0,
                b = 0;
            var mov = false;

            for (f = 0; f < tam; f++) {
                for (c = 0; c < tam; c++) {
                    if (matriz[f][c] == 0) {
                        mov = defGanador(f, c, ficha, tam - 1);
                    } else if (matriz[f][c] == 1) {
                        a++;
                    } else if (matriz[f][c] == 2) {
                        b++;
                    }
                    if (mov == true) {
                        return 'El jugador con la ficha: ' + ficha + ' aun puede seguir jugando';
                    }
                }
            }
            if (a > b) {
                return (
                    'El ganador es el jugador con ficha 1 ' +
                    '\n' +
                    'La puntuacion es: ' +
                    '\n' +
                    'Ficha 1: ' +
                    a +
                    ' Ficha 2: ' +
                    b
                );
            } else if (a < b) {
                return (
                    'El ganador es el jugador con ficha 2 ' +
                    '\n' +
                    'La puntuacion es: ' +
                    '\n' +
                    'Ficha 1: ' +
                    a +
                    ' Ficha 2: ' +
                    b
                );
            } else {
                return 'Empate ' + '\n' + 'La puntuacion es: ' + '\n' + 'Ficha 1: ' + a + ' Ficha 2: ' + b;
            }
        }
		/*
		Metodo que retorna true o false para ver si ya existe un ganador
		*/
        function defGanador(fila, columna, ficha, tam) {
            var f = fila;
            var c = columna;
            var fichaC;
            var verifica = false;

            if (ficha == 1) {
                fichaC = 2;
            } else {
                fichaC = 1;
            }

            if ((f != 0) & (c != 0)) {
                f--;
                c--;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f > 0) & (c > 0)) {
                        f--;
                        c--;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }

            f = fila;
            c = columna;

            if (f != 0) {
                f--;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f > 0)) {
                        f--;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }
            f = fila;
            c = columna;

            if ((f != 0) & (c != tam)) {
                f--;
                c++;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f > 0) & (c < tam)) {
                        f--;
                        c++;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }
            f = fila;
            c = columna;

            if (c != 0) {
                c--;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (c > 0)) {
                        c--;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }

            f = fila;
            c = columna;

            if (c != tam) {
                c++;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (c < tam)) {
                        c++;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }
            f = fila;
            c = columna;

            if ((f != tam) & (c != 0)) {
                f++;
                c--;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f < tam) & (c > 0)) {
                        f++;
                        c--;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }

            f = fila;
            c = columna;

            if (f != tam) {
                f++;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f < tam)) {
                        f++;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }

            f = fila;
            c = columna;

            if ((f != tam) & (c != tam)) {
                f++;
                c++;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f < tam) & (c < tam)) {
                        f++;
                        c++;
                    }

                    if (matriz[f][c] == ficha) {
                        verifica = true;
                        return verifica;
                    }
                }
            }

            return verifica;
        }

		/*
		Metodo que hace la jugada del jugador automatico dependiendo de su dificultad
		Llama a otro metodo para definir la jugada y retorna un contador de jugada 
		Ej: Dificultad:
		1) Hace la jugada con el menor puntaje
		2) Hace la jugada con puntajes intermedios
		3) Hace la jugada con el mejor puntaje
		*/
        function jugadorAutomatico(ficha, tam, dificultad) {
            var fichaC;
            var a = 0,
                b = 0;
            var contJugadaFinal = 0;
            var contJugada = 0;
            var fila = 0,
                columna = 0;
            var random = 0;

            if (ficha == 1) {
                fichaC = 2;
            } else {
                fichaC = 1;
            }

            for (f = 0; f < tam; f++) {
                for (c = 0; c < tam; c++) {
                    if (matriz[f][c] == 0) {
                        contJugada = defjugadaAutomatica(f, c, ficha, tam - 1);
                        random = Math.floor(Math.random() * 3) + 1;

                        if (dificultad == 1) {
                            if ((contJugada != 0) & (contJugada <= contJugadaFinal)) {
                                if (contJugadaFinal == 0) {
                                    ontJugadaFinal = contJugada;
                                    fila = f;
                                    columna = c;
                                } else {
                                    if (random == 1) {
                                        contJugadaFinal = contJugada;
                                        fila = f;
                                        columna = c;
                                    }
                                }
                            }
                        }

                        if (dificultad == 2) {
                            if (contJugada != 0) {
                                if (contJugadaFinal == 0) {
                                    ontJugadaFinal = contJugada;
                                    fila = f;
                                    columna = c;
                                } else {
                                    if (random == 1) {
                                        contJugadaFinal = contJugada;
                                        fila = f;
                                        columna = c;
                                    }
                                }
                            }
                        }

                        if (dificultad == 3) {
                            if ((contJugada != 0) & (contJugada >= contJugadaFinal)) {
                                if (contJugadaFinal == 0) {
                                    contJugadaFinal = contJugada;
                                    fila = f;
                                    columna = c;
                                } else {
                                    if (random == 1) {
                                        contJugadaFinal = contJugada;
                                        fila = f;
                                        columna = c;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if ((fila == 0) & (columna == 0) & (matriz[fila][columna] != 0)) {
                return false;
            }
            jugada = movFichaVerifica(fila, columna, ficha, tam);

            if (jugada == true) {
                matriz[fila][columna] = ficha;
                return true;
            } else {
                return false;
            }
		}
		/*
		Funcion la cual revisa todas las jugadas posibles y retorna un contador de la jugada
		*/
        function defjugadaAutomatica(fila, columna, ficha, tam) {
            var f = fila;
            var c = columna;
            var fichaC;
            var contPuntos = 0;
            var contJugada = 0;

            if (ficha == 1) {
                fichaC = 2;
            } else {
                fichaC = 1;
            }

            if ((f != 0) & (c != 0)) {
                f--;
                c--;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f > 0) & (c > 0)) {
                        f--;
                        c--;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }

            f = fila;
            c = columna;

            if (f != 0) {
                f--;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f > 0)) {
                        f--;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }
            f = fila;
            c = columna;

            if ((f != 0) & (c != tam)) {
                f--;
                c++;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f > 0) & (c < tam)) {
                        f--;
                        c++;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }
            f = fila;
            c = columna;

            if (c != 0) {
                c--;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (c > 0)) {
                        c--;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }

            f = fila;
            c = columna;

            if (c != tam) {
                c++;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (c < tam)) {
                        c++;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }
            f = fila;
            c = columna;

            if ((f != tam) & (c != 0)) {
                f++;
                c--;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f < tam) & (c > 0)) {
                        f++;
                        c--;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }

            f = fila;
            c = columna;

            if (f != tam) {
                f++;

                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f < tam)) {
                        f++;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }

            f = fila;
            c = columna;

            if ((f != tam) & (c != tam)) {
                f++;
                c++;
                if (matriz[f][c] == fichaC) {
                    while ((matriz[f][c] == fichaC) & (f < tam) & (c < tam)) {
                        f++;
                        c++;
                        contPuntos++;
                    }

                    if (matriz[f][c] == ficha) {
                        contPuntos++;
                        contJugada += contPuntos;
                        contPuntos = 0;
                    } else {
                        contPuntos = 0;
                    }
                }
            }

            return contJugada;
        }
