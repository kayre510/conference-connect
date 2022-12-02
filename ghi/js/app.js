function createCard(name, description, pictureUrl, start_date, end_date, location) {
	return `
        <div class="col-md-4">
			<div class="w-100">

            <div class="shadow p-3 mb-5 bg-body rounded">
                <div class="card text-white bg-dark mb-3" style="max-width: 25rem;">
                    <img src="${pictureUrl}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                        <p class="card-text">${description}</p>
                    </div>
                    <div class="card-footer text-muted">
                        ${start_date} - ${end_date}
                    </div>
                </div>
            </div>
		</div>
        </div>
    `;
}

function createError() {
	return `<div class="alert alert-primary" role="alert">
	A simple primary alert—check it out!
  </div>`
}



window.addEventListener('DOMContentLoaded', async () => {

	const url = 'http://localhost:8000/api/conferences/';



	try {
		const response = await fetch(url);

		if (!response.ok) {
			const row = document.querySelector('.row')
			row.innerHTML = createError(response.status)
		} else {

			const data = await response.json();
			for (let conference of data.conferences) {
				const detailUrl = `http://localhost:8000${conference.href}`;
				const detailResponse = await fetch(detailUrl);
				if (detailResponse.ok) {
					const details = await detailResponse.json();
					const name = details.conference.name;
					const description = details.conference.description;
					const pictureUrl = details.conference.location.picture_url;
					const location = details.conference.location.name

					const starts = details.conference.starts;
					const start_date = new Date(starts).toLocaleDateString();

					const ends = details.conference.ends;
					const end_date = new Date(ends).toLocaleDateString();



					const html = createCard(name, description, pictureUrl, start_date, end_date, location);
					const column = document.querySelector('.row');
					console.log(column)
					console.log(column.innerHTML)
					column.innerHTML += html;
				}
			}
		}
	} catch (e) {
		console.error
		const column = document.querySelector('.row');
		const error = createError()
		column.innerHTML += error;
		console.log(column.innerHTML)
	}

});
``
