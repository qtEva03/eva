function changeTextLanguage(texts) {
    for (const [selector, content] of Object.entries(texts)) {
        $(selector).html(content);
    }

    $("html").attr("lang", localStorage.getItem("language"));
    $(".resume").attr("href", `docs/resume_${localStorage.getItem("language")}.pdf`);
}

if (!localStorage.getItem("language")) {
    localStorage.setItem("language", navigator.language.includes("it") ? "it" : "en");
}

const request = $.ajax({
    url: `./languages/${localStorage.getItem("language")}.json`,
    dataType: "json",
});

const documentReady = $.Deferred();
$(function() { documentReady.resolve(); });

$.when(request, documentReady).done(function(data) {
    $(`.language__button[value='${localStorage.getItem("language")}']`)
        .addClass("language__button--selected")
        .prop("disabled", true);

    changeTextLanguage(data[0]);

    $(".language__button").click(function() {
        $(".language__button").removeClass("language__button--selected");
        $(this).addClass("language__button--selected");

        $(".language__button").prop("disabled", false);
        $(this).prop("disabled", true);

        localStorage.setItem("language", $(this).val());

        $.ajax({
            url: `./languages/${localStorage.getItem("language")}.json`,
            dataType: "json",
        }).done(function(data) { changeTextLanguage(data); });
    });
});