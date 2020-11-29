const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const idCurso = urlParams.get('id')

const endpoint = 'https://cefis.com.br/api/v1/event';

//Função para requisição de dados específicos de um curso 
function getCurso(idCurso){

    let data_curso = null;
    $.ajax({
        async: false,
        url: endpoint + '/' + idCurso + '?include=classes',
        method:'GET',            
        //contentType: "application/json",
        dataType: 'text json',
        success: function(result){
            data_curso = JSON.parse(result);       
         }
    });
    return data_curso;
}

curso =  getCurso(idCurso);
title = curso.data["title"]
imagem = curso.data["banner"]
aulas = curso.data.classes;

// console.log(curso)

// Adicionando os elemntos da requição no html
$("#title").html("<h2>"+title+"</h2>")

$("#figura").html("<figure>"+
"<img src="+ imagem + ">"
)

aulas.forEach(element => {
    $("#aulas").append(
        "<li>"+element.title+"</li><hr>"
    )
});

$("#bt-visu-aulas").click(function(){
    $([document.documentElement,document.body]).animate({
        scrollTop: $("#aulas").offset().top
    });
});
