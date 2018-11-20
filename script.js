var regionArr = [],
	stateArr = [],
    opportunityArr = [];
var dropdownRegion = document.getElementById( 'dropdown-region' );
var dropdownState = document.getElementById( 'dropdown-state' );
var dropdownOpportunity = document.getElementById( 'dropdown-opportunity' );
var uniqueArrItems = function (value, index, item) {
	return item.indexOf( value ) === index;
}
var createListOfAnchors = function(item) {
	var link = document.createElement( 'a' );
	link.setAttribute( 'href', '#' + item );
    link.innerHTML = item;
    this.append( link );
}
document.querySelectorAll('.community-container .single-item').forEach(function (item) {
	var allRegion, allState, allOpportunity;
	allRegion = item.dataset.region;
	allState = item.dataset.state;
	allOpportunity = item.dataset.opportunity;

    regionArr.push( allRegion );
    stateArr.push( allState );
    opportunityArr.push( allOpportunity );

});
var newRegion = regionArr.filter( uniqueArrItems );
var newState = stateArr.filter( uniqueArrItems );
var newOpportunity = opportunityArr.filter( uniqueArrItems );
/**
 * filter only words that match on the dropdown input
 * @param {String} evt - current target
 * @return list of filtered elements 
 */
var inputFilterFunction = function (evt) {
	var input, filter, ul, li, a, i;
	input = evt.target;
	filter = input.value.toUpperCase();
	div = input.parentNode;
	a = div.getElementsByTagName( 'a' );
	for ( i = 0; i < a.length; i++ ) {
		if ( a[ i ].innerHTML.toUpperCase().indexOf( filter ) > -1 ) {
			a[ i ].style.display = '';
		} else {
			a[ i ].style.display = 'none';
		}
	}
}
/**
 * Display community based on filter
 * @param {DOMElement} evt - current element
 * @param {DOMElement} community - filtered community
 * @return `show` or `hide` on community element
 */
var filterCommunity = function (evt, community) {
    if ( !evt.target.hasAttribute( 'href' ) ) {
        return;
    } else {
        var selectedItem = evt.target.getAttribute( 'href' ).substr(1),
            dataRegion = community.dataset.region,
            dataState = community.dataset.state,
            dataOpportunity = community.dataset.opportunity;
        
        if ( dataRegion === selectedItem || dataState === selectedItem || dataOpportunity === selectedItem ) {
            community.classList.add( 'show-community' );
            community.classList.remove( 'hide-community' );
        } else {
            community.classList.remove( 'show-community' );
            community.classList.add( 'hide-community' );
        }
    }
}
/**
 * Create a dropdown when user clicks on button
 * @param {DOMElement} evt - current element 
 */
var displayDropdown = function (evt) {
	var $dropdownDiv = evt.target.closest( '.btn-dropdown' ),
		$inputSearch = $dropdownDiv.querySelector( 'input' ),
        $dropContent = $dropdownDiv.querySelector( '.dropdown-content' ),
        $regionBtn = $dropdownDiv.querySelector( '#region-btn' ),
        $stateBtn = $dropdownDiv.querySelector( '#state-btn' ),
        $opportunityBtn = $dropdownDiv.querySelector( '#opportunity-btn' );

	if ( $dropContent.classList.contains( 'show' ) && evt.target !== $inputSearch ) {
        
        var $communityContainer = document.querySelector( '.community-container' );
		$communityContainer.querySelectorAll( '.single-item' ).forEach(function (community) {
            // display community based on filter
			filterCommunity( evt, community );
		});
        $dropContent.classList.remove( 'show' );
	} else {
        $dropContent.classList.add( 'show' );
	}
}
function regionBtn(mainEl, regionArr) {
    return regionArr.forEach(createListOfAnchors.bind(mainEl));
}
regionBtn(dropdownRegion, newRegion);
regionBtn(dropdownState, newState);
regionBtn(dropdownOpportunity, newOpportunity);


// click on window - remove class show if not clicked on filter
document.addEventListener('click', function (evt) {
	if ( !evt.target.closest( '.btn-dropdown' ) ) {
		document.querySelectorAll( '.dropdown-content' )
			.forEach(function (dropdowns) {
				dropdowns.classList.remove( 'show' );
		});
	} else {
		return;
	}
});
var $buttonsContainer = [].slice.call(document.querySelectorAll( '.buttons-container' ));
$buttonsContainer.forEach(function (drpdwn) {
	var $dropdowns = drpdwn.querySelectorAll( '.btn-dropdown' );
	$dropdowns.forEach(function (btn) {
		var $dropDownInput = btn.querySelector( 'input' );
		// event listeners - [click, keyup]
		btn.addEventListener('click', displayDropdown);
		$dropDownInput.addEventListener('keyup', inputFilterFunction, true);
	});
});