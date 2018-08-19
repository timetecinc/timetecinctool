

 var dataPageSelec = "nav-item";
 var listingPageSelec = "nav-item";
 var fbaPageSelec = "nav-item";
var name, email, photoUrl, uid;




$(document).ready(function() {

firebase.auth().onAuthStateChanged(function(user) {
  
  if (user) {
    console.log("user logged in ");
    console.log(user);

  name = user.displayName;
  email = user.email;
 
  uid = user.uid; 

  console.log("name: " + name);
  console.log("email: " + email);
  console.log(uid);
 // window.location = 'data.html';

  } else {
    // No user is signed in.
    console.log("not logged in inNav");
    //window.location = 'index.html';
  }
});



 var current_page = location.pathname.split('/').pop();
   if(current_page == 'data.html'){
      dataPageSelec = "nav-item active";
   }
   else if(current_page == 'listing.html'){
       listingPageSelec = "nav-item active";
       
   }
   else if(current_page == 'fba.html'){
       fbaPageSelec = "nav-item active";
   }else if(current_page == 'myProfile.html'){
       $(".navbar #myProfile").addClass('active');
   }
initialNavBar();
})

function initialNavBar(){
document.getElementById("navBar").innerHTML =
"<nav class='navbar navbar-light bg-faded'>"
 +"<a class='navbar-brand' href='#'>"
   +" <img src='image/ICON.png' width='30' height='30' class='d-inline-block align-top' alt=''>"
   + " Timetec Inc</a>"
 +"<ul class='nav navbar-nav'>"
   + "<li id='dataPage' class='"+dataPageSelec+"'>"
     +"<a class='nav-link' href='data.html'>Memory Data</a>"
    +"</li>"
    +"<li id='listingPage'class='"+listingPageSelec+"'>"
     + "<a class='nav-link' href='listing.html'>Listing</a>"
    +"</li>"
    +"<li id='listingPage'class='"+fbaPageSelec+"'>"
     +"<a class='nav-link' href='fba.html'>FBA Shipping Slip</a>"
    +"</li>"
    +"<li class='nav-item'>"
      +"<a class='nav-link' href='#'>About</a>"
   +"</li>"
  +" <li class='nav-item dropdown float-xs-right' style='padding-right:100px;'>"
     +"<a class='nav-link dropdown-toggle' href='http://example.com' id='supportedContentDropdown' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+name+"</a>"
      +"<div class='dropdown-menu' aria-labelledby='supportedContentDropdown'>"
       +"<a class='dropdown-item' href='#'>Logout</a>"
       
      +"</div>"
    +"</li>"
  +"</ul>"
+"</nav>";
}