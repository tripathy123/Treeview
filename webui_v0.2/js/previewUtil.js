var vObject = null;
var renameObj = null;

function start() {
    var $obj = $("#navigation");
    $obj.children().remove();
    $obj.append('<li class="last"><input class="parent" type="checkbox"/><a class="link" href="#">Root Node</a></li>');

}

function addAfter() {
    var $obj = $("input[type='checkbox']:checked");
    $($obj).parent().removeClass("last");
    $($obj).parent().after('<li><input class="parent" type="checkbox" /><a class="link" href="#">New Node</a></li>');
    $($obj).parent().siblings(":last").addClass("last");
}

function addBefore() {
    var $obj = $("input[type='checkbox']:checked");
    $($obj).parent().before('<li><input class="parent" type="checkbox" /><a class="link" href="#">New Node</a></li>');
}

function addBelow() {
    var $obj = $("input[type='checkbox']:checked");
    if ($($obj).parent().children("ul").length) {
        $($obj).parent().children("ul").children().last().removeClass("last");
        $($obj).parent().children("ul").append('<li class="last"><input class="parent" type="checkbox"/><a class="link" href="#">New Node</a></li>');
    } else {
        $($obj).parent().addClass("collapsable");
        $($obj).parent().append("<div class='hitarea collapsable-hitarea' id='hit'></div>");
        $($obj).parent().append('<ul><li class="last"><input class="parent" type="checkbox"/><a class="link" href="#">New Node</a></li></ul>');
    }
}

function deleteItem() {
    if (confirm("Are You sure want to delete the selected Item?")) {
        var $obj = $("input[type='checkbox']:checked");
        $($obj).parent().remove();
    }
    return false;
}

function expand() {
    $('.collapse').click();
}

function contract() {
    $('.expand').click();

}

$('.parent').click(function () {
    $(this).append('<li class="last"><input class="parent" type="checkbox" class="parent" name="vehicle" value="id16"/><a class="link" href="#">New Node</a></li>');
});

$('.parent').click(function () {
    this.id = 'customId123';
    $("INPUT[type='checkbox']").attr('checked', false);
    $(this).attr('checked', true);
    this.checked = true;
    vObject = this;
    //	alert(this.id);
});

$(document).on('click', '.link', function () {
    var $box = $(this);
    renameObj = $box;
    $("#menuname").val(renameObj.text());

    $("#urlid").val(renameObj.attr("href"));
    //$('#dialog').modal();
    $('#dialog').modal({
        onShow: function (dialog) {
            $(dialog.container).draggable();
        }
    });

    return false;
});

function Preview() {

    $('#preview').empty();
    $('#preview').append("<h2>Preview</h2>");
    //Append menu
    //var div = $('<div/>');
    var ul = $('<ul class=\"treeview\"/>');
    var li = $('<li/>').html("<a style=\"padding-left: 10px;\">Menu</a><div class=\"previewMenu\"></div>");

    ul.append(li);
    //div.append(ul);
    $('#preview').append(ul);
    var navigationElem = $("#navigation").clone(true);
    $(navigationElem).find("input[type='checkbox']").remove();
    $(navigationElem).find("a").removeClass("link");
    $(navigationElem).find("li.expandable").children("a").removeAttr("href");
    $(navigationElem).find("li.collapsable").children("a").removeAttr("href");
    $(navigationElem).find("a").css("padding-left", "10px");


    navigationElem.appendTo("#preview");


    $('.hitarea', $('#preview')).next().css("display", "none");
    $('.hitarea', $('#preview')).removeClass('collapsable-hitarea');
    $('.hitarea', $('#preview')).addClass('expandable-hitarea');

    $('#navigation', $('#preview')).hide();


    $('#preview').modal({
        onShow: function (dialog) {
            $(dialog.container).draggable();
        }
    });
}

$(document).on('click', "input:checkbox", function () {
    var $box = $(this);
    if ($box.is(":checked")) {
        var group = "input." + $box.attr("class");
        $(group).prop("checked", false);
        $box.prop("checked", true);
    } else {
        $box.prop("checked", false);
    }
});

$(document).on('click', '.previewMenu', function () {
    $('#navigation', $('#preview')).slideToggle();

});


$(document).on('click', '.hitarea', function () {
    if (!$(this).hasClass("expandable-hitarea")) {
        $($(this).closest('li')).siblings().each(function () {

            var sibling = $($(this).find('.hitarea')[0]);

            if (sibling.parent().find('ul').is(':visible')) {
                sibling.parent().find('ul').slideToggle();
                //sibling.parent().find('ul').css("visibility", "hidden");
                sibling.addClass('expandable-hitarea');
                sibling.removeClass('collapsable-hitarea');
            }

        });
    }


});

function isCheckedById(id) {

    var checked = $("input[@id=" + id + "]:checked").length;
    if (checked == 0) {
        return false;
    } else {
        return true;
    }
}


$(function () {
    $('#view-source').click(function () {

        $('#preview').empty();
        $('#preview').append("<h2>Preview</h2>");
        //Append menu
        var ul = $('<ul class=\"treeview\"/>');
        var li = $('<li/>').html("<a style=\"padding-left: 10px;\">Menu</a><div class=\"previewMenu\"></div>");

        ul.append(li);

        $('#preview').append(ul);
        var navigationElem = $("#navigation").clone(true);
        $(navigationElem).find("input[type='checkbox']").remove();
        $(navigationElem).find("a").removeClass("link");
        $(navigationElem).find("li.expandable").children("a").removeAttr("href");
        $(navigationElem).find("li.collapsable").children("a").removeAttr("href");
        $(navigationElem).find("a").css("padding-left", "10px");


        navigationElem.appendTo("#preview");


        $('.hitarea', $('#preview')).next().css("display", "none");
        $('.hitarea', $('#preview')).removeClass('collapsable-hitarea');
        $('.hitarea', $('#preview')).addClass('expandable-hitarea');

        $('#navigation', $('#preview')).hide();

        var html = $("#preview")[0].outerHTML;


        //Get the html of head section..
        var htmlTag = $('<html/>');
        var headTag = $('<head/>').append($('head').html());

        var bodyTag = $('<body/>');

        html = $('<div id="simplemodal-container"/>').attr("class", "source-code-container").append(html);

        $('#preview', html).show();

        $('#hit', html).remove();
        $('.hitarea', html).removeAttr("class");
        $('.last', html).removeAttr("class");
        $('.collapsable', html).removeAttr("class");


        bodyTag.append($('<div id="previewCon"/>').append(html));

        htmlTag.append(headTag);
        htmlTag.append(bodyTag);
        var encoded = htmlTag[0].outerHTML;

        var sourceTxt = $("#source-html");

        sourceTxt.val(encoded);

        sourceTxt.format({
            method: 'xml'
        });

        sourceTxt.height($(window).height() - 140);
    });
    $('#view-complete-source').click(function () {

        var html = $('#myCheckbox')[0].outerHTML;
        var encoded = html;
        //encoded = html.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]});
        //encoded = encoded.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>');

        var sourceTxt = $("#source-html");

        sourceTxt.val(encoded);

        sourceTxt.format({
            method: 'xml'
        });

        sourceTxt.height($(window).height() - 140);
    });
    $('form').on('submit', function (event) {
        event.preventDefault();
        var name = $.trim($("#menuname").val());

        if (name != undefined && name != "" && name != undefined) {
            renameObj.text(name);
            if (renameObj.parent().parent().parent().is('li')) {
                var urlId = $.trim($("#urlid").val());
                if (urlId != undefined && urlId != "" && urlId != undefined) {
                    $(renameObj).attr("href", 'action.do?urlId=' + urlId);
                    $(renameObj).attr("target", "_blank");
                    $('a.modalCloseImg').click();
                } else {
                    alert("URL ID cannot be left blank for Child Nodes");
                }
            } else {
                $(renameObj).attr("href", 'action.do?urlId=' + urlId);
                $(renameObj).attr("target", "_blank");
                $('a.modalCloseImg').click();
            }
        } else {
            alert("Node name cannot be left blank");
        }
        $("#urlid").val("");

    });


});

function disableEvent(event) {
    event.preventDefault();
    event.stopPropagation();
}