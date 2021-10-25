// Url
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const public = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';

const articulosUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/articulos/usuario/'
    : 'https://blogi-node.herokuapp.com/api/articulos/usuario/';


// Referencias HTML
const body = document.querySelector('body')
const login = document.querySelector('.login');

const irARegister = document.querySelector('.irARegister');

const blog = document.querySelector('.blog');
const spinner = document.querySelector('.spinner');

const userAccount = document.querySelector('.userAccount');
const userImg = document.querySelector('.userImg');
const userImgAccount = document.querySelector('.userImgAccount');
const nombre = document.querySelector('.nombre');
const correo = document.querySelector('.correo');
const cerrarSesion = document.querySelector('.cerrarSesion');

const blogsTitles = document.querySelector('.blogsTitles');
const tusBlogs = document.querySelector('.tusBlogs');
const menuBlog = document.querySelector('.menuBlog');
const menuDoor = document.querySelector('.menuDoor');
const itemsBlog = document.querySelectorAll('.itemBlog');
const close = document.querySelector('.close');

const resultadosDeMenu = document.querySelector('.resultadosDeMenu');
const articulosResultados = document.querySelector('.articulosResultados');
const noHay = document.querySelector('.noHay');

// Verificar si está logueado y personalizar Navbar
blog.classList.add('hidden')
spinner.classList.remove('hidden');

const token = localStorage.getItem('token');

const darChanceDeIrse = () => {
    login.classList.remove('hidden');
    irARegister.href = public + 'auth.html';
    setTimeout(() => {
        window.location.href = public + 'auth.html';
    }, 10000);
}

// Función para cambiar de Inglés a Español
const diasEspañol = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
];

const mesesEspañol = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

const cambiarAEspañolDia = (dia) => {

    let diaBueno = '';

    if (dia === 'Mon') {
        diaBueno = diasEspañol[0];
    } else if (dia === 'Tue') {
        diaBueno = diasEspañol[1]
    } else if (dia === 'Wen') {
        diaBueno = diasEspañol[2]
    } else if (dia === 'Thu') {
        diaBueno = diasEspañol[3]
    } else if (dia === 'Fri') {
        diaBueno = diasEspañol[4]
    } else if (dia === 'Sat') {
        diaBueno = diasEspañol[5]
    } else if (dia === 'Sun') {
        diaBueno = diasEspañol[6]
    }

    return diaBueno;
}

const cambiarAEspañolMes = (mes) => {

    let mesBueno = '';

    if (mes === 'Jan') {
        mesBueno = mesesEspañol[0];
    } else if (mes === 'Feb') {
        mesBueno = mesesEspañol[1]
    } else if (mes === 'Mar') {
        mesBueno = mesesEspañol[2]
    } else if (mes === 'Apr') {
        mesBueno = mesesEspañol[3]
    } else if (mes === 'May') {
        mesBueno = mesesEspañol[4]
    } else if (mes === 'Jun') {
        mesBueno = mesesEspañol[5]
    } else if (mes === 'Jul') {
        mesBueno = mesesEspañol[6]
    } else if (mes === 'Aug') {
        mesBueno = mesesEspañol[7]
    } else if (mes === 'Sep') {
        mesBueno = mesesEspañol[8]
    } else if (mes === 'Oct') {
        mesBueno = mesesEspañol[9]
    } else if (mes === 'Nov') {
        mesBueno = mesesEspañol[10]
    } else if (mes === 'Dec') {
        mesBueno = mesesEspañol[11]
    }

    return mesBueno;
}

window.addEventListener('load', () => {
    fetch(url, {
        method: 'GET',
        headers: { 'x-token': token }
    })
        .then(resp => resp.json())
        .then(({ msg, usuario }) => {
            if (msg !== 'Token válido') {
                darChanceDeIrse();
            }

            const idDeUsuario = usuario.uid;

            // Personalizar Navbar
            userImg.src = usuario.img;
            userImgAccount.src = usuario.img;
            nombre.innerText = usuario.nombre;
            correo.innerText = usuario.correo;

            fetch(articulosUrl + idDeUsuario, {
                method: 'GET'
            })
                .then(resp => resp.json())
                .then(articulo => {
                    if (articulo === []) {
                        noHay.classList.remove('hidden')
                    } else {
                        articulo.forEach(a => {

                            // Se crea el string para la fecha
                            const fechaMal = a.creadoEn.split(' ');
                            const arrayBuena = fechaMal.splice(0, 4);

                            const dia = cambiarAEspañolDia(arrayBuena[0]);
                            const mes = cambiarAEspañolMes(arrayBuena[1]);

                            let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                            const html = `
                                <div class="articuloMini">
                                    <div class="topArticle">
                                        <img src="${a.img}" alt="Imagen de articulo" class="imgArticle">
                                        <div class="articleText">
                                            <span class="titleArticle">${a.titulo}</span>
                                            <span class="descArticle">${a.contenido}</span>
                                        </div>
                                    </div>
                                    <span class="fechaArticle">${fecha}</span>
                                    <div class="buttons">
                                        <button class="btn btn-primary">Ver artículo</button>
                                        <button class="btn btn-warning">Editar artículo</button>
                                        <button class="btn btn-success">Compartir artículo</button>
                                        <button class="btn btn-danger">Borrar artículo</button>
                                    </div>
                                </div>
                            `;

                            articulosResultados.innerHTML += html;
                        })
                    }


                })
                .catch(console.error)

        })
        .catch(err => {
            darChanceDeIrse();
        })
        .finally(() => {
            blog.classList.remove('hidden')
            spinner.classList.add('hidden');
        })
})

// Menú responsive
if (window.innerWidth <= 950) {
    menuDoor.addEventListener('click', () => {
        menuBlog.classList.remove('hidden');
        menuBlog.classList.add('responsive');
        menuBlog.classList.remove('animate__bounceOutLeft');
    })

    close.addEventListener('click', () => {
        menuBlog.classList.add('animate__bounceOutLeft');
        menuBlog.classList.add('hidden');
    })
} else {
    menuDoor.addEventListener('click', () => {
        menuBlog.classList.toggle('animate__bounceOutLeft');
        setTimeout(() => {
            menuBlog.classList.toggle('hidden');
            resultadosDeMenu.classList.toggle('wC');
        }, 500);
    })
}

// Abrir cuadro de usuario
userImg.addEventListener('click', () => {
    userAccount.classList.toggle('hidden');
});

// Cerrar sesión
cerrarSesion.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location = public + '/index.html'
})

// Ver todos los blogs
blogsTitles.addEventListener('click', () => {
    tusBlogs.classList.toggle('hidden')
})

// Poner color a un elemento clickeado del menú e ir a ese elemento
for (let i = 0; i < itemsBlog.length; i++) {
    itemsBlog[i].onclick = (e) => {

        const irA = e.path[0].title;

        window.location.href = public + `blog/${irA}/`;

        let j = 0;
        while (j < itemsBlog.length) {
            itemsBlog[j++].className = 'itemBlog';
        }
        itemsBlog[i].className = 'itemBlog active';
    }
}