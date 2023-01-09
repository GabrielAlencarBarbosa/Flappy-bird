function novoElemento(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return  elem
}

function Barreira(reversa = false){
    this.elememto = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elememto.appendChild(reversa ? corpo :borda)
    this.elememto.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`
}

function parDeBarreiras(altura, abertura, x){
    this.elememto = novoElemento('div', 'par-de-barreiras')

    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elememto.appendChild(this.superior.elememto)

    this.sortearAbertura = () =>{
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }

    this.getX = () => parseInt(this.elememto.style.left.split('px')[0])
    this.setX = x => this.elememto.style.left = `$[x]px`
    this.getLargura = () => this.elememto.clientWidth

    this.sortearAbertura()
    this.setX(x)
}

function Barreiras(altura, abertura, abertura, espaco, notificarPonto) {
    this.pares = [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + espaco * 2),
        new parDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            if(par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }

            const meio = largura / 2
            const cruzouOMeio = par.getX() + deslocamento >= meio
            && par.getX() < meio
            if(cruzouOMeio) notificarPonto()
        })
    }
}