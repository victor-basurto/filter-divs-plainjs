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
 * Create a dropdown when user clicks on button
 * @param {DOMElement} evt - current element 
 */
var displayDropdown = function (evt) {
	var $dropdownDiv = evt.target.closest( '.btn-dropdown' ),
		$inputSearch = $dropdownDiv.querySelector( 'input' ),
		$dropContent = $dropdownDiv.querySelector( '.dropdown-content' );
	if ( $dropContent.classList.contains( 'show' ) && evt.target !== $inputSearch ) {
		/**
		 * TODO:
		 * 	get filter word
		 */
		
		var $communityContainer = document.querySelector( '.community-container' );
		$communityContainer.querySelectorAll( '.single-item' ).forEach(function (community) {
			var selectedItem = evt.target.getAttribute( 'href' ).substr(1),
				dataRegion = community.dataset.region,
				dataState = community.dataset.state,
				dataType = community.dataset.type;
			
			if ( dataRegion === selectedItem || dataState === selectedItem || dataType === selectedItem ) {
				community.classList.add( 'show-community' );
				community.classList.remove( 'hide-community' );
			} else {
				community.classList.remove( 'show-community' );
				community.classList.add( 'hide-community' );
			}

		});

		$dropContent.classList.remove( 'show' );
	} else {
		$dropContent.classList.add( 'show' );
	}
}



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
	var $dropdowns = drpdwn.querySelectorAll( '.btn-dropdown' ); // tres
	$dropdowns.forEach(function (btn) {
		var $dropDownInput = btn.querySelector( 'input' );
		// event listeners - [click, keyup]
		btn.addEventListener('click', displayDropdown);
		$dropDownInput.addEventListener('keyup', inputFilterFunction, true);
	});
});