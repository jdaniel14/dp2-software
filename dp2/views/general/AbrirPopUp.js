$( document ).ready( function() {
$("#btnAsignarRecursoHumano").click(function () {
      var caracteristicas = "height=700,width=800,scrollTo,resizable=1,scrollbars=1,location=0";
      nueva=window.open(this.href, 'Popup', caracteristicas);
      return false;
});
});