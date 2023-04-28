const resClasses = localStorage.getItem('theme');

if(resClasses) {
    var style = document.createElement('style');
    style.innerHTML = resClasses;
    document.getElementsByTagName('head')[0].appendChild(style);
}