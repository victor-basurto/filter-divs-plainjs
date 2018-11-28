var FilterModuleUtils = (function () {
	/*---------------------------------------------------
		Private Members
	-----------------------------------------------------*/
	/**
	 * @param {Array} item - list of candidates to anchors
	 * @return list of anchors 
	 */
	var createListOfAnchors = function(item) {
		var link = document.createElement( 'a' );
		link.setAttribute( 'href', '#' + item );
		link.innerHTML = item;
		this.append( link );
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
			var selectedItem, dataRegion, dataState, dataOpportunityArr, dataOpportunity;
			selectedItem = evt.target.getAttribute( 'href' ).substr(1);
			dataRegion = community.dataset.region;
			dataState = community.dataset.state;
			dataOpportunityArr = community.dataset.opportunity.split(',');
			dataOpportunity = dataOpportunityArr.filter(function (item) {
				return item === selectedItem;
			}).join(',');

			if ( dataRegion === selectedItem || dataState === selectedItem || dataOpportunity === selectedItem ) {
				community.classList.add( 'show-community' );
				community.classList.remove( 'hide-community' );
			} else {
				community.classList.remove( 'show-community' );
				community.classList.add( 'hide-community' );
			}
		}
	}

	/*---------------------------------------------------
		Public Members
	-----------------------------------------------------*/
	/**
	 * create array with unique items, removed repeated elements
	 * from array.
	 */
	var uniqueArrItems = function (value, index, item) {
		return item.indexOf( value ) === index;
	}
	/**
	 * filter only words that match on the dropdown input
	 * @param {String} evt - current target
	 * @return list of filtered elements 
	 */
	var inputFilterFunction = function (evt) {
		var input, filter, ul, li, a, i, div;
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
		var $dropdownDiv = evt.currentTarget,
		$inputSearch = $dropdownDiv.querySelector( 'input' ),
		$dropContent = $dropdownDiv.querySelector( '.dropdown-content' );

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

	/**
	 * Create list of anchors from element passed
	 * @param {DOMElement} mainEl - parent anchor holder
	 * @param {Array} regionArr - array of regions-state-opprotunity
	 * @return List of Anchors
	 */
	function regionBtn(mainEl, regionArr) {
		return regionArr.forEach(createListOfAnchors.bind(mainEl));
	}

	// accesors
	return  {
		uniqueArrItems: uniqueArrItems,
		inputFilterFunction: inputFilterFunction,
		displayDropdown: displayDropdown,
		regionBtn: regionBtn
	}
})();