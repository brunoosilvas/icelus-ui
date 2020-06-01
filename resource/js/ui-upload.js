$.Upload = function (el, options) {
    var plugin = this;

    var defaults = {
        data: {},
        onSelect: function () { },
        onUpload: function () { }
    };

    plugin.settings = {};

    var createWidget = function () {

        plugin.settings = $.extend({}, defaults, options);
        plugin.el = el;

        el.each(function () {

            $(el).empty();

            let html = `
            <form enctype="multipart/form-data" autocomplete="off" novalidate>
                <input name="path" type="hidden">
                <input name="size" type="hidden">
                <div class="form-row">
                  <div class="form-group col-12 mb-2">
                     <div class="custom-file">
                        <input id="file" name="files" type="file" multiple="multiple" class="custom-file-input">
                        <label class="custom-file-label" for="file" data-browse="Procurar">Selecione...</label>
                     </div>
                  </div>
                  <div class="form-group col-12">
                     <button class="btn btn-primary btn-sm" type="button">
                        <span class="mr-2"><i class="fa fa-upload"></i></span>
                        <span>Uplaod</span>
                     </button>
                  </div>
                </div>
                <div class="progress d-none">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </form>`;
            $(el).html(html);

            if ($.isFunction(plugin.settings.onSelect)) {
                $('input[type=file]', el).on('change', function (evt) {
                    let files = evt.target.files;

                    if (files && files.length > 0) {

                        $('input[name=size]', el).val(files.length);

                        /*let data = new FormData();
                        for (let i = 0; i < files.length; i++) {
                            let file = files[i]
                            data.append(`files${i}`, file);
                        }*/

                        let data = new FormData($('form', el)[0]);
                        console.log(data);

                        let display = `${files.length} ${files.length > 1 ? 'arquivos selecionados' : 'arquivo selecionado'}`;
                        $('.custom-file label', el).text(display);

                        plugin.data = data;
                        plugin.settings.onSelect.call(el, plugin.val());
                    }
                });
            }

            if ($.isFunction(plugin.settings.onUpload)) {
                $('button', el).on('click', function () {
                    plugin.progressStart();
                    plugin.settings.onUpload.call(el, plugin.val());
                });
            }

        });
    }

    plugin.val = function () {
        return plugin.data || {};
    }

    plugin.progressStart = function () {
        $('.progress-bar', el).attr('aria-valuenow', '0');
        $('.progress-bar', el).attr('style', 'width: 0%;');
        $('.progress', el).removeClass('d-none');
    }

    plugin.progressUpdate = function (percentual) {
        $('.progress-bar', el).attr('aria-valuenow', percentual);
        $('.progress-bar', el).attr('style', `width: ${percentual}%;`);
        $('.progress-bar', el).text(`${percentual}%`);
    }

    plugin.progressStop = function () {
        $('.progress', el).addClass('d-none');
    }

    createWidget();
}