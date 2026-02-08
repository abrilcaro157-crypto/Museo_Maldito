const inst = Vue.createApp({
    data() {
        return {
            busqueda: '',
            filtroAdquisicion: '',
            filtroLimpieza: '',
            mensaje: '',
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
                    ultimaLimpieza: new Date(2024, 1, 1) // No saldrá (más de 1 año del actual)
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
                    imagen: "images/oro.jpg", // Asegúrate de tener una imagen válida
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
        },
        guardarEnLocal() {
            // se toman los objetos que aparecen en pantalla
            const datosParaGuardar = this.objetosFiltrados;

            // convierte el array a un "String" de texto
            const textoJSON = JSON.stringify(datosParaGuardar);

            // lo guarda con una "etiqueta" o llave
            localStorage.setItem("misObjetosMalditos", textoJSON);
        }
    },
    computed: {
       objetosFiltrados() {
            let haceUnAño = new Date();
            haceUnAño.setFullYear(haceUnAño.getFullYear() - 1);

            return this.inventario.filter(obj => {
                // limpieza menor a un año
                const esReciente = obj.ultimaLimpieza > haceUnAño;

                // búsqueda por nombre
                const coincideNombre = obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());

                // fecha de fdquisición
                let coincideAdquisicion = true;
                if (this.filtroAdquisicion) {
                    const fechaSeleccionada = new Date(this.filtroAdquisicion);
                    coincideAdquisicion = obj.fechaAdquisicion >= fechaSeleccionada;
                }

                // fecha de ultima limpieza
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