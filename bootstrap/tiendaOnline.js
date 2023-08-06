//Importamos la clase productoCarrito

//import * as ProductoCarrito from "./productoCarrito.js"; 

$(document).ready(function(){

    class ProductoCarrito{
  
        constructor (nombre, precio, imagen){
           this.nombre = nombre;
           this.cantidad = 1;
           this.imagen = imagen;
           this.precio = precio;
        }

        getNombre(){
            return this.nombre;
        }
        getCantidad(){
            return this.cantidad;
        }
        getImagen(){
            return this.imagen;
        }
        getPrecio(){
            return this.precio;
        }
        setNombre(nombre){
            this.nombre = nombre;
        }
        setCantidad(cantidad){
            this.cantidad = cantidad;
        }
        setImagen(imagen){
            this.imagen = imagen;
        }
        setPrecio(precio){
            this.precio = precio;
        }

    }
    
    var mapaProducts = new Map();

    // Para seleccionar elemetos
    $("#btnCarrito").click(function(){

        //Antes de remostrarlo hay que repintar los productos por si ha cambiado algo

        $("#windowCarrito").toggle();
    });

    // Para seleccionar elemetos
    $("#botonVaciar").click(function(){
        mapaProducts.clear();

        actualizarCarrito();
        
    });

    //Funcion al pulsar en añadir al carrito en un producto
    $(".addCarrito").click(function(){
        
        //console.log($(this));

        let padreElement = $(this).parent();
        let abueloElement = padreElement.parent();

        //console.log(padreElement);
        //console.log(abueloElement);

        let nombreProducto = padreElement.find(".card-title").text();
        let precioProducto = padreElement.find(".card-price").text().replace("€","");
        let imagenProducto = abueloElement.find(".img-product").attr("src");

        console.log(nombreProducto);
        //console.log(precioProducto);
        //console.log(imagenProdcuto);

        //Llamamos a funcion para que nos devuelva
        //una instancia del objeto productoCarrito
        let product = createProduct(nombreProducto, precioProducto, imagenProducto);

        console.log(product);

        //Añadimos el producto al MAPA revisando que si lo tenemos
        //suma +1 la cantidad
        addProductMap(product);

        console.log(mapaProducts);

        //Actualizamos el carrito
        actualizarCarrito();
    });

    function createProduct(nombre, precio, imagen){
        let producto = new ProductoCarrito(nombre, precio, imagen);

        return producto;
    }

    function addProductMap(producto){
        
        console.log(producto);

        if(mapaProducts.has(producto.getNombre())){
            //Sumar uno a la cantidad
            mapaProducts.get(producto.getNombre()).setCantidad(mapaProducts.get(producto.getNombre()).getCantidad()+1);
        }else{
            console.log("dsdsdsds");
            mapaProducts.set(producto.getNombre(),producto);
        }

    }

    function actualizarCarrito(){
        //$('#divCarrito').empty();
        //$("#div-carrito").remove(".imgProducts");
        //$("#div-carrito").remove(".textProducts");
        $(".imgProducts").remove();
        $(".textProducts").remove();
        $('#total').remove();

        let totalPrice = 0;

        for (var [key, value] of mapaProducts) {

            
            totalPrice += (value.getCantidad() * value.getPrecio());

            let cardHtml = `
            <div class="col-2 imgProducts"><img class="img-product row-2" src="${value.getImagen()}" width="70px"></div>
            <div class="col textProducts">
              <span>Cantidad: ${value.getCantidad()} ${value.getNombre()}</span>
              <span>Precio: ${value.getPrecio()}</span>
            </div>`;

            //console.log(cardHtml);

            $("#div-carrito").append(cardHtml);

        }

        //console.log(totalPrice);

        let cardHtmlTotalPrice = `
        <span id="total">Total: ${totalPrice} &euro;</span>`;

        $("#total-carrito").append(cardHtmlTotalPrice);
    }
});