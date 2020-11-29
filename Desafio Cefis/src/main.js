const endpoint = 'https://cefis.com.br/api/v1/event';

//Requisiçãod e dados dos cursos
let resq = function () {    
    let data = null;
    $.ajax({
        async: false,
        url: endpoint,
        method:'GET',            
        //contentType: "application/json",
        dataType: 'text json',
        success: function(result){
            data = JSON.parse(result);        
        }
    });

    return data;

}();

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

let index = 0; // Variável para iterar os cursos e carregá-los

function populate() {
    while(true) {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        if (windowRelativeBottom > document.documentElement.clientHeight + 500) break;
        if(index < resq.data.length-1){
            
            let curso = getCurso(resq.data[index].id);
            let imagem = curso.data['banner'];
            let title = curso.data['title'];
            let id = curso.data['id'];
            let url = 'course.html?id='+id;
            // console.log(imagem);

            $("#principal").append(
            "<div class='curso center'>"+
                "<figure>"+
                    "<a href='"+url+"'>" +
                        "<img src="+ imagem+">"+
                        "<span>"+ title +"</span>"+
                        "<div class='detalhes-trans'>"+
                            "<div class='detalhes-txt'>Detalhes</div>"+
                        "</div>"+
                    "</a>"+
                "</figure>"+
            "</div>");

            index = index+1;
        }
        else{
            break;
        }
    
    }
  }

  window.addEventListener('scroll', populate)

  populate();
