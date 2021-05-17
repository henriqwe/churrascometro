// Adultos consomem por hora:
// Carne - 100gr, caso a dueracao seja superior a 6 horas o consumo passar a ser 250gr.
// Cerveja - 300ml, caso a dueracao seja superior a 6 horas o consumo passar a ser 500ml.
// Refrigerante -  250ml, caso a dueracao seja superior a 6 horas o consumo passar a ser 400ml.
//
// Crianças consomem 1/2 por hora que um adulto consome, caso ultrapasse 6hr de duração o consumo passa a ser 1/3 e não consomem cerveja.

function calcular() {
    // Realiza animação de expandir os elementos. 
    var resultado = document.getElementById("resultado");
    resultado.className = "expandir";
    var container = document.getElementById("container");
    container.className = "expandir";

    // Recebe o valor do input adulto.
    var quantidadeAdulto = document.getElementById("adultos").value;

    // Recebe o valor do input crianca.
    var quantidadCrianca = document.getElementById("criancas").value;

    // Recebe o valor do input duracao.
    var duracao = document.getElementById("duracao").value;

    // O tipo do value de duracao é string. É necessario transforma o value de duracao em float. hr para hora e min para minuto.
    var [hr, min] = duracao.split(":");
    var tempoFloat = parseInt(hr) + parseFloat(min / 60);

    var totalCarne = carnePorPessoa(quantidadeAdulto, quantidadCrianca, tempoFloat);
    var totalCerveja = cervejaPorPessoa(quantidadeAdulto, tempoFloat);
    var totalRefrigernate = refrigerantePorPessoa(quantidadeAdulto, quantidadCrianca, tempoFloat);

    //coloca-se o "+" após o sinal de "=" para deixar entendido que preciso imprimir mais de um innerHTML
    resultado.innerHTML = `<p class="result-info">Será necessario:</p>`
    resultado.innerHTML += `
    <div class="result-block">
      <p>${totalCarne} Kg de carne.</p>
    </div>
  `
    resultado.innerHTML += `
    <div class="result-block">
      <p>${Math.ceil(totalCerveja/355)} latas de cerveja de 355ml.</p>
    </div>
  `
    resultado.innerHTML += `
    <div class="result-block">
      <p>${Math.ceil(totalRefrigernate/2000)} garrafas de refrigerante de 2L.</p>
    </div>
  `
}

function carnePorPessoa(quantidadeAdulto, quantidadCrianca, tempoFloat) {
    var carnePorHr = 100;
    var carnePorHrMaiorQue6 = 250;

    if (tempoFloat >= 6) {
        var totalCarne = ((((quantidadeAdulto * carnePorHr) + ((quantidadCrianca * carnePorHr) * 0.5)) * 6) + (((quantidadeAdulto * carnePorHrMaiorQue6) + (quantidadCrianca * carnePorHrMaiorQue6) * 0.33) * (tempoFloat - 6))) / 1000;
    } else {
        var totalCarne = (((quantidadeAdulto * carnePorHr) + ((quantidadCrianca * carnePorHrMaiorQue6) * 0.5)) * tempoFloat) / 1000;
    }
    return totalCarne.toFixed(3);
}

function cervejaPorPessoa(quantidadeAdulto, tempoFloat) {
    var cervejaPorHr = 300;
    var cervejaPorHrMaiorQue6 = 500;

    if (tempoFloat >= 6) {
        var totalCerveja = ((quantidadeAdulto * cervejaPorHr) * 6) + ((quantidadeAdulto * cervejaPorHrMaiorQue6) * (tempoFloat - 6));
    } else {
        var totalCerveja = (quantidadeAdulto * cervejaPorHr) * tempoFloat;
    }
    return totalCerveja

}

function refrigerantePorPessoa(quantidadeAdulto, quantidadCrianca, tempoFloat) {
    var refrigerantePorHr = 250;
    var refrigerantePorHrMaiorQue6 = 400;

    if (tempoFloat >= 6) {
        var totalRefrigerante = (((quantidadeAdulto * refrigerantePorHr) + ((quantidadCrianca * refrigerantePorHr) * 0.5)) * 6) + (((quantidadeAdulto * refrigerantePorHrMaiorQue6) + (quantidadCrianca * refrigerantePorHrMaiorQue6) * 0.33) * (tempoFloat - 6));
    } else {
        var totalRefrigerante = ((quantidadeAdulto * refrigerantePorHr) + ((quantidadCrianca * refrigerantePorHrMaiorQue6) * 0.5)) * tempoFloat;
    }

    return totalRefrigerante

}