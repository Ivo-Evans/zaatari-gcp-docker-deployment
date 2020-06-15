import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import api from '../../../api/api';
import getFromJSON from './getFromJSON';

// import Intro from './TitleSection';
// import Header from './header';
import WorkshopHeader from '../../WorkshopHeader/WorkshopHeader';

export default function WorkshopOverview({ match: { params } }) {
	const [errorState, setErrorState] = React.useState('');
	const [workshop, setWorkshop] = React.useState({});
	useEffect(() => {
		api
			.getSpecificWorkshop(params.ID)
			.then((res) => {
				setWorkshop(getFromJSON(res));
			})
			.catch(() => {
				setErrorState(
					<h2>
						<br />
						<br />
						This workshop couldnt be found
					</h2>,
				);
			});
	}, [params.ID]);

	return (
		<>
			<WorkshopHeader images={workshop.images} date={workshop.date_created} tags={workshop.tags} title={workshop.title} />
			{/* <Intro title={workshop.title} author={workshop.workshop_authors} equipment={null} /> */}
			{errorState}
		</>
	);
}

WorkshopOverview.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			ID: PropTypes.string,
		}),
	}).isRequired,
};

/*
<>
      Header
        Image Background

     section
     Div
        H1
     Author
     Equipment || Null

     section
        H2
         P
     Div
        Button
        Button


    section
       H2
       Article
          P
          Div
             P

</>
*/
