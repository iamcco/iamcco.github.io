window.fetch && fetch("/images.json").then(function(res) {
    if(res.ok) {
        return res.json();
    } else {
        console.log('Query images.json fail, status', res.status);
    }
}).then(function(res) {
    var ele = document.querySelector('#js-photo-count');
    ele && (ele.innerHTML = res.iTotal);
    ele = document.querySelector('#js-article-count');
    ele && (ele.innerHTML = res.aTotal);

});
