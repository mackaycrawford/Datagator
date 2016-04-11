Template.authorViewTransformedData.onRendered(function() {
  startHelper = function(easyTags){
  
  var availableTags = [
    "xy",
    "Scheme"
];
otherTags = easyTags
var faux = $("#faux");
var offsets;
var arrayused;
var calcfaux;
var retresult;
var checkspace;
var contents = $('#transformedSqlText')[0];
var carpos;
var fauxpos;
var tier;
var startss;
var endss;
function getCaret(el) {
  if (el.selectionStart) {
    return el.selectionStart;
  } else if (document.selection) {
    el.focus();

    var r = document.selection.createRange();
    if (r == null) {
      return 0;
    }

    var re = el.createTextRange(),
        rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return rc.text.length;
  } 
  return 0;
}

                function split( val ) {
                return val.split( / \s*/ );
                }
                function extractLast( term ) {
                return split( term ).pop();
                }
                $( "#transformedSqlText" )
                .on( "keydown", function( event ) {
                if ( event.keyCode === $.ui.keyCode.TAB &&
                $( this ).data( "autocomplete" ).menu.active ) {
                event.preventDefault();
                }
                })
                .click( function( event ) {
                carpos = getCaret(contents);
                fauxpos = faux.text().length;
                if(carpos < fauxpos) {
                tier = "close";
                $(this).autocomplete( "close" );
                startss = this.selectionStart;
                endss = this.selectionEnd;
                $(this).val( $(this).val().replace(/ *$/,''));
                this.setSelectionRange(startss, endss);
                }
                else
                {
                tier = "open";
                }                 
               
                })
                .on( "keyup", function( event ) {
                calcfaux = faux.text($(this).val());
                fauxpos = faux.text().length;    
                if(/ $/.test(faux.text()) || tier === "close") {
                checkspace = "space";
                }
                else
                {
                checkspace = "nospace";
                } 
                

                if (fauxpos <= 1)
                {
                offsets = 0;
                tier = "open";
                }
                carpos = getCaret(contents);
                if(carpos < fauxpos) {
                tier = "close";
                $(this).autocomplete( "close" );
                startss = this.selectionStart;
                endss = this.selectionEnd;
                $(this).val( $(this).val().replace(/ *$/,''));
                this.setSelectionRange(startss, endss);
                }
                else
                {
                tier = "open";
                }
                })
                //mouse caret position dropdown
                .autocomplete({
                minLength: 1,  
                search: function( event, ui ) { 
                var input = $( event.target );
                // custom minLength
                if (checkspace === "space") {  
                input.autocomplete( "close" );
                return false;
                }
                },
                source: function (request, response) {

                var terme = $.ui.autocomplete.escapeRegex(extractLast(request.term))
                // Create two regular expressions, one to find suggestions starting with the user's input:
                , startsWithMatchere = new RegExp("^" + terme, "i")
                , startsWithe = $.grep(availableTags, function(value) {
                    return startsWithMatchere.test(value.label || value.value || value);
                })
                // ... And another to find suggestions that just contain the user's input:
                , containsMatchere = new RegExp(terme, "i")
                , containse = $.grep(availableTags, function (value) {
                    return $.inArray(value, startsWithe) < 0 &&
                        containsMatchere.test(value.label || value.value || value);
                });

                // Supply the widget with an array containing the suggestions that start with the user's input,
                // followed by those that just contain the user's input.
                
             
                
                

                var term = $.ui.autocomplete.escapeRegex(extractLast(request.term))
                // Create two regular expressions, one to find suggestions starting with the user's input:
                , startsWithMatcher = new RegExp("^" + term, "i")
                , startsWith = $.grep(otherTags, function(value) {
                    return startsWithMatcher.test(value.label || value.value || value);
                })
                // ... And another to find suggestions that just contain the user's input:
                , containsMatcher = new RegExp(term, "i")
                , contains = $.grep(otherTags, function (value) {
                    return $.inArray(value, startsWith) < 0 &&
                        containsMatcher.test(value.label || value.value || value);
                });

                // Supply the widget with an array containing the suggestions that start with the user's input,
                // followed by those that just contain the user's input.
                if (offsets == 0)
                {
                retresult = startsWithe.concat(containse);
                arrayused = "availableTags";
                response(startsWithe.concat(containse));
                }  
                if (retresult == "" || offsets != 0)
                {
                arrayused = "otherTags";
                response(startsWith.concat(contains));                
                }
                },
                open: function( event, ui ) {
                var input = $( event.target ),
                widget = input.autocomplete( "widget" ),
                style = $.extend( input.css( [
                    "font",
                    "border-left",
                    "padding-left"
                ] ), {
                    position: "absolute",
                    visibility: "hidden",
                    "padding-right": 0,
                    "border-right": 0,
                    "white-space": "pre",
                    "font-size": "16px",
                    "font-weight": "bold"
                } ),
                div = $( "<div/>" ),
                pos = {
                    my: "left top",
                    collision: "none"
                },
                offset = 0; // magic number to align the first letter
                             // in the text field with the first letter
                             // of suggestions
                             // depends on how you style the autocomplete box


                div
                .text( input.val().replace( /\S*$/, "" ) )
                .css( style )
                .insertAfter( input );
                offset = Math.min(
                Math.max( offset + div.width(), 0 ),
                input.width() - widget.width()
                );
          
                if (arrayused === "otherTags")
                {
                widget.css( "width", "" );
                offset = Math.min(
                        Math.max( offset + div.width(), 0 ),
                        input.width() - widget.width()
                );
                }               
                
                    div.remove();

                    pos.at = "left+" + offset + " bottom";
                    input.autocomplete( "option", "position", pos );

                    widget.position( $.extend( { of: input }, pos ) );
                offsets = offset;                      
                },
                focus: function() {
                // prevent value inserted on focus
                return false;
                },
                select: function( event, ui ) {
                var terms = split( this.value );
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push( ui.item.value );
                // add placeholder to get the comma-and-space at the end
                terms.push( "" );
                this.value = terms.join( " " );
                calcfaux = faux.text($(this).val());
                if(/ $/.test(faux.text())) {
                checkspace = "space";
                }
                else
                {
                checkspace = "nospace";
                }
                carpos = getCaret(contents);
                fauxpos = faux.text().length;
                return false;
                }
                });
  }
    
})