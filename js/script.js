// Rótulos dos talhões
function talhoesLabels(feature, layer) {
    layer.bindPopup('<strong>Nome: </strong> ' + feature.properties.Nome + '</br>' +
        '<strong>Área: </strong> ' + feature.properties.Area + ' ha' + '</br>' +
        '<strong>Cidade: </strong>' + feature.properties.Cidade + '</br>' +
        '<strong>Cultura: </strong>' + feature.properties.Cultura + '</br>' +
        '<strong> Data de plantio: </strong>' + feature.properties.Data
    );
}

// Estilo dos talhoes
var talhoesEstilo = {
    fillColor: 'transparent',
    color: 'black',
    weight: 2
}

// Estilo dos terraços
var terracosEstilo = {
    color: '#fe00ed'
}

// Estilos da linhas
function linhasCores(d) {
    if (d == 'Plantio') {
        corLinha = '#041562'
    } else if (d == 'Pulverização') {
        corLinha = '#ff7f00'
    } else if (d == 'Bordaduras') {
        corLinha = '#0180ff'
    }

    return corLinha

}

function linhasEstilo(feature) {
    return {
        color: linhasCores(feature.properties.Tipo),
        weight: 2
    }
}

// Carregar talhões
var talhao = L.geoJSON(talhao, { style: talhoesEstilo, onEachFeature: talhoesLabels });

// Carregar terraços
var terracos = L.geoJSON(terracos, { style: terracosEstilo })

// Carregar plantio
var plantio = L.geoJSON(plantio, { style: linhasEstilo })

// Carregar pulverização
var pulverizacao = L.geoJSON(pulverizacao, { style: linhasEstilo })

var map = L.map('map', {
    layers: [talhao, terracos]
});

// Carregar imagem Satelite
var mapboxSatelite = L.tileLayer('https://api.mapbox.com/styles/v1/luizzampronio/ckyjyxl6z0cok14ms58trvzko/tiles/256/{ z }/{ x }/{ y }@2x?access_token=pk.eyJ1IjoibHVpenphbXByb25pbyIsImEiOiJja3lqejFucnMwZWExMnBvMGNjdHZjcnppIn0.GHW0qostUS77hxmlXPgYVg', {
    maxZoom: 25
}).addTo(map);

// Carregar imagem Streets
var mapboxBasic = L.tileLayer('https://api.mapbox.com/styles/v1/luizzampronio/ckyna20a013dl14o7w0whpns3/tiles/256/{ z }/{ x }/{ y }@2x?access_token=pk.eyJ1IjoibHVpenphbXByb25pbyIsImEiOiJja3luYTN0NXAwMTg4MnByMDgzM2k2aGQ0In0.54W8xUz-UgsOHYcabt8o_g', {
    maxZoom: 25
})


// Criar layers base
var baseLayers = {
    'Satélite': mapboxSatelite,
    'Básico': mapboxBasic
}

// Criar layers sobrepostos
var overlays = {
    'Talhões': talhao,
    'Terraços': terracos,
    'Plantio': plantio,
    'Pulverização': pulverizacao
}

// Controle de layers
L.control.layers(baseLayers, overlays).addTo(map);


// Zoom no talhão
map.fitBounds(talhao.getBounds());


// Controle de legenda
map.on('overlayadd', function(e) {
    var strDiv = "#prj-" + retirarEspacos(e.name)
    $(strDiv).show();
});

map.on('overlayremove', function(e) {
    var strDiv = "#prj-" + retirarEspacos(e.name)
    $(strDiv).hide();
});

// Retirar Espaços
function retirarEspacos(str) {
    return str.replace(/\s+/g, '');
}

// JQuery
$("#btnShowLegend").click(function() {
    $("#legenda").toggle();
});