const inst = Vue.createApp({
    data() {
        return {
            busqueda: '',
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
    computed: {
        objetosFiltrados() {
            //toma todo el año actual y resta un año, si un año es menor a 2025, el articulo esta muy sucio espiritualmente
            let haceUnAño = new Date();
            haceUnAño.setFullYear(haceUnAño.getFullYear() - 1);

            // Filtro de limpieza y búsqueda
            let resultado = this.inventario.filter(obj => {
                //Comprueba si la fecha de limpieza del objeto ocurrió después de la fecha que se calcula
                const esReciente = obj.ultimaLimpieza > haceUnAño;
                //Si se ecribe "De", entonces coincide con "Death Note" y "Dedo de Sukuna"
                const coincide = obj.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
                return esReciente && coincide;
            });

            // Ordena de lo más antiguo a lo más reciente
            return resultado.sort((a, b) => a.fechaAdquisicion - b.fechaAdquisicion);
        }
    }
});
const app = inst.mount("#app")