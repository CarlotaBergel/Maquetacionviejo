$(document).ready(function(){
    
    // Para seleccionar elemetos
    $("#showButton").click(function(){
        $("#text").show();
    });
    $("#hideButton").click(function(){
        $("#text").hide();
    });

    // Para ver los elementos
    $("#cardForm").on("submit", function(e){
        e.preventDefault();

        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let imageUrl = $("#imageUrl").val();

        let cardHtml = `
        <div class="col-3">
            <div class="card mt-5" style="width: 18rem;">
                <img src="${imageUrl}" class="card-img-top" alt="${firstName} ${lastName}">
                <div class="card-body">
                    <h5 class="card-title">${firstName} ${lastName}</h5>
                </div>
            </div>
        </div>
        `;

        $("#card-container").append(cardHtml);
    });
});