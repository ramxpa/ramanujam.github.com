if (!($ = window.jQuery)) {
    script = document.createElement( 'script' );
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js'; 
    script.onload=insertOpticode();
    document.body.appendChild(script);
} 
else {
    insertOpticode();
}

function insertOpticode() {
    var optiCode = document.createElement('script'); 
    optiCode.setAttribute('src', 'http://ramanuj.me/monetate/mtintel/opti.js');                  
    document.body.appendChild(optiCode); 
}
