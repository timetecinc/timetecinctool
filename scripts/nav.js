 var dataPageSelec = "nav-item";
 var listingPageSelec = "nav-item";
$(document).ready(function() {
 var current_page = location.pathname.split('/').pop();
   if(current_page == 'data.html'){
      dataPageSelec = "nav-item active";
   }
   else if(current_page == 'listing.html'){
       listingPageSelec = "nav-item active";
       
   }
   else if(current_page == 'createEvent.html'){
       $(".navbar #createEvent").addClass('active');
   }else if(current_page == 'myProfile.html'){
       $(".navbar #myProfile").addClass('active');
   }
initialNavBar();
})

function initialNavBar(){
document.getElementById("navBar").innerHTML =
"<nav class='navbar navbar-light bg-faded'>"
 +"<a class='navbar-brand' href='#'>"
   +" <img src='/assets/brand/bootstrap-solid.svg' width='30' height='30' class='d-inline-block align-top' alt=''>"
   + " Timetec Inc</a>"
 +"<ul class='nav navbar-nav'>"
   + "<li id='dataPage' class='"+dataPageSelec+"'>"
     +"<a class='nav-link' href='data.html'>Memory Data</a>"
    +"</li>"
    +"<li id='listingPage'class='"+listingPageSelec+"'>"
     + "<a class='nav-link' href='listing.html'>Listing</a>"
    +"</li>"
    +"<li class='nav-item'>"
     +"<a class='nav-link' href='#'>Pricing</a>"
    +"</li>"
    +"<li class='nav-item'>"
      +"<a class='nav-link' href='#'>About</a>"
   +"</li>"
  +"</ul>"
+"</nav>";
}