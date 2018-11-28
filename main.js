// app vars
var regionArr = [],
	stateArr = [],
	opportunityArr = [],
	newRegion,
	newState,
	newOpportunity;
	
// DOM Elements
var dropdownRegion = document.getElementById( 'dropdown-region' ),
	dropdownState = document.getElementById( 'dropdown-state' ),
	dropdownOpportunity = document.getElementById( 'dropdown-opportunity' ),
	$buttonsContainer = [].slice.call(document.querySelectorAll( '.buttons-container' )),
	$singleItem = [].slice.call(document.querySelectorAll( '.community-container .single-item' )),
	$dropdownContent = [].slice.call(document.querySelectorAll( '.dropdown-content' ));

$singleItem.forEach(function (item) {
	var allRegion, allState, allOpportunity;
	allRegion = item.dataset.region;
	allState = item.dataset.state;
	allOpportunity = item.dataset.opportunity;

	// create arrays from `data-attr`
    regionArr.push( allRegion );
    stateArr.push( allState );
    opportunityArr.push( allOpportunity );
});

newRegion = regionArr.filter( FilterModuleUtils.uniqueArrItems );
newState = stateArr.filter( FilterModuleUtils.uniqueArrItems );
newOpportunity = opportunityArr
				.join(',')
				.split(',')
				.filter( FilterModuleUtils.uniqueArrItems );

// open/show button on click
FilterModuleUtils.regionBtn(dropdownRegion, newRegion);
FilterModuleUtils.regionBtn(dropdownState, newState);
FilterModuleUtils.regionBtn(dropdownOpportunity, newOpportunity);

// eventt listeners for buttons and input filter menu
$buttonsContainer.forEach(function (drpdwn) {
	var $dropdowns = drpdwn.querySelectorAll( '.btn-dropdown' );
	$dropdowns.forEach(function (btn) {
		var $dropDownInput = btn.querySelector( 'input' );
		// event listeners - [click, keyup]
		btn.addEventListener('click', FilterModuleUtils.displayDropdown);
		$dropDownInput.addEventListener('keyup', FilterModuleUtils.inputFilterFunction, true);
	});
});


// click on window - remove class show if not clicked on filter
document.addEventListener('click', function (evt) {
	if ( !evt.target.closest( '.btn-dropdown' ) ) {
		$dropdownContent.forEach(function (dropdowns) {
			dropdowns.classList.remove( 'show' );
		});
	} else {
		return;
	}
});