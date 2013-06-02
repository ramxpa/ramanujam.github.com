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
    var oj = document.createElement('script'); 
    oj.setAttribute('src', 'http://ramanuj.me/monetate/mtintel/opti.js');                  
    document.body.appendChild(oj); 
    var oc = document.createElement('link');
    oc.rel = 'stylesheet';
    oc.type = 'text/css';
    oc.setAttribute('href', 'http://ramanuj.me/monetate/mtintel/opti.css');
    document.body.appendChild(oc); 
}
