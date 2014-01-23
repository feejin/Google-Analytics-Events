// timeout before performing default behaviour
var gaEventDelay = 100;
var gaEventPage;
var gaTimeout;

$(function(){
	gaEventPage = $('title').html();
});

/*!
 * Push a tracking event to Google Analytics
 * @gaCategory: string
 * @gaAction: string
 * @gaLabel: string
 * ---------------------------------------------------------------------------------
 */
var trackEvent = function(gaEventCategory, gaEventAction, gaEventLabel, gaEventValue){
	// uncomment this to push events to GA
	// _gaq.push(['_trackEvent', gaEventCategory, gaEventAction, gaEventLabel, gaEventValue]);
	console.log(gaEventCategory, gaEventAction, gaEventLabel, gaEventValue);
};

/*!
 * Track form submissions
 * @gaEventPage: string | The page the form was submitted from
 * @gaEventFormID: string | The HTML ID of the form
 * ---------------------------------------------------------------------------------
 */

$(function(){
	$('form').submit(function(e){
		// prevent default form submission behaviour
		var form = this;
		e.preventDefault();

		// track using the form ID
		trackEvent('Form Submission', $(this).attr('id'), gaEventPage, '');

		clearTimeout(gaTimeout);
		gaTimeout = setTimeout(function(){
			form.submit();
		}, gaEventDelay);
	});
});

/*!
 * Track external links and files
 * @gaEventType: string | The page the link was on
 * @gaEventPage: string | The page the link was on
 * @gaEventFormID: string | The URL of the clicked link
 * ---------------------------------------------------------------------------------
 */

$(function(){
	$('a[rel*=external], a[target=_blank]').each(function(){
		var $_self = $(this);
		var gaAnchorText = $_self.html() || 'No anchor text';
		var gaLinkURL = $_self.attr('href');
		var gaLinkTarget = ($_self.attr('target') === '_blank') ? '_blank' : '_self';
		var gaEventType = gaLinkURL.match(/[.](doc|docx|xls|xlsx|ppt|pptx|pdf)$/) ? 'File Download': 'External Link';

		$_self.click(function(e){
			e.preventDefault();
			trackEvent(gaEventType, gaLinkURL, gaEventPage, gaAnchorText);
			clearTimeout(gaTimeout);

			gaTimeout = setTimeout(function(){
				window.open(gaLinkURL, gaLinkTarget);
			}, gaEventDelay);
		});
	});
});
