$(function () {
    /** @type HTMLIFrameElement */
    let content = document.getElementById('currentPage');

    $('#navMenu > a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
        let url = $(e.target).data('url');
        if (!url) {
            return;
        }

        content.src = url;
    });
});