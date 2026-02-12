const inst = Vue.createApp({
    data() {
        return {
            busqueda: '',
            filtroAdquisicion: '',
            filtroLimpieza: '',
            mensaje: '',
            seleccionados: [], // Lista de objetos marcados
            inventario: [
                { 
                    nombre: "Death Note", 
                    serie: "Death Note",
                    imagen: "images/deathNote.jpg",
                    fechaAdquisicion: new Date(2006, 9, 3), 
                    nivel: "Extremo", 
                    ultimaLimpieza: new Date(2025, 10, 1) 
                },
                { 
                    nombre: "Dedo de Sukuna", 
                    serie: "Jujutsu Kaisen",
                    imagen: "images/sukuna.jpg",
                    fechaAdquisicion: new Date(2020, 2, 15), 
                    nivel: "Especial", 
                    ultimaLimpieza: new Date(2025, 11, 20) 
                },
                { 
                    nombre: "Tessaiga (Colmillo de Acero)", 
                    serie: "Inuyasha",
                    imagen: "images/tessaiga.jpg",
                    fechaAdquisicion: new Date(2000, 4, 12), 
                    nivel: "Medio", 
                    ultimaLimpieza: new Date(2024, 5, 10) 
                },
                { 
                    nombre: "Behelit (Huevo del Rey)", 
                    serie: "Berserk",
                    imagen: "images/behelit.jpg",
                    fechaAdquisicion: new Date(1997, 1, 1), 
                    nivel: "Maldito", 
                    ultimaLimpieza: new Date(2024, 1, 1) 
                },
                { 
                    nombre: "Diario del Observador", 
                    serie: "Mirai Nikki",
                    imagen: "images/nikki.jpg",
                    fechaAdquisicion: new Date(2011, 9, 9), 
                    nivel: "Paradoja Temporal", 
                    ultimaLimpieza: new Date(2025, 5, 20) 
                },
                { 
                    nombre: "Esfera Dorada", 
                    serie: "Dandadan",
                    imagen: "images/oro.jpg", 
                    fechaAdquisicion: new Date(2024, 3, 15), 
                    nivel: "Energía Espiritual Masiva", 
                    ultimaLimpieza: new Date(2026, 0, 10)
                }
            ]
        }
    },
    methods: {
        resetFiltros() {
            this.busqueda = '';
            this.filtroAdquisicion = '';
            this.filtroLimpieza = '';
            this.seleccionados = [];
        },
        guardarEnLocal() {
            const datosParaGuardar = this.objetosFiltrados;
            const textoJSON = JSON.stringify(datosParaGuardar);
            localStorage.setItem("misObjetosMalditos", textoJSON);
            this.mensaje = "¡Filtros guardados en Local!";
            setTimeout(() => this.mensaje = '', 2000);
        },
        imprimirSeleccion() {
            if (this.seleccionados.length === 0) {
                alert("Selecciona al menos un objeto para imprimir");
                return;
            }

            // Guardamos la selección actual en LocalStorage antes de abrir la ventana
            localStorage.setItem("listaParaImprimir", JSON.stringify(this.seleccionados));

            // Abrir ventana nueva
            const win = window.open("", "_blank");

            // Recuperar datos para la ventana (usando JSON)
            const datos = JSON.parse(localStorage.getItem("listaParaImprimir"));

            // Diseño de la vista de impresión (Estilo Reporte Antiguo)
            let htmlImpresion = `
            <html>
            <head>
                <title>Reporte de Sellado</title>
                <style>
                    body { font-family: 'Courier New', serif; padding: 50px; background: #fdf6e3; color: #333; }
                    .reporte { border: 2px solid #5d4037; padding: 20px; border-radius: 5px; }
                    h1 { text-align: center; color: #8b0000; text-decoration: underline; }
                    .fecha { text-align: right; font-style: italic; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #5d4037; padding: 10px; text-align: left; }
                    th { background: #eee; }
                    .sello { margin-top: 50px; text-align: center; font-weight: bold; color: #8b0000; opacity: 0.6; font-size: 24px; transform: rotate(-5deg); }
                </style>
            </head>
            <body>
                <div class="reporte">
                    <h1>REPORTE OFICIAL DE OBJETOS MALDITOS</h1>
                    <p class="fecha">Fecha de Emisión: ${new Date().toLocaleDateString()}</p>
                    <p>Los siguientes objetos han sido seleccionados para su traslado y sellado:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre del Artefacto</th>
                                <th>Serie de Origen</th>
                                <th>Nivel de Peligro</th>
                            </tr>
                        </thead>
                        <tbody>`;
            
            datos.forEach(obj => {
                htmlImpresion += `
                            <tr>
                                <td>${obj.nombre}</td>
                                <td>${obj.serie}</td>
                                <td>${obj.nivel}</td>
                            </tr>`;
            });

            htmlImpresion += `
                        </tbody>
                    </table>
                    <div class="sello">CONFIDENCIAL - DEPARTAMENTO DE HECHICERÍA</div>
                </div>
                <script>window.print();<\/script>
            </body>
            </html>`;

            win.document.write(htmlImpresion);
            win.document.close();
        }
    },
    computed: {
       objetosFiltrados() {
            let haceUnAño = new Date();
            haceUnAño.setFullYear(haceUnAño.getFullYear() - 1);

            return this.inventario.filter(obj => {
                const esReciente = obj.ultimaLimpieza > haceUnAño;
                const coincideNombre = obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());

                let coincideAdquisicion = true;
                if (this.filtroAdquisicion) {
                    const fechaSeleccionada = new Date(this.filtroAdquisicion);
                    coincideAdquisicion = obj.fechaAdquisicion >= fechaSeleccionada;
                }

                let coincideLimpiezaManual = true;
                if (this.filtroLimpieza) {
                    const fechaLimpiezaSel = new Date(this.filtroLimpieza);
                    coincideLimpiezaManual = obj.ultimaLimpieza >= fechaLimpiezaSel;
                }

                return esReciente && coincideNombre && coincideAdquisicion && coincideLimpiezaManual;
            }).sort((a, b) => a.fechaAdquisicion - b.fechaAdquisicion);
        }
    }
});
const app = inst.mount("#app")
