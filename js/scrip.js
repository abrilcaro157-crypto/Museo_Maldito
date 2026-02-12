const inst = Vue.createApp({
    data() {
        return {
            busqueda: '',
            filtroAdquisicion: '',
            filtroLimpieza: '',
            mensaje: '',
            seleccionados: [], // Array para la nueva funcionalidad
            inventario: [
                { nombre: "Death Note", serie: "Death Note", imagen: "images/deathNote.jpg", fechaAdquisicion: new Date(2006, 9, 3), nivel: "Extremo", ultimaLimpieza: new Date(2025, 10, 1) },
                { nombre: "Dedo de Sukuna", serie: "Jujutsu Kaisen", imagen: "images/sukuna.jpg", fechaAdquisicion: new Date(2020, 2, 15), nivel: "Especial", ultimaLimpieza: new Date(2025, 11, 20) },
                { nombre: "Tessaiga (Colmillo de Acero)", serie: "Inuyasha", imagen: "images/tessaiga.jpg", fechaAdquisicion: new Date(2000, 4, 12), nivel: "Medio", ultimaLimpieza: new Date(2024, 5, 10) },
                { nombre: "Behelit (Huevo del Rey)", serie: "Berserk", imagen: "images/behelit.jpg", fechaAdquisicion: new Date(1997, 1, 1), nivel: "Maldito", ultimaLimpieza: new Date(2024, 1, 1) },
                { nombre: "Diario del Observador", serie: "Mirai Nikki", imagen: "images/nikki.jpg", fechaAdquisicion: new Date(2011, 9, 9), nivel: "Paradoja Temporal", ultimaLimpieza: new Date(2025, 5, 20) },
                { nombre: "Esfera Dorada", serie: "Dandadan", imagen: "images/oro.jpg", fechaAdquisicion: new Date(2024, 3, 15), nivel: "Energía Espiritual Masiva", ultimaLimpieza: new Date(2026, 0, 10) }
            ]
        }
    },
    methods: {
        resetFiltros() {
            this.busqueda = '';
            this.filtroAdquisicion = '';
            this.filtroLimpieza = '';
        },
        seleccionarObjeto(objeto) {
            const index = this.seleccionados.findIndex(o => o.nombre === objeto.nombre);
            if (index === -1) {
                this.seleccionados.push(objeto);
            } else {
                this.seleccionados.splice(index, 1);
            }
        },
        generarReporte() {
            if (this.seleccionados.length === 0) {
                alert("Selecciona al menos un artefacto para el reporte.");
                return;
            }

            localStorage.setItem("misObjetosMalditos", JSON.stringify(this.seleccionados));
            const ventana = window.open("", "_blank");
            const datos = JSON.parse(localStorage.getItem("misObjetosMalditos"));

            ventana.document.write(`
                <html>
                <head>
                    <title>Reporte de Artefactos Malditos</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
                    <style>
                        body { background: #1a1a1a; color: #eee; }
                        table { border-color: #444; }
                        .table { color: #eee; }
                    </style>
                </head>
                <body onload="window.print()" class="container mt-4">
                    <h2 class="text-center mb-4">REGISTRO DE ARTEFACTOS SELLADOS</h2>
                    <table class="table table-dark table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Serie</th>
                                <th>Nivel de Amenaza</th>
                                <th>Última Limpieza</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${datos.map(o => `
                                <tr>
                                    <td>${o.nombre}</td>
                                    <td>${o.serie}</td>
                                    <td>${o.nivel}</td>
                                    <td>${new Date(o.ultimaLimpieza).toLocaleDateString()}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </body>
                </html>
            `);
            ventana.document.close();
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
                    coincideAdquisicion = obj.fechaAdquisicion >= new Date(this.filtroAdquisicion);
                }

                let coincideLimpiezaManual = true;
                if (this.filtroLimpieza) {
                    coincideLimpiezaManual = obj.ultimaLimpieza >= new Date(this.filtroLimpieza);
                }

                return esReciente && coincideNombre && coincideAdquisicion && coincideLimpiezaManual;
            }).sort((a, b) => a.fechaAdquisicion - b.fechaAdquisicion);
        }
    }
});
app = inst.mount("#app");
