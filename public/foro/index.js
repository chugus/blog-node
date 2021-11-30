// Url's
const uploadIMG = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/uploads/'
    : 'https://blogi-node.herokuapp.com/api/uploads/';

const validarJwt = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/validar-jwt/'
    : 'https://blogi-node.herokuapp.com/api/validar-jwt/';

const comentariosUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/comentarios/'
    : 'https://blogi-node.herokuapp.com/api/comentarios/';

const usuariosUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/usuarios/'
    : 'https://blogi-node.herokuapp.com/api/usuarios/';

const categoriasUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/categorias/'
    : 'https://blogi-node.herokuapp.com/api/categorias/';

const discusionesUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/discusiones/'
    : 'https://blogi-node.herokuapp.com/api/discusiones/';

const publicUrl = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/'
    : 'https://blogi-node.herokuapp.com/';

const usuariosPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/posts/blog.html?id='
    : 'https://blogi-node.herokuapp.com/posts/blog.html?id=';

const discusionesPublic = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:5500/public/foro/?c='
    : 'https://blogi-node.herokuapp.com/foro/?c=';

// Variables
const body = document.querySelector('body');
const spinner = document.querySelector('.spinner');
const navBar = document.querySelector('.navBar');
const foro = document.querySelector('.foro');
const discusion = document.querySelector('.discusion');
const descripcionTextarea = document.querySelector('.description');
const urlWindow = document.querySelector('.urlWindow');
const imgWindow = document.querySelector('.imgWindow');
const urlImg = document.querySelector('.urlImg');
const fileImg = document.querySelector('.fileImg');
const imgMala = document.querySelector('.imgMala');
const imgMalaBtn = document.querySelector('.imgMalaBtn');
const crearBlog = document.querySelector('.crearBlog');
const nuevaDiscusion = document.querySelector('.nuevaDiscusion');
const noRegister = document.querySelector('.noRegister');
const redirigir = document.querySelector('.redirigir');
const noRedirigir = document.querySelector('.noRedirigir');

let autenticado = true;

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

// Modo oscuro
const checkbox = document.querySelector('#check');

checkbox.addEventListener('change', () => {
    body.classList.toggle('dark');
    navBar.classList.toggle('dark');
    foro.classList.toggle('dark');
})

// Menú responsive
const toggle = document.querySelector('.toggle');
const enlaces = document.querySelector('#enlaces');

toggle.addEventListener('click', () => {
    enlaces.classList.toggle('active');
    toggle.classList.toggle('active');
})

// Btns Flotantes
const abrirIconos = document.querySelector('.abrirIconos');
const btnsFlotantes = document.querySelector('.btnsFlotantes');
const chatbot = document.querySelector('.chatbot');

abrirIconos.addEventListener('click', () => {
    btnsFlotantes.classList.toggle('hidden');
    btnsFlotantes.classList.toggle('animate__bounceInRight');
    chatbot.classList.toggle('hidden');
    chatbot.classList.toggle('animate__bounceInRight');

    abrirIconos.classList.toggle('fa-ellipsis-h');
    abrirIconos.classList.toggle('fa-chevron-down');
    abrirIconos.classList.toggle('mover');
    abrirIconos.classList.toggle('animate__zoomInDown');
    abrirIconos.classList.toggle('animate__bounceInRight');
})

// Obtener token y verificarlo
const token = localStorage.getItem('token');

if (token === null) {
    nuevaDiscusion.classList.add('hidden');
    autenticado = false;
} else if (token !== null) {
    fetch(validarJwt, {
        method: 'GET',
        headers: { 'x-token': token }
    })
        .then(resp => resp.json())
        .then(({ msg }) => {
            if (msg !== 'Token válido') {
                nuevaDiscusion.classList.add('hidden');
                autenticado = false;
            } else {
                crearBlog.classList.toggle('hidden');
                autenticado = true;
            }
        })
        .catch(console.log)
}

// Mostrar categorías en el foro
fetch(categoriasUrl, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ categorias }) => {
        const ctgs = document.querySelector('.ctgs');

        categorias.forEach(c => {
            const html = `
                <li class="ctgLi" id="${c._id}">
                    <span>${c.nombre}</span>
                    <i class="fa fa-fighter-jet" aria-hidden="true"></i>
                </li>
            `;

            ctgs.innerHTML += html;

        })

        setTimeout(() => {
            const ctgsLi = document.querySelectorAll('.ctgLi');
            const ctgLi = [].slice.call(ctgsLi);

            ctgLi.forEach(c => {


                c.addEventListener('click', () => {

                    spinner.classList.toggle('hidden');

                    if (c.id === 'Todos') {
                        location.reload();
                    }

                    fetch(categoriasUrl + 'discusiones/' + c.id, {
                        method: 'GET'
                    })
                        .then(resp => resp.json())
                        .then(({ docs: discusiones }) => {

                            if (discusiones.length === 0) {
                                cadaUna.innerHTML = '';

                                const html = `
                                    <div class="noHay">
                                        <img src="../img/void.png">
                                        <p>Aún no hay discusiones en esta categoría</p>
                                    </div>
                                `;

                                cadaUna.innerHTML = html;
                            }

                            discusiones.forEach(discusion => {
                                fetch(usuariosUrl + discusion.autor[0], {
                                    method: 'GET'
                                })
                                    .then(resp => resp.json())
                                    .then(({ usuario }) => {
                                        cadaUna.innerHTML = '';

                                        // Se crea el string para la fecha
                                        const fechaMal = discusion.creadoEn.split(' ');
                                        const arrayBuena = fechaMal.splice(0, 4);

                                        const dia = cambiarAEspañolDia(arrayBuena[0]);
                                        const mes = cambiarAEspañolMes(arrayBuena[1]);

                                        let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                                        const contenidoCortado = discusion.textoParaTarjetas.slice(0, 110);

                                        const contenido = contenidoCortado + '...';

                                        const html = `
                                            <div id="${discusion._id}" class="reciente">
                                                <div class="left">
                                                    <a href="${usuariosPublic + usuario.uid}">
                                                        <img src="${usuario.img}" alt="Usuario que empezó la discusión">
                                                        <span id="nombre">${usuario.nombre}</span>
                                                    </a>
                                                </div>
                                                <div class="resto">
                                                    <span class="titulo">${discusion.titulo}</span>
                                                    <span class="contenido">${contenido}</span>
                                                    <div class="abajo">
                                                        <span class="fecha">${fecha}</span>
                                                        <span>Tema: <span class="ctg">${discusion.categoria[0].nombre}</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        `;

                                        cadaUna.innerHTML += html;
                                    })
                                    .catch(console.log)
                            })

                        })
                        .catch(console.log)
                        .finally(() => {
                            spinner.classList.toggle('hidden');
                        })
                })
            })
        }, 500);
    })
    .catch(console.log)

// Mostrar discusiones
const cadaUna = document.querySelector('.cadaUna');
const pagination = document.querySelector('.pagination');

const ponerDiscusiones = (discusiones) => {

    discusiones.forEach(discusion => {
        fetch(usuariosUrl + discusion.autor[0], {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(({ usuario }) => {

                // Se crea el string para la fecha
                const fechaMal = discusion.creadoEn.split(' ');
                const arrayBuena = fechaMal.splice(0, 4);

                const dia = cambiarAEspañolDia(arrayBuena[0]);
                const mes = cambiarAEspañolMes(arrayBuena[1]);

                let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                const contenidoCortado = discusion.textoParaTarjetas.slice(0, 110);

                const contenido = contenidoCortado + '...';

                const html = `
                    <div id="${discusion._id}" class="reciente">
                        <div class="left">
                            <a href="${usuariosPublic + usuario.uid}">
                                <img src="${usuario.img}" alt="Usuario que empezó la discusión">
                                <span id="nombre">${usuario.nombre}</span>
                            </a>
                        </div>
                        <div class="resto">
                            <span class="titulo">${discusion.titulo}</span>
                            <span class="contenido">${contenido}</span>
                            <div class="abajo">
                                <span class="fecha">${fecha}</span>
                                <span>Tema: <span class="ctg">${discusion.categoria[0].nombre}</span></span>
                            </div>
                        </div>
                    </div>
                `;

                cadaUna.innerHTML += html;

                setTimeout(() => {
                    const recientesUl = document.querySelectorAll('.reciente');

                    recientesUl.forEach(r => {
                        r.addEventListener('click', () => {
                            location.href = discusionesPublic + r.id;
                        })
                    })
                }, 500);
            })
            .catch(console.error)
    })
}

fetch(discusionesUrl, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ resp }) => {
        const discusiones = resp.docs;

        const ponerPaginacion = () => {

            const siguientes = resp.totalPages;

            for (let i = 0; i < siguientes; i++) {

                const myFunc = num => Number(num);

                const deste = Array.from(String(i), myFunc)

                deste.forEach(n => {
                    const html = `
                        <li class="page-item" style="margin-left: 10px;">
                            <span id="${n + 1}" class="page-link">${n + 1}</span>
                        </li>
                    `;

                    pagination.innerHTML += html;

                    setTimeout(() => {
                        const pageLinks = document.querySelectorAll('.page-link');
                        const pageLink = [].slice.call(pageLinks);

                        pageLink.forEach(p => {

                            p.addEventListener('click', () => {

                                setTimeout(() => {
                                    const paginaRequerida = p.id;

                                    fetch(discusionesUrl + 'page/', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ page: paginaRequerida })
                                    })
                                        .then(response => response.json())
                                        .then(({ resp }) => {
                                            ponerDiscusiones(resp.docs);
                                        })
                                        .catch(console.error)
                                }, 500);

                            })
                        })

                    }, 500);
                })
            }

        }

        ponerPaginacion();

        ponerDiscusiones(discusiones);
    })
    .catch(console.log)

// Mostrar discusiones por medio del buscador
const searchBtn = document.querySelector('.searchBtn');
const search = document.querySelector('#search');

searchBtn.addEventListener('click', () => {

    if (search.value === '') {
        location.reload();
    }

    fetch(discusionesUrl + 'buscador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ buscar: search.value })
    })
        .then(resp => resp.json())
        .then(discusiones => {
            cadaUna.innerHTML = '';
            ponerDiscusiones(discusiones);
        })
        .catch(console.log)
})

search.addEventListener('keypress', (e) => {
    if (e.charCode === 13) {
        if (search.value === '') {
            location.reload();
        }

        fetch(discusionesUrl + 'buscador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ buscar: search.value })
        })
            .then(resp => resp.json())
            .then(discusiones => {
                cadaUna.innerHTML = '';
                ponerDiscusiones(discusiones);
            })
            .catch(console.log)
    }
})

// Mostrar discusion si hay id
const params = new URLSearchParams(location.search);
const idDiscusion = params.get('c');
const titulo = document.querySelector('.titulo');
const contenido = document.querySelector('.contenido');
const verDiscusion = document.querySelector('.verDiscusion');
const comments = document.querySelector('.comments');

const imgDePerfil = document.querySelector('#imgDePerfil');
const nombreDeAutor = document.querySelector('#nombreDeAutor');
const correoDeAutor = document.querySelector('#correoDeAutor');
const articulosDeAutor = document.querySelector('#articulosDeAutor');

if (idDiscusion !== null) {
    fetch(discusionesUrl + idDiscusion, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(({ resp }) => {
            const discusion = resp[0];
            const regresarAlForo = document.querySelector('.regresarAlForo');

            foro.classList.toggle('hidden');
            verDiscusion.classList.toggle('hidden');

            titulo.innerHTML = discusion.titulo;
            contenido.innerHTML = discusion.contenido;

            regresarAlForo.classList.toggle('hidden');

            fetch(usuariosUrl + discusion.autor[0].uid, {
                method: 'GET'
            })
                .then(resp => resp.json())
                .then(({ usuario, resp }) => {

                    imgDePerfil.src = usuario.img;
                    nombreDeAutor.innerHTML = usuario.nombre;
                    correoDeAutor.innerHTML = usuario.correo;
                    articulosDeAutor.innerHTML = resp.totalDocs;

                })
                .catch(console.log)

            // Mostrar comentarios de cierta discusión
            fetch(comentariosUrl + 'discusion/' + idDiscusion, {
                method: 'GET'
            })
                .then(resp => resp.json())
                .then(coments => {
                    coments.forEach(c => {

                        // Se crea el string para la fecha
                        const fechaMal = discusion.creadoEn.split(' ');
                        const arrayBuena = fechaMal.splice(0, 4);

                        const dia = cambiarAEspañolDia(arrayBuena[0]);
                        const mes = cambiarAEspañolMes(arrayBuena[1]);

                        let fecha = `${dia} ${arrayBuena[2]} de ${mes} de ${arrayBuena[3]}`;

                        const html = `
                            <div class="comment">
                                <div class="perfil">
                                    <img src="${c.autor[0].img}">
                                    <span class="nombre principal">${c.autor[0].nombre}</span>
                                </div>
                                <div class="contenido">${c.contenido}</div>
                                <span class="fecha principal">${fecha}</span>
                            </div>
                        `;

                        comments.innerHTML += html;
                    })
                })
                .catch(console.log)

            // Crear comentario
            const ponerComent = document.querySelector('.ponerComent');
            const descripcionComment = document.querySelector('.descripcionComment');
            const resultadoTextareaComment = document.querySelector('.resultadoTextareaComment');

            const funcionesParaArticulosComment = () => {

                const mirror2 = () => {

                    const arrTextarea = descripcionComment.value.split('\n');
                    const arrResult = [];

                    arrTextarea.forEach(t => {
                        const parrafo2 = document.createElement('p');
                        parrafo2.innerHTML = t;

                        arrResult.push(parrafo2.innerHTML);
                        setTimeout(() => {
                            resultadoTextareaComment.innerHTML = arrResult.join('<br>');
                        }, 100)
                    })
                }

                descripcionComment.addEventListener('keydown', mirror2)

                // Negrita, subrayado, cursiva
                const negrita = document.querySelector('.negritaComment');
                const subrayado = document.querySelector('.subrayadoComment');
                const cursiva = document.querySelector('.cursivaComment');
                const imgBtnComment = document.querySelector('.imgBtnComment');
                const urlBtnComment = document.querySelector('.urlBtnComment');
                const ponerUrlImg = document.querySelector('.ponerUrlImg');
                const ponerFileImg = document.querySelector('.ponerFileImg');

                const etiquetaStrong = () => {
                    let desde = descripcionComment.selectionStart;
                    let hasta = descripcionComment.selectionEnd;
                    let elTexto = descripcionComment.value;

                    let sel = elTexto.substring(desde, hasta);

                    if (sel.length > 0) {// si hay algo seleccionado
                        descripcionComment.setRangeText(`<b>${sel}</b>`, desde, hasta, 'select');
                    }
                }

                const etiquetaSubrayado = () => {
                    let desde = descripcionComment.selectionStart;
                    let hasta = descripcionComment.selectionEnd;
                    let elTexto = descripcionComment.value;

                    let sel = elTexto.substring(desde, hasta);

                    if (sel.length > 0) {// si hay algo seleccionado
                        descripcionComment.setRangeText(`<u>${sel}</u>`, desde, hasta, 'select');
                    }
                }

                const etiquetaCursiva = () => {
                    let desde = descripcionComment.selectionStart;
                    let hasta = descripcionComment.selectionEnd;
                    let elTexto = descripcionComment.value;

                    let sel = elTexto.substring(desde, hasta);

                    if (sel.length > 0) {// si hay algo seleccionado
                        descripcionComment.setRangeText(`<i>${sel}</i>`, desde, hasta, 'select');
                    }
                }

                negrita.addEventListener("click", () => {
                    etiquetaStrong();
                });
                cursiva.addEventListener("click", () => {
                    etiquetaCursiva();
                });
                subrayado.addEventListener("click", () => {
                    etiquetaSubrayado();
                });

                const insertAtCaret = (areaId, text) => {
                    var txtarea = document.getElementById(areaId);
                    var scrollPos = txtarea.scrollTop;
                    var caretPos = txtarea.selectionStart;

                    var front = (txtarea.value).substring(0, caretPos);
                    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
                    txtarea.value = front + text + back;
                    caretPos = caretPos + text.length;
                    txtarea.selectionStart = caretPos;
                    txtarea.selectionEnd = caretPos;
                    txtarea.focus();
                    txtarea.scrollTop = scrollPos;
                }

                const urlFunction = () => {
                    const urlRequeridaComment = document.querySelector('.urlRequeridaComment');
                    const aparecerUrlComment = document.querySelector('.aparecerUrlComment');

                    const ponerUrlComment = document.querySelector('.ponerUrlComment');

                    ponerUrlComment.addEventListener('click', () => {
                        insertAtCaret('descripcionComment', `<a href="${urlRequeridaComment.value}">${aparecerUrlComment.value}</a>`);
                        urlWindow.classList.toggle('hidden');
                    })
                }

                const imgConUrl = () => {
                    const img = urlImg.value;

                    if (img.includes('data:image/')) {
                        imgWindow.classList.toggle('hidden');
                        imgMala.classList.toggle('hidden');

                        imgMalaBtn.addEventListener('click', () => {
                            imgMala.classList.toggle('hidden')
                        })

                    } else {
                        insertAtCaret('descripcionComment', `<img src="${img}" class="imgTextarea"></img>`);
                        imgWindow.classList.toggle('hidden');
                        urlImg.value = '';
                    }

                }

                const imgFile = () => {

                    var reader = new FileReader();

                    reader.onload = function (e) {
                        const imgFile = e.target.result;

                        const data = { "archivo": `${imgFile}` };

                        fetch(uploadIMG + 'subir', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        })
                            .then(resp => resp.json())
                            .then(url => {
                                insertAtCaret('descripcionComment', `<img src="${url}" class="imgTextarea"></img>`);
                                imgWindow.classList.toggle('hidden');
                            })
                            .catch(console.error)
                    }

                    reader.readAsDataURL(fileImg.files[0]);
                }

                urlBtnComment.addEventListener('click', () => {
                    urlWindow.classList.toggle('hidden');
                    urlFunction();
                })

                imgBtnComment.addEventListener('click', () => {
                    imgWindow.classList.toggle('hidden');

                    ponerUrlImg.addEventListener('click', imgConUrl)
                    ponerFileImg.addEventListener('click', imgFile)
                })
            }

            funcionesParaArticulosComment();

            ponerComent.addEventListener('click', () => {

                const resultadoTextareaComment = document.querySelector('.resultadoTextareaComment')

                fetch(validarJwt, {
                    method: 'GET',
                    headers: { 'x-token': token }
                })
                    .then(resp => resp.json())
                    .then(({ usuario }) => {

                        const headersList = {
                            'Content-Type': 'application/json',
                            'x-token': `${token}`
                        };

                        const data = {
                            'contenido': `${resultadoTextareaComment.innerHTML}`,
                            'autor': `${usuario.uid}`,
                            'discusion': `${idDiscusion}`
                        };

                        fetch(comentariosUrl, {
                            method: 'POST',
                            headers: headersList,
                            body: JSON.stringify(data)
                        })
                            .then(location.reload())
                            .catch(console.error)
                    })
                    .catch(console.error)
            })

        })
        .catch(console.error)
}

// Botón que abre discusión
nuevaDiscusion.addEventListener('click', () => {
    discusion.classList.toggle('hidden');
    foro.classList.toggle('hidden');
})

// Escribir discusion 
const resultadoTextarea = document.querySelector('.resultadoTextarea');

const mirror = () => {

    const arrTextarea = descripcionTextarea.value.split('\n');
    const arrResult = [];

    arrTextarea.forEach(t => {
        const parrafo2 = document.createElement('p');
        parrafo2.innerHTML = t;

        arrResult.push(parrafo2.innerHTML);
        setTimeout(() => {
            resultadoTextarea.innerHTML = arrResult.join('<br>');
        }, 100)
    })
}

descripcionTextarea.addEventListener('keydown', mirror)

const funcionesParaArticulos = () => {

    // Negrita, subrayado, cursiva
    const negrita = document.querySelector('.negrita');
    const subrayado = document.querySelector('.subrayado');
    const cursiva = document.querySelector('.cursiva');
    const imgBtn = document.querySelector('.imgBtn');
    const urlBtn = document.querySelector('.urlBtn');
    const ponerUrlImg = document.querySelector('.ponerUrlImg');
    const ponerFileImg = document.querySelector('.ponerFileImg');

    const etiquetaStrong = () => {
        let desde = descripcionTextarea.selectionStart;
        let hasta = descripcionTextarea.selectionEnd;
        let elTexto = descripcionTextarea.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            descripcionTextarea.setRangeText(`<b>${sel}</b>`, desde, hasta, 'select');
        }
    }

    const etiquetaSubrayado = () => {
        let desde = descripcionTextarea.selectionStart;
        let hasta = descripcionTextarea.selectionEnd;
        let elTexto = descripcionTextarea.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            descripcionTextarea.setRangeText(`<u>${sel}</u>`, desde, hasta, 'select');
        }
    }

    const etiquetaCursiva = () => {
        let desde = descripcionTextarea.selectionStart;
        let hasta = descripcionTextarea.selectionEnd;
        let elTexto = descripcionTextarea.value;

        let sel = elTexto.substring(desde, hasta);

        if (sel.length > 0) {// si hay algo seleccionado
            descripcionTextarea.setRangeText(`<i>${sel}</i>`, desde, hasta, 'select');
        }
    }

    negrita.addEventListener("click", () => {
        etiquetaStrong();
    });
    cursiva.addEventListener("click", () => {
        etiquetaCursiva();
    });
    subrayado.addEventListener("click", () => {
        etiquetaSubrayado();
    });

    const insertAtCaret = (areaId, text) => {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var caretPos = txtarea.selectionStart;

        var front = (txtarea.value).substring(0, caretPos);
        var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
        txtarea.value = front + text + back;
        caretPos = caretPos + text.length;
        txtarea.selectionStart = caretPos;
        txtarea.selectionEnd = caretPos;
        txtarea.focus();
        txtarea.scrollTop = scrollPos;
    }

    const urlFunction = () => {
        const urlRequerida = document.querySelector('.urlRequerida');
        const aparecerUrl = document.querySelector('.aparecerUrl');

        const ponerUrl = document.querySelector('.ponerUrl');

        ponerUrl.addEventListener('click', () => {
            insertAtCaret('descripcion', `<a href="${urlRequerida.value}">${aparecerUrl.value}</a>`);
            urlWindow.classList.toggle('hidden');
        })
    }

    const imgConUrl = () => {
        const img = urlImg.value;

        if (img.includes('data:image/')) {
            imgWindow.classList.toggle('hidden');
            imgMala.classList.toggle('hidden');

            imgMalaBtn.addEventListener('click', () => {
                imgMala.classList.toggle('hidden')
            })

        } else {
            insertAtCaret('descripcion', `<img src="${img}" class="imgTextarea"></img>`);
            imgWindow.classList.toggle('hidden');
            urlImg.value = '';
        }

    }

    const imgFile = () => {

        var reader = new FileReader();

        reader.onload = function (e) {
            const imgFile = e.target.result;

            const data = { "archivo": `${imgFile}` };

            fetch(uploadIMG + 'subir', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(resp => resp.json())
                .then(url => {
                    insertAtCaret('descripcion', `<img src="${url}" class="imgTextarea"></img>`);
                    imgWindow.classList.toggle('hidden');
                })
                .catch(console.error)
        }

        reader.readAsDataURL(fileImg.files[0]);
    }

    urlBtn.addEventListener('click', () => {
        urlWindow.classList.toggle('hidden');
        urlFunction();
    })
    imgBtn.addEventListener('click', () => {
        imgWindow.classList.toggle('hidden');

        ponerUrlImg.addEventListener('click', imgConUrl)
        ponerFileImg.addEventListener('click', imgFile)
    })
}

funcionesParaArticulos();

// Poner categorias
let ctgId = [];

const categoriasUl = document.querySelector('.categoriasUl');

fetch(categoriasUrl, {
    method: 'GET'
})
    .then(resp => resp.json())
    .then(({ categorias }) => {
        categorias.forEach(c => {
            const html = `
                 <li class="ctgLi" id="${c._id}">${c.nombre}</li>
             `;

            categoriasUl.innerHTML += html;
        })

        setTimeout(() => {
            const ctgLi = document.querySelectorAll('.ctgLi');
            const li = [].slice.call(ctgLi);

            li.forEach(l => {
                l.addEventListener('click', () => {
                    ctgId.unshift(l.id)
                })
            })
        }, 500);
    })
    .catch(console.log)

// Crear discusión
const iniciarDiscusion = document.querySelector('.iniciar');
const sinCtg = document.querySelector('.sinCtg');
const sinCtgBtn = document.querySelector('.sinCtgBtn');
const pregunta = document.querySelector('#pregunta');

iniciarDiscusion.addEventListener('click', () => {
    if (ctgId.length === 0) {
        sinCtg.classList.toggle('hidden');

        sinCtgBtn.onclick = () => {
            sinCtg.classList.toggle('hidden');
        }
    } else {
        fetch(validarJwt, {
            method: 'GET',
            headers: { 'x-token': token }
        })
            .then(resp => resp.json())
            .then(({ usuario }) => {

                const ctg = ctgId.shift()

                const data = {
                    'titulo': `${pregunta.value}`,
                    'contenido': `${resultadoTextarea.innerHTML}`,
                    'textoParaTarjetas': `${resultadoTextarea.innerText}`,
                    'autor': `${usuario.uid}`,
                    'categoria': `${ctg}`
                };

                const headersList = {
                    'Content-Type': 'application/json',
                    'x-token': `${token}`
                };

                fetch(discusionesUrl, {
                    method: 'POST',
                    headers: headersList,
                    body: JSON.stringify(data)
                })
                    .then(resp => resp.json())
                    .then(location.reload())
                    .catch(console.error)

            })
            .catch(console.error)
    }
})

// Abrir escribir comentario
const abrirEscritor = document.querySelector('#deste');
const escribirComentario = document.querySelector('.escribirComentario');

abrirEscritor.addEventListener('click', () => {

    if (autenticado === true) {
        escribirComentario.classList.toggle('hidden');
        abrirEscritor.classList.toggle('hidden');
    } else if (autenticado === false) {
        noRegister.classList.toggle('hidden');
        redirigir.onclick = () => {
            location.href = publicUrl + 'auth.html';
        }
        noRedirigir.onclick = () => {
            noRegister.classList.toggle('hidden');
        }
    }
})